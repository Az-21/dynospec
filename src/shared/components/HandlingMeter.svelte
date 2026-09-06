<script lang="ts">
  let { value }: { value: number } = $props();

  const levels = [1, 2, 3, 4, 5];
</script>

<span class="tooltip tooltip-top" data-tip="{value}/5 handling" aria-label="Handling {value} of 5">
  <span class="flex w-full items-center justify-center gap-1 whitespace-nowrap">
    {#each levels as level (level)}
      <span aria-hidden="true" class="h-2.5 w-4 rounded-full {level <= value ? 'bg-primary' : 'bg-base-300'}"></span>
    {/each}
  </span>
</span>
