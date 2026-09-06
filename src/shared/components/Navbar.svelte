<script lang="ts">
  import { page } from "$app/state";
  import ThemeSelector from "$shared/components/ThemeSelector.svelte";
  import { IconSize } from "$shared/icons";
  import { CodeXml, Gauge } from "@lucide/svelte";

  type Crumb = { label: string; href?: string; isCurrent: boolean };

  function formatSegment(segment: string): string {
    return decodeURIComponent(segment)
      .replace(/[-_]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((word) => (/^\d+$/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join(" ");
  }

  const segments = $derived(page.url.pathname.split("/").filter(Boolean));

  const crumbs = $derived<Crumb[]>([
    { label: "Home", href: segments.length === 0 ? undefined : "/", isCurrent: segments.length === 0 },
    ...segments.map((segment, index) => {
      const isCurrent = index === segments.length - 1;
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        label: formatSegment(segment),
        href: isCurrent ? undefined : href,
        isCurrent,
      };
    }),
  ]);
</script>

<header class="bg-base-100 sticky top-0 z-30 shadow-sm">
  <nav class="navbar mx-auto w-11/12 gap-2 px-0" aria-label="Main">
    <div class="flex min-w-0 flex-1 items-center gap-4">
      <a class="btn btn-ghost shrink-0 px-2 text-xl normal-case" href="/">
        <span class="inline-flex" aria-hidden="true"><Gauge size={IconSize.Large} /></span>
        DynoSpec
      </a>
      <nav class="breadcrumbs min-w-0 flex-1 overflow-x-auto text-sm whitespace-nowrap" aria-label="Breadcrumb">
        <ul>
          {#each crumbs as crumb (crumb.label + (crumb.href ?? "-current"))}
            <li>
              {#if crumb.isCurrent}
                <span aria-current="page">{crumb.label}</span>
              {:else}
                <a href={crumb.href}>{crumb.label}</a>
              {/if}
            </li>
          {/each}
        </ul>
      </nav>
    </div>
    <div class="flex shrink-0 items-center gap-1">
      <a
        class="btn btn-ghost btn-sm btn-square"
        href="https://github.com/Az-21/dynospec"
        aria-label="View DynoSpec on GitHub"
      >
        <span class="inline-flex" aria-hidden="true"><CodeXml size={IconSize.Medium} /></span>
      </a>
      <ThemeSelector />
    </div>
  </nav>
</header>
