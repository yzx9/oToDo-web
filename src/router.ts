import { createRouter as _createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/", component: () => import("./views/Home.vue") },
  { path: "/login", component: () => import("./views/Login.vue") },
  { path: "/register", component: () => import("./views/Register.vue") },
]

export function createRouter() {
  return _createRouter({
    history: createWebHistory(),
    routes,
  })
}
