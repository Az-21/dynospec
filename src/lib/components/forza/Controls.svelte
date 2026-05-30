<script lang="ts">
    import { fade } from "svelte/transition";
    import type { ColumnDef, SortKey } from "./types";

    let {
        search = $bindable(),
        columns = $bindable(),
        sortKeys = $bindable(),
        totalRows,
        filteredRows,
    } = $props<{
        search: string;
        columns: ColumnDef[];
        sortKeys: SortKey[];
        totalRows: number;
        filteredRows: number;
    }>();

    let showColPanel = $state(false);
</script>

{#if showColPanel}
    <div class="fixed inset-0 z-40" onclick={() => (showColPanel = false)} transition:fade={{ duration: 80 }}></div>
{/if}

<div class="px-6 pb-4 flex items-center gap-3 flex-wrap">
    <div class="relative flex-1 min-w-48 max-w-xs">
        <input
            type="text"
            placeholder="Search all fields…"
            bind:value={search}
            class="w-full bg-m3-surfaceContainer border border-m3-outlineVariant rounded-md px-4 py-2 text-sm font-mono placeholder:text-m3-onSurfaceVariant/50 text-m3-onSurface focus:outline-none focus:border-m3-primary focus:bg-m3-surfaceContainerHigh transition-all duration-150"
        />
        {#if search}
            <button
                onclick={() => (search = "")}
                class="absolute right-3 top-1/2 -translate-y-1/2 text-m3-onSurfaceVariant hover:text-m3-onSurface text-xs font-mono"
                >✕</button
            >
        {/if}
    </div>

    <span class="text-[11px] font-mono tabular-nums text-m3-onSurfaceVariant shrink-0">
        {filteredRows}<span class="text-m3-onSurfaceVariant/50">/{totalRows}</span>
    </span>

    {#if sortKeys.length > 0}
        <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[10px] text-m3-onSurfaceVariant uppercase tracking-widest shrink-0 font-mono"
                >Sorted:</span
            >
            {#each sortKeys as s, i}
                <span
                    class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-m3-primaryContainer/30 border border-m3-primary/20 text-[11px] text-m3-primary font-mono"
                >
                    <span class="text-m3-primary/60 text-[9px] font-bold mr-0.5">{i + 1}</span>
                    {columns.find((c: ColumnDef) => c.id === s.key)?.label}
                    {s.dir === "asc" ? "↑" : "↓"}
                </span>
            {/each}
            <button
                onclick={() => (sortKeys = [])}
                class="text-[11px] text-m3-error hover:text-m3-error/80 transition-colors font-mono ml-0.5"
                >clear</button
            >
        </div>
    {:else}
        <span class="hidden sm:inline text-[11px] text-m3-onSurfaceVariant/60 italic font-mono">
            Click header to sort · Shift+click for multi-sort
        </span>
    {/if}

    <div class="flex-1"></div>

    <div class="relative z-50">
        <button
            onclick={() => (showColPanel = !showColPanel)}
            class="flex items-center gap-2 px-3 py-2 rounded-md bg-m3-surfaceContainer border border-m3-outlineVariant text-xs text-m3-onSurfaceVariant font-mono hover:border-m3-primary/50 hover:text-m3-onSurface transition-all"
        >
            Columns ({columns.filter((c: ColumnDef) => c.visible).length}/{columns.length})
        </button>

        {#if showColPanel}
            <div
                class="absolute right-0 top-full mt-1.5 bg-m3-surfaceContainerHigh border border-m3-outlineVariant rounded-lg shadow-2xl p-3 min-w-44"
                transition:fade={{ duration: 80 }}
            >
                <p class="text-[9px] uppercase tracking-[0.25em] text-m3-onSurfaceVariant mb-2.5 font-medium font-mono">
                    Visible Columns
                </p>
                <div class="space-y-0.5">
                    {#each columns as col}
                        <label
                            class="flex items-center gap-2 px-1.5 py-1 rounded cursor-pointer hover:bg-m3-surfaceContainerHighest transition-colors group"
                        >
                            <input
                                type="checkbox"
                                bind:checked={col.visible}
                                class="accent-m3-primary w-3 h-3 cursor-pointer"
                            />
                            <span
                                class="text-xs font-mono text-m3-onSurface group-hover:text-m3-primary transition-colors"
                                >{col.label}</span
                            >
                        </label>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>
