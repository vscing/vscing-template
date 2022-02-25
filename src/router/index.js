import Vue from "vue";
import Router from "vue-router";
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'
import store from "../store";

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...constantRouterMap, ...asyncRouterMap]
});

// router.addRoutes(asyncRouterMap)

export default router;
