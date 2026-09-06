<script lang="ts" module>
  import { Flag, LandPlot, MountainSnow, Route, Star, Tornado } from "@lucide/svelte";
  import type { Component } from "svelte";

  /** Icon + daisyUI badge variant per discipline. Add new disciplines here. */
  const disciplineStyles: Record<string, { icon: Component; badge: string }> = {
    "Cross Country": { icon: MountainSnow, badge: "badge-success" },
    Road: { icon: Route, badge: "badge-info" },
    Dirt: { icon: LandPlot, badge: "badge-warning" },
    Drift: { icon: Tornado, badge: "badge-secondary" },
    Special: { icon: Star, badge: "badge-accent" },
  };

  const fallbackStyle: { icon: Component; badge: string } = { icon: Flag, badge: "badge-neutral" };
</script>

<script lang="ts">
  import { IconSize } from "$shared/icons";

  let { value }: { value: string } = $props();

  const style = $derived(disciplineStyles[value] ?? fallbackStyle);
</script>

<div class="flex justify-center">
  <span class="badge badge-soft badge-lg {style.badge} gap-1.5 whitespace-nowrap">
    <span class="inline-flex" aria-hidden="true"><style.icon size={IconSize.Small} /></span>
    <span>{value}</span>
  </span>
</div>
