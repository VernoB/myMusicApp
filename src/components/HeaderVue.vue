<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center justify-end">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <a
              class="px-2 text-white fas fa-list"
              href="#"
              placeholder="manage"
            ></a>
          </li>
          <li>
            <a
              class="px-2 text-white fas fa-user"
              href="#"
              placeholder="login/register"
              @click.prevent="store.isOpenStore"
            ></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useModalStore } from "../stores/modal";

const store = useModalStore();
</script>
