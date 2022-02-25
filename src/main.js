import Vue from "vue";

import 'normalize.css'; //Normalize的作用就是统一浏览器的初始样式
import './registerServiceWorker'; //pwa 缓存技术 无网状态下也能访问

//ElementUI
import '@/styles/theme/index.css';
import ElementUI from 'element-ui';

import App from "./App.vue";
import router from "./router";
import store from "./store";

//ui配置
Vue.use(ElementUI, {
  //size: 'medium', // set element-ui default size
  //locale: enLang // 如果使用中文，无需设置，请删除
})

//引入 ECharts 主模块
import Echarts from 'echarts/lib/echarts';
Vue.prototype.$echarts=Echarts;


//应用配置
Vue.config.performance = true //性能追踪
Vue.config.productionTip = false //隐藏warn提示

//全局api配置
import '@/core/filters' // global filters
                        //global directives

//路由权限
import './permission'

//错误拦截
import '@/utils/errorLog'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
