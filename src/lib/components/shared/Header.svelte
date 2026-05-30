<script lang="ts">
    let { subtitle = "Forza Horizon 6" } = $props<{ subtitle?: string }>();
</script>

<header class="px-6 pt-8 pb-5">
    <div class="flex items-end gap-4 mb-3">
        <h1 class="text-4xl font-black tracking-widest uppercase leading-none text-m3-onBackground">
            Dyno<span class="text-m3-primary">Spec</span>
        </h1>
        <div class="flex items-center gap-2 mb-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-m3-primary animate-pulse"></span>
            <span class="text-[11px] text-m3-primary/80 tracking-[0.3em] uppercase font-semibold font-mono">
                {subtitle}
            </span>
        </div>
    </div>
    <div class="h-px bg-linear-to-r from-m3-primary/70 via-m3-primary/15 to-transparent"></div>
    <div class="h-px mt-px bg-linear-to-r from-m3-primary/20 to-transparent"></div>
</header>
