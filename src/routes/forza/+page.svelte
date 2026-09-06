<script lang="ts">
  import { forzaHorizon5Tunes } from "$lib/data/forza/forza-horizon-5";
  import { forzaHorizon6Tunes } from "$lib/data/forza/forza-horizon-6";
  import GameHeroCard from "$shared/components/GameHeroCard.svelte";
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-base-content/60 text-xs font-bold tracking-[0.3em] uppercase">Forza Series</p>
  </div>

  <div class="grid gap-6 md:grid-cols-2">
    <GameHeroCard
      href="/forza/forza-horizon-5"
      kicker="Forza Series"
      title="Forza Horizon 5"
      meta="{forzaHorizon5Tunes.length} tunes"
    />
    <GameHeroCard
      href="/forza/forza-horizon-6"
      kicker="Forza Series"
      title="Forza Horizon 6"
      meta="{forzaHorizon6Tunes.length} tunes"
    />
  </div>
</div>
