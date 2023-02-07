import { createRouter, createWebHistory, useRouter } from "vue-router";
import HomeComponent from "@/views/HomeView.vue";
import AboutComponent from "@/views/AboutView.vue";
import AdminComponent from "@/views/AdminView.vue";
import PageNotFound from "@/views/404-view.vue";

import userStore from "@/stores/user.js";

const routes = [
  {
    path: "/",
    component: HomeComponent,
    name: "home",
    sensitive: true,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/about",
    component: AboutComponent,
    name: "about",
    sensitive: false,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    component: AdminComponent,
    sensitive: true,
    name: "admin",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    name: "errorPage",
    component: PageNotFound,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  linkExactActiveClass: "border-b-2 border-white transition delay-200 pb-2",
});

router.beforeEach(async (to, from, next) => {
  console.log("Global guards");
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const storeUSer = userStore();

  if (storeUSer.userLoggedIn && to.name !== "home") {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
