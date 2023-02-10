<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload ref="upload" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <div class="border border-gray-200 p-3 mb-4 rounded">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
              <div>
                <form>
                  <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <input
                      type="text"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Song Title"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <input
                      type="text"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Genre"
                    />
                  </div>
                  <button
                    type="submit"
                    class="py-2 px-3 mr-1 rounded text-white bg-green-600"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class="py-1.5 px-2 text-gray-900 mx-3 rounded border border-gray-600 bg-transparent"
                  >
                    Go Back
                  </button>
                </form>
              </div>
            </div>
            <div class="border border-gray-200 p-3 mb-4 rounded">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div class="border border-gray-200 p-3 mb-4 rounded">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div class="border border-gray-200 p-3 mb-4 rounded">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div class="border border-gray-200 p-3 mb-4 rounded">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div></div>
</template>

<script setup>
import AppUpload from "@/components/AppUpload.vue";
import { onBeforeRouteLeave } from "vue-router";
import { ref } from "vue";

const upload = ref(null);

onBeforeRouteLeave((to, from, next) => {
  upload.value.cancelUpload();
  next();
  // console.log(to, from, upload);
});
</script>
<!-- <script>
import userStore from "@/stores/user";

export default {
  name: "admin",
  beforeRouteEnter(to, from, next) {
    // ...
    const userLoggin = userStore();

    if (userLoggin.userLoggedIn) {
      next();
    } else {
      console.log(" 2 ---- before route enter");
      next({ name: "home" });
    }
  },
};
</script> -->
