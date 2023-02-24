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
            <RouterLink
              to="#"
              class="px-2 text-white"
              placeholder="login/register"
              exact-active-class="no-active"
              @click.prevent="modalStore.isOpenStore"
            >
              Login/register
            </RouterLink>
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
              <RouterLink
                class="px-1 text-white"
                placeholder="logout"
                exact-active-class="no-active"
                @click.prevent="Applogout"
                to="#"
                >Logout</RouterLink
              >
            </li>
          </template>
        </ul>
        <div class="flex items-center hidden md:block font-sans relative">
          <select
            name=""
            id=""
            v-model="$i18n.locale"
            class="ml-2 py-2 px-1 bg-transparent border-solid border-2 rounded-md shadow-md text-white"
          >
            <option
              v-for="locale in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :value="locale"
              class="bg-gray-800 flex text-white pt-2 rounded-b-md"
            >
              {{
                locale === "en"
                  ? "English"
                  : locale === "fr"
                  ? "French"
                  : "Russian"
              }}
            </option>
          </select>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import navBar from "../layouts/navBar.vue";
import { useModalStore } from "@/stores/modal";
import useUserStore from "@/stores/user";
import { useRouter, useRoute, RouterLink } from "vue-router";

const userStoreRef = useUserStore();
const modalStore = useModalStore();

const router = useRouter();
const route = useRoute();

// const CurrentLocale = computed(() => {
//   // return this.$i18n.locale === "fr" ? "French" : "English";
// });
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
