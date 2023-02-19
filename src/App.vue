<script setup>
// import { storeToRefs } from "pinia";
// import { computed } from "vue";
import "animate.css";
import HeaderVue from "@/components/HeaderVue.vue";
import AuthVue from "@/components/AuthVue.vue";
import ThePlayer from "@/components/ThePlayer.vue";
// import useUserStore from "./stores/user";

// const userLoggedIn = computed(() => storeToRefs(useUserStore()));
// console.log(userLoggedIn.value.userLoggedIn);
</script>

<template>
  <HeaderVue />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in" enter-active-class="">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <!-- Player -->
  <the-player></the-player>
  <!--Auth vue components--->
  <AuthVue />
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.2 linear infinite;
}
.fade-live-to {
  transition: all 0.2 linear infinite;
  opacity: 0;
}
</style>
