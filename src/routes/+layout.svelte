<script lang="ts">
  import { Theme } from 'carbon-components-svelte';

  import 'carbon-components-svelte/css/all.css';
  import '../app.css';

  let theme = 'white' as const;
</script>

<Theme bind:theme persist persistKey="solid-quality-theme" />

<slot />
