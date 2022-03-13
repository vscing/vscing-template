import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// Register icon sprite
import 'virtual:svg-icons-register'
import App from './App.vue';
import { createApp } from 'vue';
import { setupErrorHandle } from '@/services/errorHandle';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/store';
import { setupGlobDirectives } from '@/directives';
import { registerGlobComp } from '@/components/registerGlobComp';
import { Lazyload } from 'vant';

async function bootstrap() {
  // vue实例
  const app = createApp(App);

  // Pinia store
  setupStore(app);

  // Register global components
  registerGlobComp(app);

  // vue-router
  setupRouter(app);

  // vue-router-guard
  setupRouterGuard(router);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // 懒加载
  app.use(Lazyload, {
    loading: new URL('./assets/images/loading.png', import.meta.url).href, // 图片加载时默认图片
    error: new URL('./assets/images/error.png', import.meta.url).href// 图片加载失败时默认图片
  });

  // 挂载
  app.mount('#app');
}

// 启动
bootstrap();
