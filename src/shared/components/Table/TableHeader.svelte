<!-- Sticky table header with each column's sort + left/right reorder + hide controls in a single-line join, and the optional per-column filter row. -->
<script lang="ts" generics="TData extends RowData">
  import { ANIMATION_DURATION } from "$shared/animations.js";
  import { IconSize } from "$shared/icons";
  import {
    ArrowDownNarrowWide,
    ArrowDownUp,
    ArrowLeft,
    ArrowRight,
    ArrowUpNarrowWide,
    EyeOff,
    Funnel,
  } from "@lucide/svelte";
  import type { RowData } from "@tanstack/svelte-table";
  import { FlexRender } from "@tanstack/svelte-table";
  import { flip } from "svelte/animate";

  import type { TableInstance } from "./table-types.js";
  import { moveTableColumn, toAriaSort, toFilterInputValue } from "./table-utils.js";

  let {
    table,
    showColumnFilters = true,
    showColumnVisibilityControls = true,
  }: {
    /** Live table instance providing header groups and column state. */
    table: TableInstance<TData>;
    /** Whether to render the per-column filter row. */
    showColumnFilters?: boolean;
    /** Whether to show the per-column hide button. */
    showColumnVisibilityControls?: boolean;
  } = $props();

  const visibleLeafCount = $derived(table.getVisibleLeafColumns().length);
</script>

<thead>
  {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
    <tr>
      {#each headerGroup.headers as header (header.id)}
        <th
          scope="col"
          class="bg-base-200 border-neutral sticky top-0 z-20 border-b-2"
          aria-sort={header.column.getCanSort() ? toAriaSort(header.column.getIsSorted()) : undefined}
          animate:flip={{ duration: ANIMATION_DURATION }}
        >
          {#if !header.isPlaceholder}
            <div class="text-lg font-bold">
              <FlexRender {header} />
            </div>
            <div class="join mt-1">
              {#if !header.column.getIsFirstColumn()}
                <button
                  type="button"
                  aria-label={`Move ${header.column.id} Column Left`}
                  class="btn btn-soft btn-sm join-item hover:btn-neutral w-9 px-0"
                  onclick={() => moveTableColumn(table, header.id, -1)}
                >
                  <span class="inline-flex" aria-hidden="true"><ArrowLeft size={IconSize.Small} /></span>
                </button>
              {/if}
              <button
                type="button"
                aria-label={`Sort By ${header.column.id}`}
                class="btn btn-soft btn-sm join-item group hover:btn-primary w-9 px-0"
                disabled={!header.column.getCanSort()}
                onclick={header.column.getToggleSortingHandler()}
              >
                {#if header.column.getCanSort()}
                  <span
                    class={header.column.getIsSorted()
                      ? "text-primary group-hover:text-primary-content inline-flex align-middle"
                      : "inline-flex align-middle"}
                    aria-hidden="true"
                  >
                    {#if header.column.getIsSorted() === "asc"}
                      <ArrowUpNarrowWide size={IconSize.Small} />
                    {:else if header.column.getIsSorted() === "desc"}
                      <ArrowDownNarrowWide size={IconSize.Small} />
                    {:else}
                      <ArrowDownUp size={IconSize.Small} />
                    {/if}
                  </span>
                {/if}
              </button>
              {#if !header.column.getIsLastColumn()}
                <button
                  type="button"
                  aria-label={`Move ${header.column.id} Column Right`}
                  class="btn btn-soft btn-sm join-item hover:btn-neutral w-9 px-0"
                  onclick={() => moveTableColumn(table, header.id, 1)}
                >
                  <span class="inline-flex" aria-hidden="true"><ArrowRight size={IconSize.Small} /></span>
                </button>
              {/if}
              {#if showColumnVisibilityControls && header.column.getCanHide()}
                <button
                  type="button"
                  aria-label={`Hide ${header.column.id} Column`}
                  title={`Hide ${header.column.id}`}
                  class="btn btn-soft btn-sm join-item hover:btn-error w-9 px-0"
                  disabled={visibleLeafCount <= 1}
                  onclick={() => header.column.toggleVisibility(false)}
                >
                  <span class="inline-flex" aria-hidden="true"><EyeOff size={IconSize.Small} /></span>
                </button>
              {/if}
            </div>
          {/if}
        </th>
      {/each}
    </tr>
    {#if showColumnFilters}
      <tr>
        {#each headerGroup.headers as header (header.id)}
          <th class="bg-base-100" animate:flip={{ duration: ANIMATION_DURATION }}>
            {#if header.column.getCanFilter()}
              <label class="input input-bordered input-sm hover:border-primary w-full font-normal">
                <span class="inline-flex opacity-60" aria-hidden="true"><Funnel size={IconSize.Small} /></span>
                <input
                  type="search"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Filter"
                  aria-label={`Filter ${header.column.id}`}
                  value={toFilterInputValue(header.column.getFilterValue())}
                  oninput={(e) => header.column.setFilterValue(e.currentTarget.value)}
                />
              </label>
            {/if}
          </th>
        {/each}
      </tr>
    {/if}
  {/each}
</thead>
