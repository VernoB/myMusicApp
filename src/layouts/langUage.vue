<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Languages
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        as="select"
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        v-model="$i18n.locale"
      >
        <div class="py-1">
          <MenuItem
            as="option"
            v-slot="{ active }"
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
            :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block px-4 py-2 text-sm',
            ]"
          >
            {{
              locale === "en"
                ? "English"
                : locale === "fr"
                ? "French"
                : "Russian"
            }}
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
</script>
