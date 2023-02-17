<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"
    ></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et
          dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
          suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
          pulvinar, fringilla lorem eget, ullamcorper urna.
        </p>
      </div>
    </div>

    <img
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="/assets/img/introduction-music.png"
    />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <SongItem v-for="song in songs" :key="song.docId" :song="song" />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import {
  doc,
  getDoc,
  getDocs,
  query,
  limit,
  orderBy,
  startAfter,
} from "@firebase/firestore";
import { songsCollections } from "@/includes/firebase";
import SongItem from "@/components/SongItem.vue";

export default {
  name: "HomeComponents",
  components: {
    SongItem,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 20,
      pendingRequests: false,
    };
  },
  async created() {
    await this.getSongs();

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;

      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight; // return a boolean value

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      //if we have already a request, return the function
      if (this.pendingRequests) {
        return;
      }

      this.pendingRequests = true;

      let querySnapshot;

      if (this.songs.length) {
        console.log("[first]");
        //fetch the last song
        const lastDoc = await getDoc(
          doc(songsCollections, this.songs[this.songs.length - 1].docId)
        );

        console.log("[lastDoc]");
        console.log(lastDoc);
        //construct a new query snapshot
        querySnapshot = query(
          songsCollections,
          orderBy("modified_name"),
          startAfter(lastDoc),
          limit(this.maxPerPage)
        );
      } else {
        //construct a new query snapshot
        querySnapshot = query(
          songsCollections,
          orderBy("modified_name"),
          limit(this.maxPerPage)
        );
      }
      //fetch all the docs with query snapshot
      const snapshot = await getDocs(querySnapshot);

      snapshot.forEach((doc) => {
        this.songs.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
      //change the state of the pending requests.
      this.pendingRequests = false;
    },
  },
};
</script>
