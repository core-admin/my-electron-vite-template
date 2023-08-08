import { createApp } from 'vue';
import App from './App.vue';
import { setupComponent } from './internal';

function bootstrap() {
  const app = createApp(App);
  setupComponent(app);
  app.mount('#root');
}

bootstrap();
