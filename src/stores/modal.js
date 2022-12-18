import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  // state
  const isOpen = ref(false);
  // getter function
  const hiddenClass = computed(() => (!isOpen.value ? "hidden" : ""));
  // Action
  function isOpenStore() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, hiddenClass, isOpenStore };
});
