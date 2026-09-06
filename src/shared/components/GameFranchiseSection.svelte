<script lang="ts">
  import { IconSize } from "$shared/icons";
  import { ArrowRight } from "@lucide/svelte";
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    title: string;
    children?: Snippet;
  }

  let { href, title, children }: Props = $props();
</script>

<section class="border-base-300 bg-base-100 w-full overflow-hidden rounded-2xl border" aria-label="{title} games">
  <a
    {href}
    class="hover:bg-primary hover:text-primary-content focus-visible:outline-neutral flex w-full items-center gap-3 px-4 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:px-5"
    aria-label="{title} — Browse all games"
  >
    <span class="truncate text-xl font-black tracking-tight sm:text-2xl">
      {title}
    </span>

    <span class="flex-1"></span>

    <span class="btn btn-ghost btn-sm btn-circle shrink-0" aria-hidden="true">
      <ArrowRight size={IconSize.Medium} />
    </span>
  </a>

  {#if children}
    <div class="border-base-300 border-t p-4 sm:p-5">
      <div class="grid gap-6 md:grid-cols-2">
        {@render children()}
      </div>
    </div>
  {/if}
</section>
