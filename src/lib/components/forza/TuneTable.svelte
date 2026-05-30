<script lang="ts">
    import type { ColumnDef, SortKey, Tune } from "./types";
    import { Difficulty, CarClass, Characteristic } from "./types";

    let {
        columns,
        rows,
        sortKeys = $bindable(),
    } = $props<{
        columns: ColumnDef[];
        rows: Tune[];
        sortKeys: SortKey[];
    }>();

    let visibleCols = $derived(columns.filter((c: ColumnDef) => c.visible));

    function handleSort(col: ColumnDef, e: MouseEvent) {
        if (!col.sortable) return;
        const multi = e.shiftKey;
        const colId = col.id;

        const idx = sortKeys.findIndex((s: SortKey) => s.key === colId);

        if (!multi) {
            sortKeys =
                idx >= 0 && sortKeys.length === 1
                    ? sortKeys[0].dir === "asc"
                        ? [{ key: colId, dir: "desc" }]
                        : []
                    : [{ key: colId, dir: "asc" }];
        } else {
            if (idx < 0) sortKeys = [...sortKeys, { key: colId, dir: "asc" }];
            else if (sortKeys[idx].dir === "asc")
                sortKeys = sortKeys.map((s: SortKey, i: number) => (i === idx ? { ...s, dir: "desc" as const } : s));
            // Explicitly typed the placeholder parameter as SortKey here:
            else sortKeys = sortKeys.filter((_: SortKey, i: number) => i !== idx);
        }
    }

    function getSortInfo(colId: string) {
        const idx = sortKeys.findIndex((s: SortKey) => s.key === colId);
        return idx < 0 ? null : { dir: sortKeys[idx].dir, rank: idx + 1 };
    }

    const DIFF_STYLE: Record<string, string> = {
        [Difficulty.Easy]: "text-m3-tertiary bg-m3-tertiaryContainer/20 border-m3-tertiary/30",
        [Difficulty.Medium]: "text-amber-400 bg-amber-500/15 border-amber-500/30",
        [Difficulty.Hard]: "text-m3-error bg-m3-errorContainer/20 border-m3-error/30",
    };

    const CHAR_STYLE: Record<string, string> = {
        [Characteristic.HandlingPlus]: "text-m3-primary bg-m3-primaryContainer/10 border-m3-primary/40",
        [Characteristic.HandlingMinus]: "text-m3-secondary bg-m3-secondaryContainer/20 border-m3-secondary/40",
        [Characteristic.Balanced]: "text-m3-onSurfaceVariant bg-m3-surfaceContainerHighest border-m3-outlineVariant",
        [Characteristic.PowerMinus]: "text-orange-300 bg-orange-500/10 border-orange-500/30",
        [Characteristic.PowerPlus]: "text-red-400 bg-red-500/15 border-red-500/40",
    };

    const CLASS_STYLE: Record<string, string> = {
        [CarClass.X]: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        [CarClass.S2]: "bg-red-500/20 text-red-300 border-red-500/30",
        [CarClass.S1]: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        [CarClass.A]: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        [CarClass.B]: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        [CarClass.C]: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        [CarClass.D]: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    };
</script>

<div class="px-6 pb-10 overflow-x-auto">
    <div class="rounded-lg border border-m3-outlineVariant overflow-hidden min-w-max">
        <table class="w-full text-sm border-collapse font-mono">
            <thead class="sticky top-0 z-20 bg-m3-surfaceContainer border-b border-m3-outlineVariant">
                <tr>
                    {#each visibleCols as col}
                        {@const si = getSortInfo(col.id)}
                        <th
                            class="px-4 py-3 text-left whitespace-nowrap select-none {col.sortable
                                ? 'cursor-pointer hover:bg-m3-surfaceContainerHigh'
                                : ''} transition-colors duration-100"
                            onclick={(e) => handleSort(col, e)}
                        >
                            <div class="flex items-center gap-1.5">
                                <span
                                    class="text-[10px] font-semibold uppercase tracking-[0.18em] {si
                                        ? 'text-m3-primary'
                                        : 'text-m3-onSurfaceVariant'}">{col.label}</span
                                >
                                {#if si}
                                    <span class="text-m3-primary text-[10px] leading-none"
                                        >{si.dir === "asc" ? "↑" : "↓"}</span
                                    >
                                {:else if col.sortable}
                                    <span class="text-m3-onSurfaceVariant/30 text-[10px]">↕</span>
                                {/if}
                            </div>
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody class="bg-m3-surface text-sm">
                {#each rows as row, i}
                    <tr
                        class="border-b border-m3-outlineVariant/40 {i % 2 !== 0
                            ? 'bg-m3-surfaceContainerLow/40'
                            : ''} hover:bg-m3-surfaceContainer/50 transition-colors duration-75 group"
                    >
                        {#each visibleCols as col}
                            <td class="px-4 py-2.5 align-middle text-m3-onSurface">
                                {#if col.id === "make"}<span class="font-sans font-semibold tracking-wide"
                                        >{row.make}</span
                                    >
                                {:else if col.id === "model"}<span class="font-sans text-m3-onSurfaceVariant"
                                        >{row.model}</span
                                    >
                                {:else if col.id === "year"}<span class="text-xs tabular-nums text-m3-onSurfaceVariant"
                                        >{row.year}</span
                                    >
                                {:else if col.id === "carClass"}<span
                                        class="inline-block px-2 py-0.5 rounded border text-[11px] font-bold tracking-wider {CLASS_STYLE[
                                            row.carClass
                                        ]}">{row.carClass}</span
                                    >
                                {:else if col.id === "category"}<span class="text-xs text-m3-onSurfaceVariant"
                                        >{row.category}</span
                                    >
                                {:else if col.id === "characteristic"}
                                    <span
                                        class="inline-block px-2 py-0.5 border rounded text-[11px] font-medium tracking-wide {CHAR_STYLE[
                                            row.characteristic
                                        ]}"
                                    >
                                        {row.characteristic}
                                    </span>
                                {:else if col.id === "difficulty"}
                                    <span
                                        class="inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-semibold {DIFF_STYLE[
                                            row.difficulty
                                        ]}"
                                    >
                                        {row.difficulty}
                                    </span>
                                {:else if col.id === "tuneId"}
                                    <span
                                        class="text-xs text-m3-primary bg-m3-primaryContainer/10 border border-m3-primary/20 px-2 py-0.5 rounded tracking-wider"
                                        >{row.tuneId}</span
                                    >
                                {:else if col.id === "tuneCreator"}<span class="text-xs text-m3-onSurfaceVariant"
                                        >{row.tuneCreator}</span
                                    >
                                {:else if col.id === "comments"}<span
                                        class="font-sans text-xs block max-w-[220px] truncate cursor-default text-m3-onSurfaceVariant"
                                        title={row.comments}>{row.comments}</span
                                    >
                                {:else if col.id === "time"}<span
                                        class="tabular-nums text-xs text-m3-tertiary tracking-wider">{row.time}</span
                                    >
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {:else}
                    <tr
                        ><td
                            colspan={visibleCols.length}
                            class="px-4 py-20 text-center font-mono text-sm text-m3-onSurfaceVariant"
                            >No tunes match your filters</td
                        ></tr
                    >
                {/each}
            </tbody>
        </table>
    </div>
</div>
