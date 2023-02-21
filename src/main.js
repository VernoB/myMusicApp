import { createApp } from "vue";
import { createPinia } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { enableIndexedDbPersistence } from "firebase/firestore";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "./includes/validation";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

import "./assets/base.css";
import "./assets/main.css";
import Icon from "@/directives/icon";
import { auth, db } from "./includes/firebase";
import useUserStore from "@/stores/user";
import i18n from "./includes/Vue-18n";

enableIndexedDbPersistence(db).catch((error) => {
  console.log(error.code);
});

let app;

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(i18n);
    app.directive("icon", Icon);

    app.mount("#app");
  }

  const userStore = useUserStore();

  if (user) {
    console.log("user connected with id " + user.uid);
    userStore.$patch({
      userLoggedIn: true,
    });
  } else {
    console.log("No user connected yet");
    userStore.$patch({
      userLoggedIn: false,
    });
  }
});
// auth.onAuthStateChanged(() => {
//   if (!app) {
//     app = createApp(App);

//     app.use(createPinia());
//     app.use(router);
//     app.use(VeeValidatePlugin);

//     app.mount("#app");
//   }
// });
