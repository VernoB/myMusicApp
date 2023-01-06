import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("user", () => {
  const userLoggedIn = ref(false);
});
