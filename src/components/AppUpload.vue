<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        :class="{ 'bg-green-600 border-solid border-green-400': is_uploaded }"
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid hidden md:block"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragenter.prevent.stop="is_uploaded = true"
        @dragover.prevent.stop="is_uploaded = true"
        @dragend.prevent="is_uploaded = false"
        @dragleave.prevent.stop="is_uploaded = false"
        @drop.prevent.stop="uploaded($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <!-- <hr class="my-6 hidden md:block" /> -->
      <input
        type="file"
        name="drop file"
        id="drag_drop"
        multiple
        @change="uploaded($event)"
        class="py-3 font-light flex justify-center items-center mt-0"
      />
      <!-- Progess Bars -->
      <div
        class="mb-4"
        v-for="upload in uploads"
        :key="upload.name"
        :class="upload.text_class"
      >
        <!-- File Name -->
        <div class="font-bold text-sm">
          <i :class="upload.icon"> </i>
          {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :style="{ width: upload.current_progress + '%' }"
            :class="upload.variant"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import {
  ref as refFirebase,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc } from "firebase/firestore";

import { storage } from "@/includes/firebase";
import { auth, songsCollections } from "@/includes/firebase";

const is_uploaded = ref(false);
const uploads = ref([]);

// onBeforeUnmount(() => {
//   //cancel if the component unmounted
//   uploads.value.forEach((upload) => {
//     upload.uploadTask.cancel();
//   });
// });

const uploaded = ($event) => {
  is_uploaded.value = false;

  // check if we use the drap and drop or input fields

  const files = $event.dataTransfer
    ? [...$event.dataTransfer.files]
    : [...$event.target.files]; // in the input the files live in target fields

  files.forEach((file) => {
    const { name, type } = file;

    if (type === "audio/mpeg" || type === "audio/wav") {
      //the file is an audio/mpeg file
      const songsRef = refFirebase(
        storage,
        `songstream/${name.split(" ").join("_")}`
      );

      const metadata = {
        contentType: "audio/mpeg",
      };

      const uploadTask = uploadBytesResumable(songsRef, file, metadata);

      const uploadsIdx =
        uploads.value.push({
          uploadTask,
          name: name.split(" ").join("_"),
          current_progress: 0,
          variant: "bg-blue-400",
          icon: "fas fa-spinner fa-spin",
          text_class: "",
        }) - 1;

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploads.value[uploadsIdx].current_progress = progress;
        },
        (error) => {
          //error if the upload failed
          switch (error.code) {
            case "storage/unauthorized":
              uploads.value[uploadsIdx].variant = "bg-red-400";
              uploads.value[uploadsIdx].icon = "fas fa-times";
              uploads.value[uploadsIdx].text_class = "text-red-400";
              console.error(
                `User doesn't have permission to access the object`
              );
              break;
            case "storage/canceled":
              uploads.value[uploadsIdx].variant = "bg-red-400";
              uploads.value[uploadsIdx].icon = "fas fa-times";
              uploads.value[uploadsIdx].text_class = "text-red-400";
              console.log("User canceled the upload");
              break;

            case "storage/unauthenticated":
              uploads.value[uploadsIdx].variant = "bg-red-400";
              uploads.value[uploadsIdx].icon = "fas fa-times";
              uploads.value[uploadsIdx].text_class = "text-red-400";
              console.log(
                `User doesn't have permission to access the object, please authenticate and try again`
              );
              break;

            case "storage/unknown":
              uploads.value[uploadsIdx].variant = "bg-red-400";
              uploads.value[uploadsIdx].icon = "fas fa-times";
              uploads.value[uploadsIdx].text_class = "text-red-400";
              console.log(error.serverResponse);
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        async () => {
          // Upload completed successfully
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (response) => {
              //add song to the list with the name of the user
              const song = {
                uid: auth.currentUser.uid,
                display_name: auth.currentUser.displayName,
                original_name: uploadTask.snapshot.ref.name,
                modified_name: uploadTask.snapshot.ref.name,
                genre: "",
                comment_count: 0,
                url: response,
              };

              //add song to the database
              const docRef = await addDoc(songsCollections, song);

              uploads.value[uploadsIdx].variant = "bg-green-500";
              uploads.value[uploadsIdx].icon = "fas fa-check";
              uploads.value[uploadsIdx].text_class = "text-green-500";
              console.log(
                "Upload completed successfully \n file available at : " +
                  response +
                  "\n and add to db with id: " +
                  docRef.id
              );
            }
          );
        }
      );

      return;
    } else {
      console.error("Error uploading wrong format...");
      // console.log(file.name);
      return;
    }
  });

  // console.log(files[0].type);
};

const cancelUpload = () => {
  uploads.value.forEach((upload) => {
    upload.uploadTask.cancel();
  });
};

defineExpose({
  cancelUpload,
});
</script>
