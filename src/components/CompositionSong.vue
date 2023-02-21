<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-xl font-bold text-gray-800">
        {{ song.modified_name }}
      </h4>
      <button
        class="ml-1 py-1 px-2 text-lg rounded text-red-300 hover:text-red-400 hover:bg-slate-200 float-right"
        @click="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-lg rounded text-gray-500 hover:text-gray-700 hover:bg-slate-200 float-right"
        @click.prevent="showForm = !showForm"
        :key="song.docId"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>

    <div>
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="show_alert && showForm"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form
        v-show="showForm"
        :validation-schema="schema"
        :initial-values="song"
        @submit="edit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t("admin.title") }}</label>
          <vee-field
            type="text"
            name="modified_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song
          Title"
            @input="$emit('updateUnsavedFlags', true)"
          />
          <ErrorMessage class="text-red-600" name="title" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="$emit('updateUnsavedFlags', true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-2 px-3 mr-1 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-2 text-gray-900 mx-3 rounded border border-gray-600 bg-transparent"
          :disabled="in_submission"
          @click.prevent="showForm = !showForm"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ErrorMessage } from "vee-validate";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { deleteObject, ref as refStorage } from "firebase/storage";

import { songsCollections, storage } from "@/includes/firebase";

const showForm = ref(false);
const in_submission = ref(false);
const show_alert = ref(false);
const alert_variant = ref("bg-blue-600");
const alert_message = ref("Please wait! submission in process");

const schema = {
  modified_name: "required",
  genre: "alpha_spaces",
};

const songData = defineProps({
  song: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["updatedSong", "removeSong", "updateUnsavedFlags"]);

//Modify the song from the server
const edit = async (values) => {
  show_alert.value = true;
  in_submission.value = true;
  alert_variant.value = "bg-blue-600";
  alert_message.value = "Please wait! submission in process";

  await updateDoc(doc(songsCollections, songData.song.docId), values)
    .then(() => {
      in_submission.value = false;
      alert_variant.value = "bg-green-500";
      alert_message.value = "Song updated successfully";
      //update the song in the parent component
      emit("updatedSong", songData.index, values);
      //the form is already saved
      emit("updateUnsavedFlags", false);
      // console.log("song  updated successfully");
      // console.log(snap);
    })
    .catch((err) => {
      in_submission.value = false;
      alert_message.value = "Ooops! something wrong with submission";
      alert_variant.value = "bg-red-500";

      console.error(err);
      return;
    });

  setTimeout(() => {
    show_alert.value = false;
  }, 5000);
};

//delete song from the server
const deleteSong = async () => {
  //create the reference to the file
  const songRef = refStorage(
    storage,
    `songStream/${songData.song.original_name}`
  );
  //So that all the operation will be made once
  await Promise.all([
    //delete the file in the database
    await deleteObject(songRef).then(() => {
      console.log("File deleted successfully");
    }),
    //delete the document in the database relarte to the file
    await deleteDoc(doc(songsCollections, songData.song.docId)).then(() => {
      emit("removeSong", songData.index);
      // console.log("Document successfully deleted!");
    }),
  ])
    .then(() => {
      console.log("Delete successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>
