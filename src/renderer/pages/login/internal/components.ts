import type { App } from 'vue';
import naiveUI from 'naive-ui';

export function setupComponent(app: App) {
  app.use(naiveUI);
}
