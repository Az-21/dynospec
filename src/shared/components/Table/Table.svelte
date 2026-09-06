<!-- Generic data table shell that composes `TableToolbar`, `TableHeader`, and `TableBody` around a TanStack table instance with global filtering, column filtering, sorting, column reordering, and column visibility. -->
<script module lang="ts">
  export { createDefaultTableFeatures, createDefaultTableOptions } from "./table-features.js";
  export type { DefaultTableFeatures } from "./table-features.js";
  export type { MoveDirection, TableInstance, ToolbarAction } from "./table-types.js";
  export { moveTableColumn, toAriaSort, toFilterInputValue } from "./table-utils.js";
</script>

<script lang="ts" generics="TData extends RowData">
  import type { RowData } from "@tanstack/svelte-table";

  import type { TableSaveStatus } from "./table-persistence.svelte";
  import type { TableInstance } from "./table-types.js";
  import TableBody from "./TableBody.svelte";
  import TableHeader from "./TableHeader.svelte";
  import TableToolbar from "./TableToolbar.svelte";

  let {
    table,
    searchPlaceholder = "Search all columns",
    caption,
    showGlobalFilter = true,
    showColumnFilters = true,
    showToolbarButtons = true,
    showColumnVisibilityControls = true,
    saveStatus,
  }: {
    /** Live table instance created with the shared default features. */
    table: TableInstance<TData>;
    /** Placeholder and accessible label for the global search input. */
    searchPlaceholder?: string;
    /** Screen-reader-only table caption describing the table content. */
    caption?: string;
    /** Whether to show the global search input. */
    showGlobalFilter?: boolean;
    /** Whether to show the per-column filter row. */
    showColumnFilters?: boolean;
    /** Whether to show the toolbar reset buttons. */
    showToolbarButtons?: boolean;
    /** Whether to show per-column hide buttons and hidden-column restore chips. */
    showColumnVisibilityControls?: boolean;
    /** Reactive save status from `persistTableState`. Hides the saved indicator when omitted. */
    saveStatus?: TableSaveStatus;
  } = $props();
</script>

<TableToolbar
  {table}
  {searchPlaceholder}
  {showGlobalFilter}
  {showToolbarButtons}
  {showColumnVisibilityControls}
  {saveStatus}
/>

<div class="border-neutral bg-base-100 rounded-box overflow-auto border-2">
  <table class="table-zebra table-pin-rows table w-max min-w-full">
    {#if caption}
      <caption class="sr-only">{caption}</caption>
    {/if}
    <TableHeader {table} {showColumnFilters} {showColumnVisibilityControls} />
    <TableBody {table} />
  </table>
</div>
