<script lang="ts">
  import { IconSize } from "$shared/icons";
  import {
    DARK_THEMES,
    DEFAULT_THEME,
    LIGHT_THEMES,
    THEME_STORAGE_KEY,
    formatThemeName,
    themeNameSchema,
    type BrightnessFilter,
    type ThemeName,
  } from "$shared/themes";
  import { Check, ChevronDown, Moon, Sun } from "@lucide/svelte";
  import { onMount } from "svelte";

  type Props = {
    defaultTheme?: ThemeName;
    storageKey?: string;
    onchange?: (theme: ThemeName) => void;
  };

  let { defaultTheme = DEFAULT_THEME, storageKey = THEME_STORAGE_KEY, onchange }: Props = $props();

  let theme = $state<ThemeName>(DEFAULT_THEME);
  let brightness = $state<BrightnessFilter>("all");

  const showLightGroup = $derived(brightness === "all" || brightness === "light");
  const showDarkGroup = $derived(brightness === "all" || brightness === "dark");

  onMount(() => {
    const fallback = themeNameSchema.safeParse(defaultTheme);
    const stored = themeNameSchema.safeParse(localStorage.getItem(storageKey));
    theme = stored.success ? stored.data : fallback.success ? fallback.data : DEFAULT_THEME;
    document.documentElement.setAttribute("data-theme", theme);
  });

  function selectTheme(name: ThemeName, event: MouseEvent) {
    theme = name;
    document.documentElement.setAttribute("data-theme", name);
    localStorage.setItem(storageKey, name);
    onchange?.(name);
    // Move focus out of the dropdown so the CSS-only dropdown closes.
    (event.currentTarget as HTMLElement).blur();
  }
</script>

{#snippet dots(name: ThemeName)}
  <span data-theme={name} class="bg-base-200 inline-flex shrink-0 gap-0.5 rounded-md p-1" aria-hidden="true">
    <span class="bg-primary size-2 rounded-full"></span>
    <span class="bg-secondary size-2 rounded-full"></span>
    <span class="bg-accent size-2 rounded-full"></span>
    <span class="bg-neutral size-2 rounded-full"></span>
  </span>
{/snippet}

{#snippet rows(names: readonly ThemeName[])}
  {#each names as name (name)}
    {@const isActive = name === theme}
    <li class:menu-active={isActive}>
      <button
        type="button"
        aria-current={isActive ? "true" : undefined}
        aria-label={`Use ${formatThemeName(name)} theme`}
        onclick={(event) => selectTheme(name, event)}
      >
        {@render dots(name)}
        <span class="flex-1">{formatThemeName(name)}</span>
        {#if isActive}
          <span class="inline-flex" aria-hidden="true"><Check size={IconSize.Medium} /></span>
        {/if}
      </button>
    </li>
  {/each}
{/snippet}

<div class="dropdown dropdown-end">
  <div
    tabindex="0"
    role="button"
    class="btn btn-ghost btn-sm gap-2"
    aria-label={`Select theme, current: ${formatThemeName(theme)}`}
    aria-haspopup="true"
  >
    {@render dots(theme)}
    <span class="hidden font-normal sm:inline">{formatThemeName(theme)}</span>
    <span class="inline-flex opacity-60" aria-hidden="true"><ChevronDown size={IconSize.Medium} /></span>
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_tabindex: daisyUI CSS-only dropdown requires focusable content to stay open while interacting -->
  <!-- NOTE: no `display` utility (e.g. `flex`) on this panel: it would override
       daisyUI's `display: none` closed state and leave an invisible, clickable ghost menu. -->
  <div
    tabindex="0"
    class="dropdown-content bg-base-100 rounded-box border-base-300/50 z-50 mt-2 max-h-[26rem] w-64 overflow-x-hidden overflow-y-auto border shadow-2xl"
  >
    <div
      class="bg-base-100 border-base-300/50 sticky top-0 z-10 flex items-center justify-between gap-2 border-b p-3 pb-2"
    >
      <span class="text-sm font-semibold opacity-70">Theme</span>
      <div class="filter" role="radiogroup" aria-label="Filter themes by brightness">
        <input
          type="radio"
          name="theme-brightness"
          class="btn btn-xs filter-reset"
          aria-label="All"
          value="all"
          bind:group={brightness}
        />
        <input
          type="radio"
          name="theme-brightness"
          class="btn btn-xs"
          aria-label="Light"
          value="light"
          bind:group={brightness}
        />
        <input
          type="radio"
          name="theme-brightness"
          class="btn btn-xs"
          aria-label="Dark"
          value="dark"
          bind:group={brightness}
        />
      </div>
    </div>

    <ul class="menu w-full flex-nowrap overflow-x-hidden px-2 pb-2">
      {#if showLightGroup}
        <li class="menu-title">
          <span class="inline-flex items-center gap-1.5">
            <span class="inline-flex" aria-hidden="true"><Sun size={IconSize.Small} /></span>
            Light
          </span>
        </li>
        {@render rows(LIGHT_THEMES)}
      {/if}
      {#if showDarkGroup}
        <li class="menu-title">
          <span class="inline-flex items-center gap-1.5">
            <span class="inline-flex" aria-hidden="true"><Moon size={IconSize.Small} /></span>
            Dark
          </span>
        </li>
        {@render rows(DARK_THEMES)}
      {/if}
    </ul>
  </div>
</div>
