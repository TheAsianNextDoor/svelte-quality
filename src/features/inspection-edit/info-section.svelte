<script lang="ts">
  import InfoItem from './info-item.svelte';

  export let task;
</script>

<div class="flex w-full flex-col gap-3 border-r-2 border-r-black bg-cyan-100 p-8">
  <div class="text-2xl">{task.title}</div>
  <InfoItem title="Description" content={task.description} />
  <InfoItem title="Linked Material" content="add later" />
  <InfoItem title="Status" content={task.status} />
</div>
