<script lang="ts">
  import { Tab, TabContent, Tabs } from 'carbon-components-svelte';

  enum ActionTypes {
    observations = 'observations',
    comments = 'comments',
    attachments = 'attachments',
    photos = 'photos',
  }
</script>

<div class="flex h-full w-full flex-col gap-3 p-8">
  <div class="text-2xl">Actions</div>
  <div class="h-full w-full">
    <Tabs autoWidth>
      <Tab label={ActionTypes.observations} />
      <Tab label={ActionTypes.comments} />
      <Tab label={ActionTypes.attachments} />
      <Tab label={ActionTypes.photos} />
      <svelte:fragment slot="content">
        <TabContent>Observation 1</TabContent>
        <TabContent>comments 2</TabContent>
        <TabContent>attachments 3</TabContent>
        <TabContent>photos 3</TabContent>
      </svelte:fragment>
    </Tabs>
  </div>
</div>
