import { browser } from "$app/environment";
import type { RowData } from "@tanstack/svelte-table";
import { z } from "zod";

import type { TableInstance } from "./table-types.js";

const sortingSchema = z.array(z.object({ id: z.string(), desc: z.boolean() }));

const overridesSchema = z.object({
  sorting: sortingSchema.optional(),
  columnOrder: z.array(z.string()).optional(),
  columnVisibility: z.record(z.string(), z.boolean()).optional(),
});

type TableOverrides = z.infer<typeof overridesSchema>;

/** Delay after the last change before the saving spinner appears. Prevents spamming during rapid interactions. */
export const SAVE_INDICATOR_DELAY = 1000;

/** How long the saving spinner plays before flipping to the "saved" confirmation. */
export const SAVE_INDICATOR_SAVING_DURATION = 1000;

/** How long the "saved" confirmation stays visible before fading back to idle. */
export const SAVE_INDICATOR_VISIBLE_DURATION = 4000;

/** Reactive save status returned by {@link persistTableState} for the toolbar indicator. */
export type TableSaveStatus = {
  /** When the view was last persisted, or `null` if nothing saved yet this session. */
  readonly lastSavedAt: Date | null;
  /** Whether the "saving" spinner should currently be shown. Debounced by {@link SAVE_INDICATOR_DELAY}. */
  readonly isSaving: boolean;
  /** Whether the "saved" confirmation should currently be shown. */
  readonly showSaved: boolean;
};

function getStorageKey(tableId: string): string {
  return `dynospec:table:${tableId}`;
}

/** Loads persisted sorting/order/visibility for a table. Falls back to `{}` on any error. */
export function loadTableOverrides(tableId: string, validIds: string[]): TableOverrides {
  if (!browser) return {};
  try {
    const raw = localStorage.getItem(getStorageKey(tableId));
    if (!raw) return {};
    const parsed = overridesSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return {};
    const valid = new Set(validIds);
    const data = parsed.data;
    return {
      ...(data.sorting ? { sorting: data.sorting.filter((s) => valid.has(s.id)) } : {}),
      ...(data.columnOrder ? { columnOrder: data.columnOrder.filter((id) => valid.has(id)) } : {}),
      ...(data.columnVisibility
        ? {
            columnVisibility: Object.fromEntries(Object.entries(data.columnVisibility).filter(([id]) => valid.has(id))),
          }
        : {}),
    };
  } catch {
    return {};
  }
}

/** Removes persisted overrides for a table. Silently ignores errors. */
export function clearTableOverrides(tableId: string): void {
  if (!browser) return;
  try {
    localStorage.removeItem(getStorageKey(tableId));
  } catch {
    // Fall back to default state by doing nothing.
  }
}

/**
 * Restores persisted sorting/order/visibility onto the table, then persists
 * future changes to `localStorage`. Filters are intentionally excluded.
 * Any error falls back to the default state.
 *
 * Returns a reactive {@link TableSaveStatus} for the toolbar save indicator.
 * The indicator is debounced by {@link SAVE_INDICATOR_DELAY} so rapid
 * interactions don't spam the user, and the initial restore never shows it.
 */
export function persistTableState<TData extends RowData>(
  tableId: string,
  table: TableInstance<TData>,
): TableSaveStatus {
  let lastSavedAt = $state<Date | null>(null);
  let isSaving = $state(false);
  let showSaved = $state(false);

  if (!browser) {
    return {
      get lastSavedAt() {
        return lastSavedAt;
      },
      get isSaving() {
        return isSaving;
      },
      get showSaved() {
        return showSaved;
      },
    };
  }

  try {
    const validIds = table.getAllLeafColumns().map((c) => c.id);
    const overrides = loadTableOverrides(tableId, validIds);
    if (overrides.sorting?.length) table.setSorting(overrides.sorting);
    if (overrides.columnOrder?.length) table.setColumnOrder(overrides.columnOrder);
    if (overrides.columnVisibility && Object.keys(overrides.columnVisibility).length > 0) {
      table.setColumnVisibility(overrides.columnVisibility);
    }
  } catch {
    // Fall back to the default state.
  }

  let isFirstRun = true;
  let showTimer: ReturnType<typeof setTimeout> | undefined;
  let savingTimer: ReturnType<typeof setTimeout> | undefined;
  let savedTimer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    const sorting = table.atoms.sorting.get();
    const columnOrder = table.atoms.columnOrder.get();
    const columnVisibility = table.atoms.columnVisibility.get();
    try {
      localStorage.setItem(getStorageKey(tableId), JSON.stringify({ sorting, columnOrder, columnVisibility }));
    } catch {
      // Fall back to the default state by doing nothing.
    }

    if (isFirstRun) {
      isFirstRun = false;
      return;
    }

    // A new change arrived: drop back to idle and restart the debounce.
    isSaving = false;
    showSaved = false;
    clearTimeout(showTimer);
    clearTimeout(savingTimer);
    clearTimeout(savedTimer);
    showTimer = setTimeout(() => {
      isSaving = true;
      savingTimer = setTimeout(() => {
        isSaving = false;
        lastSavedAt = new Date();
        showSaved = true;
        savedTimer = setTimeout(() => {
          showSaved = false;
        }, SAVE_INDICATOR_VISIBLE_DURATION);
      }, SAVE_INDICATOR_SAVING_DURATION);
    }, SAVE_INDICATOR_DELAY);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(savingTimer);
      clearTimeout(savedTimer);
    };
  });

  return {
    get lastSavedAt() {
      return lastSavedAt;
    },
    get isSaving() {
      return isSaving;
    },
    get showSaved() {
      return showSaved;
    },
  };
}
