<template>
  <div v-if='currentSong?.uid' class='playback-controls'>
    <div class='playback-controls__directionals'>
      <button
        class='playback-controls__directionals-button'
        aria-label='Play'
        :title="
          isPlaying ? $t('views.songDetail.pause') : $t('views.songDetail.play')
        "
        @click.prevent.stop='onToggleAudio'
      >
        <img
          v-show='!isPlaying'
          class='svg-white'
          :src='playLgSVG'
          width='32'
          height='32'
        />
        <img
          v-show='isPlaying'
          class='svg-white'
          :src='pauseSVG'
          width='32'
          height='32'
        />
      </button>
    </div>
  </div>
  <div v-if='currentSong?.uid' class='playback-display'>
    <!-- TODO: update image url with song cover -->
    <img
      class='playback-display__cover'
      src='https://picsum.photos/250'
      width='44'
      height='44'
    />
    <div class='playback-display__container'>
      <span class='song-name'>
        {{ currentSong?.modified_name }}
      </span>
      <span class='artist-name'>
        {{ currentSong?.artist_name }}
      </span>
      <Progress />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import playLgSVG from '@/assets/svg/play-lg.svg';
import pauseSVG from '@/assets/svg/pause.svg';

import Progress from './Progress.vue';

export default {
  name: 'PlaybackControl',
  components: { Progress },
  setup() {
    const store = useStore();

    const currentSong = computed(() => store.state.player?.currentSong);
    const isPlaying = computed(() => store.getters?.['player/playing']);

    const onToggleAudio = () => {
      store.dispatch('player/toggleAudio');
    };

    return {
      playLgSVG,
      pauseSVG,
      currentSong,
      isPlaying,
      onToggleAudio,
    };
  },
};
</script>

<style lang='scss'>
.playback-controls {
  height: inherit;

  &__directionals {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 .95rem;

    &-button {
      all: unset;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:focus, &:focus-visible, &:focus-within {
        outline: none;
      }
    }
  }
}

.playback-display {
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 13px;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: .75px;

  &:hover {
    .artist-name {
      max-width: calc(100% - 100px);
    }

    .playback-progress__time {
      visibility: visible;
      opacity: 1;
    }
  }

  &__cover {
    object-fit: cover;
    border-radius: inherit;
    border-radius: 2px 0 0 2px;
    z-index: 4;
  }

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: inherit;
    align-items: center;
    justify-content: flex-start;
    background-color: rgb(77, 77, 77);
    height: 100%;
    border-radius: 0 2px 2px 0;
    overflow: hidden;

    .song-name {
      max-width: calc(100% - 20px);
      color: rgba(#fff, .92);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 4px;
    }

    .artist-name {
      max-width: calc(100% - 20px);
      color: rgba(#fff, .64);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
