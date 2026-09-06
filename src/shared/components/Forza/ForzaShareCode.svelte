<script lang="ts" module>
  import { ANIMATION_DURATION } from "$shared/animations";
</script>

<script lang="ts">
  import { IconSize } from "$shared/icons";
  import { Copy, CopyCheck } from "@lucide/svelte";
  import { onDestroy } from "svelte";
  import { scale } from "svelte/transition";

  let { value }: { value: string } = $props();

  let copied = $state(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;
  onDestroy(() => clearTimeout(timeout));

  async function copyToClipboard() {
    try {
      await navigator.clipboard?.writeText(value);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — still flash feedback.
    }
    copied = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => (copied = false), ANIMATION_DURATION);
  }
</script>

<div class="flex justify-center">
  <button
    type="button"
    class="btn btn-ghost btn-lg gap-1.5 font-mono whitespace-nowrap"
    title="Copy share code {value}"
    aria-label={copied ? `Copied ${value}` : `Copy share code ${value}`}
    onclick={copyToClipboard}
  >
    <span>{value}</span>
    {#key copied}
      <span
        class="inline-flex size-5 items-center justify-center"
        in:scale={{ duration: ANIMATION_DURATION, start: 0.6 }}
      >
        {#if copied}
          <CopyCheck size={IconSize.Medium} class="text-primary" />
        {:else}
          <Copy size={IconSize.Medium} class="opacity-60" />
        {/if}
      </span>
    {/key}
  </button>
</div>
