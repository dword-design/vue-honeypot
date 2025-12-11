import type { App } from 'vue';

import component from './src/index.vue';

component.install = (app: App) => app.component('VueHoneypot', component);

if (typeof globalThis !== 'undefined') {
  (globalThis as Record<string, unknown>).VueHoneypot = component;
}

export default component;