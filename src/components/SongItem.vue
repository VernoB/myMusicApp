<template>
  <main>
    <li
      class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:shadow-sm hover:scale-100 transformZ hover:bg-gray-200"
    >
      <div>
        <RouterLink
          class="font-bold block text-gray-600"
          :to="{ name: 'song', params: { id: song.docId } }"
        >
          {{ song.modified_name }}</RouterLink
        >
        <span class="text-gray-500 text-sm">{{ song.display_name }}</span>
      </div>

      <div class="text-gray-600 text-lg hover:text-cyan-600">
        <RouterLink
          :to="{ name: 'song', params: { id: song.docId }, hash: '#comments' }"
          v-slot="{ navigate }"
        >
          <span class="comments" @click="navigate">
            <i class="fa fa-comments text-gray-600 hover:text-cyan-600"></i>
            {{ song.comment_count }}
          </span>
        </RouterLink>
      </div>
    </li>
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
defineProps({
  song: { type: Object, required: true },
});
</script>

<style scoped>
.transformZ :hover {
  transform: perspective(5000px) translateZ(200px);
}
</style>
