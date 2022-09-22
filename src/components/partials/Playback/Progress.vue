<template>
  <div class='playback-progress__container'>
    <span
      class='playback-progress__scrub'
      @click.prevent='updateSeek'>
      <span
        class='playback-progress__scrub-bar'
        :style='{ width: `${playbackProgress}%` }'
      >
      </span>
      <span
        class='playback-progress__scrub-track'
        :style='{
          left: `${playbackProgress}%`,
          transform: `translateX(${playbackProgress > 90 ? -5 : 0}px)`,
        }'
      >
      </span>
    </span>
    <!-- <div class='web-chrome-playback-lcd__timing typography-system-10'>
      <div
        class='web-chrome-playback-lcd__playback-time'
        aria-label='Elapsed 0:30'
      >
      </div>
      <div
        class='web-chrome-playback-lcd__time-end web-chrome-playback-lcd__time-end--remaining'
        aria-label='Remaining 1:30'
      >
        1:30
      </div>
    </div> -->
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PlaybackProgress',
  setup() {
    const store = useStore();

    const playbackProgress = computed(() => store.state.player.playerProgress);

    const updateSeek = (e) => store.dispatch('player/updateSeek', e);

    return {
      playbackProgress,
      updateSeek,
    };
  },
};
</script>

<style lang='scss' scoped>
.playback-progress {
  &__container {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  &__scrub {
    width: 100%;
    height: 3px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3;
    background-color: #5f5f5f;
    display: inline-block;
    cursor: pointer;

    &:is(:hover) {
      & .playback-progress__scrub-track {
        visibility: visible;
      }
    }

    &-bar {
      position: absolute;
      bottom: 0;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.92);
    }

    &-track {
      width: 6px;
      height: 10px;
      position: absolute;
      bottom: 0px;
      background-color: #7c7c7c;
      cursor: pointer;
      visibility: hidden;
    }
  }
}
</style>
