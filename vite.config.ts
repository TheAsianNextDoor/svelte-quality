/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';

// eslint-disable-next-line import/no-unresolved
import { sveltekit } from '@sveltejs/kit/vite';
import { optimizeCss } from 'carbon-preprocess-svelte';
import { visualizer } from 'rollup-plugin-visualizer';
// import checker from 'vite-plugin-checker'; uncomment when support is added
import EnvironmentPlugin from 'vite-plugin-environment';

import type { UserConfig } from 'vite';

const config: UserConfig = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [
    sveltekit(),
    visualizer(),
    EnvironmentPlugin('all', { prefix: 'WEB_' }),
    process.env.NODE_ENV === 'production' && optimizeCss(), // check if works when building
    // checker({
    //   eslint: {
    //     lintCommand: 'eslint --ignore-pattern "**/*.test.*"  --cache --ext ts,tsx "./src/"',
    //   },
    //   typescript: true,
    // }),
  ],
  server: {
    hmr: true,
    port: 3000,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/mocks/**',
    ],
    globals: true,
    include: ['src/**/?(*.)(test).[jt]s?(x)'],
    outputFile: {
      html: './reports/index.html',
    },
    setupFiles: ['./configs/test/setupTests.js'],
  },
};

export default config;
