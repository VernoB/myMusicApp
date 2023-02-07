<template>
  <div
    v-if="login_show_alert"
    :class="login_alert_variant"
    class="text-white text-center font-bold p-4 rounded mb-4"
  >
    {{ login_alertt_message }}
  </div>
  <vee-form :validation-schema="schemaLogin" @submit="login" class="px-4 py-6">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      :disabled="login_on_submit"
      type="submit"
      class="block w-full bg-purple-600 text-white py-2 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script setup>
import { ErrorMessage } from "vee-validate";
import { ref } from "vue";

import useUserStore from "@/stores/user";

const userStore = useUserStore();

const schemaLogin = {
  //login form
  email: "required|min:5|max:100|email",
  password: "required|min:8|max:100",
};

const login = async (values) => {
  console.log(userStore);
  login_show_alert.value = true;
  login_in_submission.value = true;
  login_alertt_message.value = "please wait we are logged in";

  try {
    await userStore.authenticate(values);
    // this.$router.push("/");
    // userStore.$onAction()
    login_alertt_message.value = "Successfully logged in";
    login_alert_variant.value = "bg-green-600";
    login_on_submit.value = true;
    window.location.reload();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    login_alert_variant.value = "bg-red-600";
    login_alertt_message.value =
      "Error login please check your email and password";

    login_on_submit.value = false;
    console.error({ code: errorCode, message: errorMessage });
    return;
  }
  // console.log(values);
  login_show_alert.value = true;
  console.log("Test successful" + userStore.userStored);
};

const login_show_alert = ref(false);
const login_in_submission = ref(true);
const login_alert_variant = ref("bg-blue-600 text-white");
const login_alertt_message = ref("Please wait we are logged in");
const login_on_submit = ref(false);
</script>
