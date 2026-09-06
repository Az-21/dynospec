<script lang="ts" module>
  import type { ForzaClass } from "$lib/types/forza";

  /** DaisyUI badge variant per Forza class (closest hue match). */
  export const forzaClassVariants: Record<ForzaClass, string> = {
    D: "badge-success",
    C: "badge-warning",
    B: "badge-accent",
    A: "badge-error",
    S1: "badge-secondary",
    S2: "badge-info",
    R: "badge-neutral",
    X: "badge-primary",
  };
</script>

<script lang="ts">
  let { value, pi = null }: { value: ForzaClass; pi?: number | null } = $props();

  const label = $derived(pi === null || pi === undefined ? value : `${value} ${pi}`);
</script>

<div class="flex justify-center" role="img" aria-label="Class {label}" title="Class {label}">
  <span class="badge badge-soft badge-lg {forzaClassVariants[value]} gap-1.5 whitespace-nowrap" aria-hidden="true">
    <span>{value}</span>
    {#if pi !== null && pi !== undefined}
      <span class="tabular-nums opacity-90">{pi}</span>
    {/if}
  </span>
</div>
