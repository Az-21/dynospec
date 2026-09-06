<!-- Toolbar above the table with the global search input, hidden-column restore chips, the filter/sorting/order reset buttons, and the view-saved indicator. -->
<script lang="ts" generics="TData extends RowData">
  import { IconSize } from "$shared/icons";
  import {
    ArrowUpDown,
    Eye,
    FunnelX,
    ListRestart,
    RefreshCw,
    RotateCcw,
    SaveCheck,
    ScanEye,
    Search,
  } from "@lucide/svelte";
  import type { RowData } from "@tanstack/svelte-table";
  import { scale } from "svelte/transition";

  import type { TableSaveStatus } from "./table-persistence.svelte";
  import type { TableInstance, ToolbarAction } from "./table-types.js";

  let {
    table,
    searchPlaceholder = "Search all columns",
    showGlobalFilter = true,
    showToolbarButtons = true,
    showColumnVisibilityControls = true,
    saveStatus,
  }: {
    /** Live table instance backing the toolbar controls. */
    table: TableInstance<TData>;
    /** Placeholder and accessible label for the global search input. */
    searchPlaceholder?: string;
    /** Whether to show the global search input. */
    showGlobalFilter?: boolean;
    /** Whether to show the reset buttons. */
    showToolbarButtons?: boolean;
    /** Whether to show hidden-column restore chips. */
    showColumnVisibilityControls?: boolean;
    /** Reactive save status from `persistTableState`. Hides the indicator when omitted. */
    saveStatus?: TableSaveStatus;
  } = $props();

  const hiddenColumns = $derived(table.getAllLeafColumns().filter((column) => !column.getIsVisible()));

  function getColumnLabel(column: (typeof hiddenColumns)[number]): string {
    const header = column.columnDef.header;
    return typeof header === "string" ? header : column.id;
  }

  const toolbarActions: ToolbarAction[] = [
    { label: "Clear Filters", icon: FunnelX, onClick: () => table.resetColumnFilters() },
    { label: "Clear Sorting", icon: ArrowUpDown, onClick: () => table.resetSorting() },
    { label: "Reset Order", icon: ListRestart, onClick: () => table.resetColumnOrder() },
    { label: "Reset All", icon: RotateCcw, onClick: () => table.reset() },
  ];

  const savePhase = $derived(saveStatus?.isSaving ? "saving" : saveStatus?.showSaved ? "saved" : "idle");
</script>

<div class="mb-3 flex flex-wrap items-center gap-2">
  {#if saveStatus}
    <span role="status" aria-live="polite" class="inline-flex items-center">
      <span
        class="tooltip tooltip-right"
        data-tip={savePhase === "saving"
          ? "Saving table layout..."
          : savePhase === "saved" && saveStatus.lastSavedAt
            ? `Table layout saved · ${saveStatus.lastSavedAt.toLocaleTimeString()}`
            : "Table layout saves automatically"}
      >
        {#key savePhase}
          <span in:scale={{ duration: 200, start: 0.6 }} class="inline-flex" aria-hidden="true">
            {#if savePhase === "saving"}
              <RefreshCw size={IconSize.Medium} class="animate-spin" />
            {:else if savePhase === "saved"}
              <SaveCheck size={IconSize.Medium} class="text-success" />
            {:else}
              <SaveCheck size={IconSize.Medium} class="opacity-40" />
            {/if}
          </span>
        {/key}
        <span class="sr-only">
          {savePhase === "saving"
            ? "Saving table layout"
            : savePhase === "saved"
              ? "Table layout saved"
              : "Table layout saves automatically"}
        </span>
      </span>
    </span>
  {/if}
  {#if showGlobalFilter}
    <label class="input input-bordered hover:border-primary w-64">
      <span class="inline-flex opacity-60" aria-hidden="true"><Search size={IconSize.Medium} /></span>
      <input
        type="search"
        autocomplete="off"
        spellcheck="false"
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        value={table.atoms.globalFilter.get() ?? ""}
        oninput={(e) => table.setGlobalFilter(e.currentTarget.value)}
      />
    </label>
  {/if}
  {#if showColumnVisibilityControls && hiddenColumns.length > 0}
    <div class="flex flex-wrap items-center gap-1.5" aria-live="polite" aria-label="Hidden columns">
      <span class="text-base-content/60 text-xs">Hidden ({hiddenColumns.length}):</span>
      {#each hiddenColumns as column (column.id)}
        <button
          type="button"
          class="btn btn-soft btn-xs hover:btn-success"
          aria-label={`Show ${getColumnLabel(column)} column`}
          title={`Show ${getColumnLabel(column)}`}
          onclick={() => column.toggleVisibility(true)}
        >
          <span class="inline-flex" aria-hidden="true"><Eye size={IconSize.Small} /></span>
          {getColumnLabel(column)}
        </button>
      {/each}
      <button type="button" class="btn btn-soft btn-accent btn-xs" onclick={() => table.toggleAllColumnsVisible(true)}>
        <span class="inline-flex" aria-hidden="true"><ScanEye size={IconSize.Small} /></span>
        Show All
      </button>
    </div>
  {/if}
  {#if showToolbarButtons}
    <div class="ml-auto flex flex-wrap items-center gap-2">
      {#each toolbarActions as action (action.label)}
        <button type="button" class="btn btn-soft btn-sm hover:btn-error" onclick={action.onClick}>
          <span class="inline-flex" aria-hidden="true"><action.icon size={IconSize.Small} /></span>
          {action.label}
        </button>
      {/each}
    </div>
  {/if}
</div>
