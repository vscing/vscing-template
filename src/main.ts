import { createApp } from 'vue'
import { setupStore } from '@/store';
import { router, setupRouter } from '@/router';
import App from './App.vue'

async function bootstrap() {
  // vue实例
  const app = createApp(App);

  // Pinia store
  setupStore(app);

  // vue-router
  setupRouter(app);

  // 挂载
  app.mount('#app');
}

// 启动
bootstrap();