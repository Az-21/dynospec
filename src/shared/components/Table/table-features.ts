import {
  columnFilteringFeature,
  columnOrderingFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createSortedRowModel,
  filterFn_equalsString,
  filterFn_includesString,
  globalFilteringFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from "@tanstack/svelte-table";

/** Creates the shared TanStack feature set used by every data table (visibility, ordering, filtering, global filtering, and sorting with filtered and sorted row models). */
export function createDefaultTableFeatures() {
  return tableFeatures({
    columnVisibilityFeature,
    columnOrderingFeature,
    columnFilteringFeature,
    globalFilteringFeature,
    rowSortingFeature,
    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
    filterFns: {
      includesString: filterFn_includesString,
      equalsString: filterFn_equalsString,
    },
    sortFns: {
      alphanumeric: sortFn_alphanumeric,
      basic: sortFn_basic,
      datetime: sortFn_datetime,
      text: sortFn_text,
    },
  });
}

/** TanStack feature set returned by {@link createDefaultTableFeatures}. */
export type DefaultTableFeatures = ReturnType<typeof createDefaultTableFeatures>;

/** Returns the default table options applied to every data table (global `includesString` filter with per-column `includesString` default). */
export function createDefaultTableOptions() {
  return {
    globalFilterFn: "includesString",
    defaultColumn: { filterFn: "includesString" },
  } as const;
}
