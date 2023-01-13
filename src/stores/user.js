import { defineStore, mapWritableState } from "pinia";
import { computed, ref } from "vue";

export default defineStore("user", () => {
  const userLoggedIn = ref(false);

  const useUserStore = computed(() =>
});
