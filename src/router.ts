import {
  createRouter as _createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router"
import { hasSignIn } from "./session"

const routes: RouteRecordRaw[] = [
  { path: "/", component: () => import("./views/Home.vue") },
  {
    path: "/signin",
    component: () => import("./views/SignIn.vue"),
    meta: { public: true },
  },
  {
    path: "/user/signup",
    component: () => import("./views/user/SignUp.vue"),
    meta: { public: true },
  },
  {
    path: "/user/reset",
    component: () => import("./views/user/Reset.vue"),
    meta: { public: true },
  },
]

export function createRouter(): Router {
  const router = _createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeEach((to) => {
    if (to.meta?.public || hasSignIn.value) return

    if (to.path === "/" && typeof to.query.code === "string") {
      router.push({
        path: "/signin",
        query: { code: to.query.code, state: to.query.state },
      })
      return
    }

    router.push({
      path: "/signin",
      query: { from: to.fullPath },
    })
  })

  return router
}
