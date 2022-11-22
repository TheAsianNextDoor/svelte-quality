import adapter from '@sveltejs/adapter-auto';
import { optimizeImports } from 'carbon-preprocess-svelte';
import sveltePreprocess from 'svelte-preprocess';

// Consult https://github.com/sveltejs/svelte-preprocess
// for more information about preprocessors
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    sveltePreprocess({
      postcss: true,
    }),
    optimizeImports(),
  ],
  kit: {
    adapter: adapter(),
  },
};

export default config;
