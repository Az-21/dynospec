<script lang="ts">
    import { ALL_TUNES } from "./tunes";
    import type { ColumnDef, SortKey } from "$lib/components/forza/types";
    import { Difficulty } from "$lib/components/forza/types";

    import Header from "$lib/components/shared/Header.svelte";
    import Controls from "$lib/components/forza/Controls.svelte";
    import TuneTable from "$lib/components/forza/TuneTable.svelte";

    let columns = $state<ColumnDef[]>([
        { id: "make", label: "Make", visible: true, sortable: true },
        { id: "model", label: "Model", visible: true, sortable: true },
        { id: "year", label: "Year", visible: true, sortable: true },
        { id: "carClass", label: "Class", visible: true, sortable: true },
        { id: "category", label: "Category", visible: true, sortable: true },
        { id: "characteristic", label: "Type", visible: true, sortable: true },
        { id: "difficulty", label: "Difficulty", visible: true, sortable: true },
        { id: "tuneId", label: "Tune", visible: true, sortable: false },
        { id: "tuneCreator", label: "Creator", visible: true, sortable: true },
        { id: "comments", label: "Comments", visible: true, sortable: false },
        { id: "time", label: "Time", visible: true, sortable: true },
    ]);

    let search = $state("");
    let sortKeys = $state<SortKey[]>([]);

    const DIFF_ORDER: Record<Difficulty, number> = {
        [Difficulty.Easy]: 1,
        [Difficulty.Medium]: 2,
        [Difficulty.Hard]: 3,
    };

    let filteredRows = $derived.by(() => {
        let r = ALL_TUNES;
        const q = search.trim().toLowerCase();
        if (q) {
            r = r.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(q)));
        }
        if (sortKeys.length > 0) {
            r = [...r].sort((a, b) => {
                for (const { key, dir } of sortKeys) {
                    let av = key === "difficulty" ? DIFF_ORDER[a[key] as Difficulty] : a[key];
                    let bv = key === "difficulty" ? DIFF_ORDER[b[key] as Difficulty] : b[key];
                    if (av < bv) return dir === "asc" ? -1 : 1;
                    if (av > bv) return dir === "asc" ? 1 : -1;
                }
                return 0;
            });
        }
        return r;
    });
</script>

<svelte:head>
    <title>TuneLog | FH6</title>
</svelte:head>

<div class="min-h-screen bg-m3-background text-m3-onBackground selection:bg-m3-primary/30 overflow-x-hidden">
    <Header subtitle="Forza Horizon 6" />

    <Controls bind:search bind:columns bind:sortKeys totalRows={ALL_TUNES.length} filteredRows={filteredRows.length} />

    <TuneTable {columns} bind:sortKeys rows={filteredRows} />

    <footer class="px-6 pb-6 flex items-center justify-between mt-4">
        <span class="text-[10px] font-mono text-m3-onSurfaceVariant uppercase tracking-widest">
            TuneLog · FH6 · Personal Database
        </span>
        <span class="text-[10px] font-mono text-m3-onSurfaceVariant">
            {ALL_TUNES.length} tunes logged
        </span>
    </footer>
</div>
