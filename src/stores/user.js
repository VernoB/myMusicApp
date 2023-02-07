import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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

      await updateProfile(auth, {
        displayName: values?.name,
      });
    });
    // console.log(currentUser);
    userLoggedIn.value = true;
  }

  //check if data exists locally
  if (localStorage.getItem("loggedIn")) {
    userLoggedIn.value = JSON.parse(localStorage.getItem("loggedIn"));
  }

  async function authenticate(values) {
    await signInWithEmailAndPassword(auth, values?.email, values?.password);
    this.userLoggedIn = true;
  }

  const logout = () => userLoggedIn.value !== userLoggedIn.value;
  //  () => {
  //   userLoggedIn.value = false;
  // };

  //watch for the user changes and save the user for self authentication
  watch(userLoggedIn, (userVal) =>
    localStorage.setItem("loggedIn", JSON.stringify(userVal))
  );

  return {
    userLoggedIn,
    logout,
    register,
    authenticate,
  };
});
