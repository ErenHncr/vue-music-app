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
    <div class='playback-progress__time'>
      <div
        class='playback-progress__time-seek'
        :aria-label='"Elapsed" + seek'
      >
        {{ seek }}
      </div>
      <div
        class='playback-progress__time-remaining'
        :aria-label='"Remaining" + remaining'
      >
        {{ remaining }}
      </div>
    </div>
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
    const seek = computed(() => store.state.player.seek);
    const remaining = computed(() => store.state.player.remaining);

    const updateSeek = (e) => store.dispatch('player/updateSeek', e);

    return {
      playbackProgress,
      seek,
      remaining,
      updateSeek,
    };
  },
};
</script>

<style lang='scss'>
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

  &__time {
    width: 100%;
    position: absolute;
    bottom: 3px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 6px;

    color: rgba(255, 255, 255, .4);
    font-size: 10px;
    font-weight: 400;

    visibility: hidden;

    &-remaining {
      &::before {
        content: '-'
      }
    }
  }
}
</style>
