<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="newSong(songs)"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i
            class="fas"
            :class="playerStore.playing ? 'fa fa-pause' : 'fa fa-play'"
          ></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ songs.modified_name }}</div>
          <div>{{ songs.genre }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments {{ songs.comment_count }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <!-- message confirmation  -->
        <div
          v-if="comment_show_alert"
          :class="comment_alert_variant"
          class="text-white text-center font-bold p-4 mx-6 my-2"
        >
          {{ comment_message }}
        </div>
        <!-- end message confirmation  -->
        <div class="p-6">
          <vee-form
            :validation-schema="schema"
            @submit="addComment"
            v-if="userLoggedIn"
          >
            <vee-field
              as="textarea"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
              name="comment"
            ></vee-field>
            <ErrorMessage name="comment" class="text-red-500 pb-1" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            v-model="commentSort"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto" id="comments">
      <commentLists
        v-for="comment in commentsSorted"
        :key="comment.commentId"
        :comment="comment"
      />
    </ul>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref, computed, watch } from "vue";
import {
  getDoc,
  doc,
  addDoc,
  getDocs,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import { ErrorMessage } from "vee-validate";
import { storeToRefs } from "pinia";

import {
  songsCollections,
  auth,
  commentsCollections,
} from "@/includes/firebase";
import useUserStore from "@/stores/user";
import usePlayerStore from "@/stores/player";
import commentLists from "@/components/commentLists.vue";

const route = useRoute();
const router = useRouter();
const songs = ref({});
const comments = ref([]);
const comment_in_submission = ref(false);
const comment_show_alert = ref(false);
const comment_message = ref("Please wait, comment in submission");
const comment_alert_variant = ref("bg-blue-400");
const { id } = route.params;
const { userLoggedIn } = storeToRefs(useUserStore());
const playerStore = usePlayerStore();
const { newSong } = playerStore;
//get the doc reference to the database
const docRef = doc(songsCollections, id);

// provide("valueSong", songs);

// const nberComment = ref(0);
const commentSort = ref("1");
const commentsSorted = computed(() => {
  return comments.value.slice().sort((a, b) => {
    if (commentSort.value === "1") {
      return new Date(b.datePosted) - new Date(a.datePosted);
    }

    return new Date(a.datePosted) - new Date(b.datePosted);
  });
});

onBeforeMount(async () => {
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists) {
    router.push({ name: "home" });
    return;
  }

  const { sort } = route.query;
  commentSort.value = sort === "1" || sort === "2" ? sort : "1";

  songs.value = docSnapshot.data();

  await getComments();
});

//schema for validation
const schema = {
  comment: "required|min:3",
};

const addComment = async (values, { resetForm }) => {
  comment_show_alert.value = true;
  comment_in_submission.value = true;
  comment_alert_variant.value = "bg-blue-400";
  comment_message.value = "Please wait, comment in submission";
  //add_comment in the database
  const comment = {
    content: values.comment,
    datePosted: new Date().toString(),
    sid: id,
    username: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
  };

  await addDoc(commentsCollections, comment)
    .then(async () => {
      comment_show_alert.value = true;
      comment_in_submission.value = false;
      comment_alert_variant.value = "bg-green-400";
      comment_message.value = "Comment added successfully";

      songs.value.comment_count = +1;
      await updateDoc(doc(songsCollections, id), {
        comment_count: songs.value.comment_count,
      });

      // console.log(data);
      getComments();
    })
    .catch((error) => {
      console.error(error);

      comment_in_submission.value = false;
      comment_alert_variant.value = "bg-red-400";
      comment_message.value = "Oops! Something went wrong";
    });

  setTimeout(() => {
    comment_show_alert.value = false;
  }, 5000);
  resetForm();
  console.log(values);
};

const getComments = async () => {
  const q = query(commentsCollections, where("sid", "==", id));
  const docSnapshot = await getDocs(q);

  comments.value = []; //reset comments
  docSnapshot.forEach((doc) => {
    comments.value.push({
      commentId: doc.id,
      ...doc.data(),
    });
  });
};

watch(commentSort, (newVal) => {
  if (newVal == route.query.sort) {
    return;
  }
  console.log(newVal);
  router.push({
    query: {
      sort: newVal,
    },
  });
});
</script>
