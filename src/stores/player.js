import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Howl } from "howler";

import utilities from "@/includes/utilities";

export default defineStore("player", () => {
  const current_song = ref({});
  const sound = ref({});
  const seek = ref("00:00");
  const duration = ref("00:00");
  const playerProgress = ref("0%");

  const playing = computed(() => {
    if (sound.value.playing) {
      return sound.value.playing();
    }
    return false;
  });

  const newSong = async (song) => {
    if (sound.value instanceof Howl) {
      sound.value.unload();
    }

    current_song.value = song;
    sound.value = new Howl({
      src: [song.url],
      html5: true,
    });

    sound.value.play();

    sound.value.on("play", () => {
      requestAnimationFrame(() => {
        progress();
      });
    });
  };

  const togglingAudio = () => {
    if (!sound.value.playing) {
      return;
    }

    if (sound.value.playing()) {
      sound.value.pause();
    } else {
      // newSong(song);
      sound.value.play();
    }
  };

  const progress = () => {
    seek.value = utilities.formatTime(sound.value.seek());
    duration.value = utilities.formatTime(sound.value.duration());

    playerProgress.value = `${
      (sound.value.seek() / sound.value.duration()) * 100
    }%`;

    if (sound.value.playing()) {
      requestAnimationFrame(progress);
    }
  };

  const updateSeek = (event) => {
    if (!sound.value.playing()) {
      return;
    }

    const { x, width } = event.currentTarget.getBoundingClientRect();

    const clickX = event.clientX - x;
    const percentage = clickX / width;
    const seconds = sound.value.duration() * percentage;

    sound.value.seek(seconds);
    sound.value.once("seek", progress);
    // console.log(event);
  };

  return {
    current_song,
    playing,
    seek,
    duration,
    playerProgress,
    updateSeek,
    newSong,
    togglingAudio,
  };
});
