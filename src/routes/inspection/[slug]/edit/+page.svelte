<script lang="ts">
  import { ActionSection, InfoSection } from '@features/inspection-edit';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div>Inspection Edit {data.page}</div>

{#each data.tasks as task}
  <div class="my-5 bg-gray-100">
    <div class="grid">
      <InfoSection {task} />
      <ActionSection />
    </div>
  </div>
{/each}

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-auto-flow: column;
    gap: 2em;
    justify-items: left;
  }
</style>
