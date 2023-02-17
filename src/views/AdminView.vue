<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload ref="upload" @addSong="addSong" />
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
            <CompositionSong
              v-for="(song, idx) in songData"
              :key="song.docId"
              :song="song"
              :index="idx"
              @updatedSong="updateSong"
              @removeSong="removeSong"
              @updateUnsavedFlags="updateUnsavedFlags"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <div></div>
</template>

<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { query, getDocs, where } from "firebase/firestore";
import { ref, onBeforeMount } from "vue";

import AppUpload from "@/components/AppUpload.vue";
import CompositionSong from "@/components/CompositionSong.vue";
import { songsCollections, auth } from "@/includes/firebase";

//retrieve the function on the children
const { uid } = auth.currentUser;
const upload = ref();
const songData = ref([]);
const unsavedFlags = ref(false);

onBeforeMount(async () => {
  const q = query(songsCollections, where("uid", "==", uid));
  const songSnap = await getDocs(q);

  songSnap.forEach(addSong);
});

const addSong = (doc) => {
  // console.log(doc);
  songData.value.push({ ...doc.data(), docId: doc.id });
};

const updateSong = (idx, values) => {
  console.log("EMMITTED EVENT: " + idx, values);
  songData.value[idx].modified_name = values.modified_name;
  songData.value[idx].genre = values.genre;
};

const updateUnsavedFlags = (flags) => {
  unsavedFlags.value = flags;
};

const removeSong = (idx) => {
  songData.value.splice(idx, 1);
};

//If route leave, we cancel the upload
onBeforeRouteLeave((to, from, next) => {
  if (!unsavedFlags.value) {
    next();
  } else {
    const leave = confirm("You have unsaved changes, do you want to leave ?");
    next(leave);
  }
  upload.value.cancelUpload();
  // console.log(to, from, upload);
});
</script>
