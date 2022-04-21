<template>
  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white p-5 pb-4 text-left align-top w-full h-16">
    <div class="relative">
      <!-- Play/Pause Button -->
      <div
        id="player-play-button"
        class="float-left w-7 h-7 leading-3"
        @click.prevent="toggleAudio"
      >
        <button type="button">
          <i class="fa text-gray-500 text-xl"
          :class="{
            'fa-play': !playing,
            'fa-pause': playing,
          }"></i>
        </button>
      </div>
      <!-- Current Position -->
      <div class="flex float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-5 mr-2 mt-1">
        <span class="player-currenttime">{{ seek }}</span>
        <BarWave class="ml-3" :isPlaying="playing" />
      </div>
      <!-- Scrub -->
      <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
        <div
          class="absolute left-0 right-0 text-lg text-center mx-auto player-song-info"
          v-if="currentSong.modified_name"
        >
          <span class="song-title">{{ currentSong.modified_name }}</span>
          <span v-if="currentSong.display_name" class="song-artist">
            (Uploaded by {{ currentSong.display_name }})
          </span>
        </div>
        <!-- Scrub Container  -->
        <span
          class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer"
          @click.prevent="updateSeek">
          <!-- Player Ball -->
          <span
            class="absolute top-neg-10-5 left-neg-5 text-gray-800 text-lg"
            :style="{ left: playerProgress }"
          >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            :style="{ width: playerProgress }"
          ></span>
        </span>
      </div>
      <!-- Duration -->
      <div class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-8 mt-1">
        <span class="player-duration">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions, mapGetters, mapState,
} from 'vuex';
import BarWave from './BarWave.vue';

export default {
  name: 'Player',
  components: { BarWave },
  computed: {
    ...mapGetters(['playing']),
    ...mapState({
      seek: (state) => state.player.seek,
      duration: (state) => state.player.duration,
      playerProgress: (state) => state.player.playerProgress,
      currentSong: (state) => state.player.currentSong,
    }),
  },
  methods: { ...mapActions(['toggleAudio', 'updateSeek']) },
};
</script>
