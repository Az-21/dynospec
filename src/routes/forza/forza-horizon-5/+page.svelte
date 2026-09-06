<script lang="ts">
  import { forzaHorizon5Tunes } from "$lib/data/forza/forza-horizon-5";
  import { sortFn_forzaClass } from "$lib/types/forza";
  import ForzaCarClass from "$shared/components/Forza/ForzaCarClass.svelte";
  import ForzaDisciplineBadge from "$shared/components/Forza/ForzaDisciplineBadge.svelte";
  import ForzaShareCode from "$shared/components/Forza/ForzaShareCode.svelte";
  import HandlingMeter from "$shared/components/HandlingMeter.svelte";
  import { persistTableState } from "$shared/components/Table/table-persistence.svelte";
  import Table, { createDefaultTableFeatures, createDefaultTableOptions } from "$shared/components/Table/Table.svelte";
  import TruncatedText from "$shared/components/Table/TruncatedText.svelte";
  import { createColumnHelper, createTable, renderComponent } from "@tanstack/svelte-table";

  type ForzaTune = (typeof forzaHorizon5Tunes)[number];

  const features = createDefaultTableFeatures();

  const columnHelper = createColumnHelper<typeof features, ForzaTune>();

  const columns = columnHelper.columns([
    columnHelper.accessor((row) => row.car.make, { id: "make", header: "Make" }),
    columnHelper.accessor((row) => row.car.model, { id: "model", header: "Model" }),
    columnHelper.accessor((row) => row.car.year, { id: "year", header: "Year" }),
    columnHelper.accessor((row) => row.forza.class, {
      id: "class",
      header: "Class",
      sortFn: sortFn_forzaClass,
      cell: (ctx) => renderComponent(ForzaCarClass, { value: ctx.getValue() }),
    }),
    columnHelper.accessor((row) => row.forza.discipline, {
      id: "discipline",
      header: "Discipline",
      cell: (ctx) => renderComponent(ForzaDisciplineBadge, { value: ctx.getValue() }),
    }),
    columnHelper.accessor((row) => row.forza.drivetrain, {
      id: "drivetrain",
      header: "Drivetrain",
    }),
    columnHelper.accessor((row) => row.forza.shareCode, {
      id: "shareCode",
      header: "Share Code",
      cell: (ctx) => renderComponent(ForzaShareCode, { value: ctx.getValue() }),
    }),
    columnHelper.accessor((row) => row.forza.createdOn, {
      id: "createdOn",
      header: "Created On",
    }),
    columnHelper.accessor((row) => row.tune.creator, { id: "creator", header: "Creator" }),
    columnHelper.accessor((row) => row.tune.difficulty, {
      id: "difficulty",
      header: "Difficulty",
      filterFn: "equalsString",
    }),
    columnHelper.accessor((row) => row.tune.speed, {
      id: "speed",
      header: "Speed",
      filterFn: "equalsString",
    }),
    columnHelper.accessor((row) => row.tune.handling, {
      id: "handling",
      header: "Handling",
      sortFn: "basic",
      filterFn: "equalsString",
      cell: (ctx) => renderComponent(HandlingMeter, { value: ctx.getValue() }),
    }),
    columnHelper.accessor((row) => row.tune.meta, {
      id: "meta",
      header: "Meta",
      filterFn: "equalsString",
    }),
    columnHelper.accessor((row) => row.tune.leaderboard, {
      id: "leaderboard",
      header: "Leaderboard",
      cell: (ctx) => renderComponent(TruncatedText, { value: ctx.getValue(), title: "Leaderboard" }),
    }),
    columnHelper.accessor((row) => row.tune.comment, {
      id: "comment",
      header: "Comment",
      cell: (ctx) =>
        renderComponent(TruncatedText, { value: ctx.getValue(), title: "Comment", maxWidthClass: "max-w-128" }),
    }),
  ]);

  const data = $state(forzaHorizon5Tunes);

  const table = createTable({
    features,
    columns,
    get data() {
      return data;
    },
    ...createDefaultTableOptions(),
  });

  const saveStatus = persistTableState("forza-horizon-5", table);
</script>

<h1 class="text-base-content mb-4 text-2xl font-bold">Forza Horizon 5 Tunes</h1>

<Table {table} {saveStatus} />
