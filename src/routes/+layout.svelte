<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$shared/components/Navbar.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>DynoSpec</title>
  <meta name="description" content="DynoSpec - Tunes DB" />
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="bg-base-200 text-base-content min-h-screen">
  <Navbar />
  <main class="mx-auto w-11/12 py-6">
    {@render children()}
  </main>
</div>
