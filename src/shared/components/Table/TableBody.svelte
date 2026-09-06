<!-- Table body rendering the filtered and sorted rows with zebra striping, plus the empty "No results." state. -->
<script lang="ts" generics="TData extends RowData">
  import { ANIMATION_DURATION } from "$shared/animations.js";
  import type { RowData } from "@tanstack/svelte-table";
  import { FlexRender } from "@tanstack/svelte-table";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  import type { TableInstance } from "./table-types.js";

  let {
    table,
  }: {
    /** Live table instance providing the filtered and sorted row model. */
    table: TableInstance<TData>;
  } = $props();
</script>

<tbody>
  {#each table.getRowModel().rows as row (row.id)}
    <tr
      class="hover h-20 text-base"
      animate:flip={{ duration: ANIMATION_DURATION }}
      in:fly={{ y: 10, duration: ANIMATION_DURATION }}
      out:fly={{ y: -10, duration: ANIMATION_DURATION }}
    >
      {#each row.getVisibleCells() as cell (cell.id)}
        <td class="align-middle" animate:flip={{ duration: ANIMATION_DURATION }}>
          <FlexRender {cell} />
        </td>
      {/each}
    </tr>
  {:else}
    <tr class="hover">
      <td class="text-base-content/60 py-6 text-center" colspan={table.getVisibleLeafColumns().length || 1}>
        No results.
      </td>
    </tr>
  {/each}
</tbody>
