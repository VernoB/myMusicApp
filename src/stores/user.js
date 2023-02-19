import { defineStore } from "pinia";
import { ref } from "vue";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth, db } from "@/includes/firebase";

export default defineStore("user", () => {
  const userLoggedIn = ref(false);

  //create a new user
  async function register(values) {
    await createUserWithEmailAndPassword(
      auth,
      values?.email,
      values?.password
    ).then(async (obj) => {
      //insert in firestore
      const { uid } = obj.user;

      await setDoc(doc(db, "users", uid), {
        name: values?.name,
        email: values?.email,
        country: values?.country,
        age: values?.age,
      });

      console.log("Registered");

      await updateProfile(auth.currentUser, {
        displayName: values.name,
      })
        .then(() => {
          console.log("Profile updated");
        })
        .catch((err) => console.error(err));
    });
    // console.log(currentUser);
    // userLoggedIn.value = true;
  }

  //check if data exists locally
  // if (localStorage.getItem("loggedIn")) {
  //   userLoggedIn.value = JSON.parse(localStorage.getItem("loggedIn"));
  // }

  async function authenticate(values) {
    await signInWithEmailAndPassword(auth, values?.email, values?.password);
    userLoggedIn.value = true;
  }

  const userLogout = async () => {
    const user = auth.currentUser;

    console.log(user);

    await signOut(auth)
      .then(() => {
        console.log("user signout");
      })
      .catch((err) => console.error(err));
  };

  //watch for the user changes and save the user for self authentication
  // watch(userLoggedIn, (userVal) =>
  //   localStorage.setItem("loggedIn", JSON.stringify(userVal))
  // );

  return {
    userLoggedIn,
    userLogout,
    register,
    authenticate,
  };
});
