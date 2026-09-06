import type { RowData } from "@tanstack/svelte-table";

import type { MoveDirection, TableInstance } from "./table-types.js";

/** Maps TanStack sort state to the `aria-sort` attribute value expected by assistive technology. */
export function toAriaSort(sorted: false | "asc" | "desc"): "none" | "ascending" | "descending" {
  if (sorted === "asc") return "ascending";
  if (sorted === "desc") return "descending";
  return "none";
}

/** Normalizes a column filter value to the string expected by filter inputs, falling back to `""` for non-string values. */
export function toFilterInputValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * Moves a leaf column one step left or right while preserving unknown order entries and ignoring out-of-range moves.
 * @param table Live table instance to reorder.
 * @param id Leaf column id to move.
 * @param dir Move step where `-1` shifts left and `1` shifts right.
 */
export function moveTableColumn<TData extends RowData>(
  table: TableInstance<TData>,
  id: string,
  dir: MoveDirection,
): void {
  table.setColumnOrder((old) => {
    const allIds = table.getAllLeafColumns().map((c) => c.id);
    const known = new Set(allIds);
    const order = (old?.length ? old.filter((cid) => known.has(cid)) : []).concat(
      allIds.filter((cid) => !old?.includes(cid)),
    );

    const i = order.indexOf(id);
    if (i === -1) return old;
    const j = i + dir;
    if (j < 0 || j >= order.length) return old;

    const next = [...order];
    next.splice(i, 1);
    next.splice(j, 0, id);
    return next;
  });
}
