import { defineStore } from "pinia";
import { ref } from "vue";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "@/includes/firebase";

export default defineStore("user", () => {
  const userLoggedIn = ref(false);

  async function register(values) {
    await createUserWithEmailAndPassword(
      auth,
      values?.email,
      values?.password
    ).then(async (obj) => {
      // console.log("Registered", obj);
      //insert in firestore
      const { uid } = obj.user;

      await setDoc(doc(db, "users", uid), {
        name: values?.name,
        email: values?.email,
        country: values?.country,
        age: values?.age,
      });

      await obj.user.updateProfile({
        displayName: values?.name,
      });
    });
    // console.log(currentUser);
  }

  userLoggedIn.value = true;

  return {
    userLoggedIn,
    register,
  };
});
