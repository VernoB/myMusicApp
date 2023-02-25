<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t("home.listen") }}</h1>
          <i18n-t
            class="w-full md:w-8/12 mx-auto text-gray-300 text-lg"
            tag="p"
            keypath="home.message"
            for="home.git"
          >
            <a
              @click="openOnGit"
              :href="url"
              target="openGit"
              class="decoration-0 text-white underline decoration-sky-500 font-medium"
              >{{ $t("home.git") }}</a
            >
          </i18n-t>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <!-- search form -->
      <div class="max-w-full py-8">
        <div class="max-w-2xl relative px-4 flex items-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5 lg:w-8 lg:h-8 ml-2 fill-gray-500 absolute z-50 active:outline-none"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clip-rule="evenodd"
            />
          </svg>

          <form action="" class="w-full">
            <input
              type="text"
              name="Search song"
              id=""
              placeholder="Search for song ..."
              class="w-[50%] text-xl md:text-xl lg:text-2xl text-gray-700 md:py-4 pl-8 py-3 md:pr-3 lg:py-6 lg:pl-12 lg:pr-4 bg-white transition-all border-gray-400 ring-inset ring-2 translate-x-1 delay-75 animate-pulse focus:animate-none rounded-md sm:placeholder:text-sm lg:placeholder:text-xl focus:w-[80%] lg:focus:w-full sm:focus:text-sm"
              v-model="searchSong"
            />
          </form>
        </div>
      </div>
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon="'headphones-alt'"
        >
          <span class="card-title">Songs</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongItem
            v-for="song in searchSongs"
            :key="song.docId"
            :song="song"
          />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
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
      windowObjectReference: null,
      url: "https://github.com/VernoB/myMusicApp",
      searchSong: "",
    };
  },

  computed: {
    // this.songs = this.songs.filter((song) => song.include(this.searchSong));
    searchSongs() {
      if (this.searchSong) {
        return this.songs.filter((song) => {
          console.log(song);
          return this.searchSong
            .toLowerCase()
            .split(" ")
            .every((s) => song.modified_name.toLowerCase().includes(s));
        });
      } else {
        return this.songs;
      }
    },
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
    openOnGit() {
      const link = window.document.querySelector("a[targt='openGit']");
      link.addEventListener("click", (event) => {
        this.openRequestedTab(link.href);
        event.preventDefault();
      });
    },
    openRequestedTab(url, windowName) {
      if (
        this.windowObjectReference === null ||
        this.windowObjectReference.closed
      ) {
        this.windowObjectReference = window.open(url, windowName);
      } else {
        this.windowObjectReference.focus();
      }
    },
  },
};
</script>
