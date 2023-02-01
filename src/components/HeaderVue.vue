<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex items-center py-5 px-2">
      <!-- App Name -->
      <a class="font-sans text-white font-bold uppercase text-2xl mr-4" href="#"
        >Mu<span class="font-light">sic</span></a
      >

      <div class="flex flex-grow items-center justify-end">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1 font-sans no-underline">
          <li v-if="!userStore.userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              placeholder="login/register"
              @click.prevent="store.isOpenStore"
              >Login/register</a
            >
          </li>
          <template v-else>
            <!-- Navigation Links -->
            <li>
              <a class="px-2 text-white" href="#" placeholder="manage"
                >Manage</a
              >
            </li>
            <li>
              <a
                class="px-1 text-white"
                href="#"
                placeholder="logout"
                @click.prevent="userStore.logout"
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

const store = useModalStore();
const userStore = useUserStore();
</script>
