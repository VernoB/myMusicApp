<template>
  <div
    v-if="reg_show_alert"
    :class="reg_alert_variant"
    class="text-white text-center font-bold p-4 rounded mb-4"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="register"
    :initial-values="formValues"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
        :rules="required"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          type="password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
      <!-- <ErrorMessage class="text-red-600" name="password" /> -->
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirmPassword"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antartica">Antartica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service </label>
    </div>
    <ErrorMessage class="text-red-600" name="tos" />
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_on_submit"
    >
      Submit
    </button>
  </vee-form>
</template>

<script setup>
import { ErrorMessage } from "vee-validate";
import { ref } from "vue";

import useUserStore from "@/stores/user";
// const {} = storeToRefs(useUserSTore());

const schema = {
  name: "required|min:3|max:100|alpha_spaces|alpha",
  email: "required|min:5|max:100|email",
  age: "required|alpha_num|min_value:18|max_value:100|numeric",
  password: "required|min:8|max:100|excluded:password",
  confirmPassword: "required|password_mismatch:@password",
  country: "required|country_excluded:Antartica",
  tos: "tos_required",
};

const register = async (values) => {
  reg_show_alert.value = true;
  reg_on_submit.value = true;
  reg_alert_variant.value = "bg-blue-500";
  reg_alert_msg.value = "please wait ! Your account is being created";

  //Create user account.
  const userStore = useUserStore();
  try {
    // Create user account request
    await userStore.register(values);
  } catch (error) {
    let errornessage = null;

    switch (error.code) {
      case "auth/email-already-in-use":
        errornessage = "Email already in use";
        break;
      case "auth/credential-already-in-use":
        errornessage = "The credential is already linked to a User";
        break;
      case "auth/account-exists-with-different-credential":
        errornessage =
          "There are already exists an account with the email address asserted by the credential";
        break;
      default:
        console.error(error);
        errornessage = " Error occured ! please try again";
        break;
    }

    reg_on_submit.value = false;
    reg_alert_variant.value = "bg-red-500";
    reg_alert_msg.value = errornessage;
    return;
  }

  //add data to the database without the password field\
  // try {
  //   // console.log("data : ", values);
  //   //add user to the database without the password field
  // } catch (error) {
  //   console.log(error);
  // }

  reg_alert_variant.value = "bg-green-500";
  reg_alert_msg.value = `Success! Your account has been created`;
};

//for default values
const formValues = {
  country: "USA",
};

const reg_on_submit = ref(false),
  reg_show_alert = ref(false),
  reg_alert_variant = ref("bg-blue-500"),
  reg_alert_msg = ref("please wait ! Your account is being created");
</script>
