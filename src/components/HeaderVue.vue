<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex items-center py-5 px-2">
      <!-- App Name -->
      <RouterLink
        class="font-sans text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >Mu<span class="font-light">sic</span></RouterLink
      >

      <div class="flex flex-grow items-center justify-end">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1 font-sans no-underline">
          <li v-if="!userStoreRef.userLoggedIn">
            <a
              href="#"
              class="px-2 text-white"
              placeholder="login/register"
              @click.prevent="modalStore.isOpenStore"
            >
              Login/register
            </a>
          </li>
          <template v-else>
            <!-- Navigation Links -->
            <li>
              <RouterLink to="/about" class="px-2 text-white">
                About</RouterLink
              >
            </li>
            <li>
              <RouterLink class="px-2 text-white" to="/admin"
                >Manage</RouterLink
              >
            </li>
            <li>
              <a
                class="px-1 text-white"
                placeholder="logout"
                href="#"
                @click.prevent="Applogout"
                >Logout</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useModalStore } from "@/stores/modal";
import useUserStore from "@/stores/user";

import { useRouter, useRoute, RouterLink } from "vue-router";

const userStoreRef = useUserStore();
const modalStore = useModalStore();

const router = useRouter();
const route = useRoute();

//watch action

const Applogout = () => {
  if (route.meta?.requiresAuth) {
    // Signout the user from database
    userStoreRef.userLogout();
    userStoreRef.$patch({
      userLoggedIn: false,
    });

    router.push({ name: "home" });
  }
};
</script>
