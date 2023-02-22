import { createRouter, createWebHistory } from "vue-router";
import userStore from "@/stores/user.js";

//Lazy loading Routes
const HomeComponent = () => import("@/views/HomeView.vue");
const AboutComponent = () => import("@/views/AboutView.vue");
const AdminComponent = () => import("@/views/AdminView.vue");
const PageNotFound = () => import("@/views/404-view.vue");
const SongView = () => import("@/views/SongView.vue");

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
      requiresAuth: false,
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
    name: "song",
    path: "/song/:id",
    component: SongView,
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
