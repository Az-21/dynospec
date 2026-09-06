<script lang="ts">
  import { IconSize } from "$shared/icons";
  import { Expand, X } from "@lucide/svelte";

  let {
    value,
    title,
    maxWidthClass = "max-w-64",
  }: { value: string | null; title: string; maxWidthClass?: string } = $props();

  let dialog: HTMLDialogElement | undefined = $state();
  let textElement: HTMLSpanElement | undefined = $state();
  let isTruncated = $state(false);

  $effect(() => {
    const element = textElement;
    if (!element) return;

    const update = () => {
      isTruncated = element.scrollHeight > element.clientHeight + 1;
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    document.fonts?.ready.then(update).catch(() => {});
    return () => observer.disconnect();
  });
</script>

{#if value === null}
  <span class="block {maxWidthClass}">—</span>
{:else}
  <button
    type="button"
    class="group flex items-center gap-1.5 text-left {maxWidthClass} {isTruncated
      ? 'cursor-pointer'
      : 'cursor-default'}"
    aria-haspopup="dialog"
    aria-label="Show full text"
    title={value}
    onclick={() => {
      if (isTruncated) dialog?.showModal();
    }}
  >
    <span class="line-clamp-2 min-w-0 flex-1" bind:this={textElement}>{value}</span>
    {#if isTruncated}
      <span
        class="group-hover:text-primary inline-flex shrink-0 opacity-60 transition-colors group-hover:opacity-100"
        aria-hidden="true"
      >
        <Expand size={IconSize.Small} />
      </span>
    {/if}
  </button>
  <dialog class="modal" bind:this={dialog}>
    <div class="modal-box">
      <div class="mb-2 flex items-center justify-between gap-2">
        <h3 class="text-lg font-bold">{title}</h3>
        <form method="dialog">
          <button class="btn btn-ghost btn-sm btn-circle" value="close" aria-label="Close">
            <span class="inline-flex" aria-hidden="true"><X size={IconSize.Medium} /></span>
          </button>
        </form>
      </div>
      <p class="break-words whitespace-pre-wrap">{value}</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button aria-label="Close">Close</button>
    </form>
  </dialog>
{/if}
