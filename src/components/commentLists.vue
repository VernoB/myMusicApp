<template>
  <li class="p-6 bg-gray-50 border border-gray-200">
    <!-- Comment Author -->
    <div class="mb-5">
      <div class="font-bold">{{ comment.displayName }}</div>
      <time>{{
        formatRelative(Date.parse(comment.datePosted), new Date())
      }}</time>
    </div>

    <p>
      {{ comment.content }}
    </p>
  </li>
</template>
<script setup>
import { formatRelative } from "date-fns";

defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>
