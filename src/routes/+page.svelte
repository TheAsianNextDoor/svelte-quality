<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<template>
  <h1>Welcome to SvelteKit</h1>
  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
  <div>{data.name}</div>
</template>
