export const getVueTemplate = (projectName: string) => ({
  'package.json': `{
  "name": "${projectName}",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.11"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.5.2",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vue-tsc": "^1.8.25"
  }
}`,
  'src/main.ts': `import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')`,
  'src/App.vue': `<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Vite + Vue</h1>
      <button
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        @click="count++"
      >
        Count is {{ count }}
      </button>
    </div>
  </div>
</template>`,
  'src/style.css': `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  'src/components/.gitkeep': '',
  'src/assets/.gitkeep': '',
  'src/stores/.gitkeep': '',
  'src/types/.gitkeep': '',
  'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`,
  '.gitignore': `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`,
  'vite.config.ts': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`,
  'env.d.ts': `/// <reference types="vite/client" />`
});