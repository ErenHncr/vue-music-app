<template>
  <span class="player-bar-wave" :data-playing="isPlaying">
    <span />
    <span />
    <span />
  </span>
</template>

<script>
export default {
  name: 'BarWave',
  props: {
    isPlaying: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.player-bar-wave {
  display: flex;
  gap: 2px;
  max-height: 20px;
  height: 20px;

  &[data-playing="false"] > span {
    animation-fill-mode: backwards;
    animation-iteration-count: 1;
  }

  & > span {
    display: inline-block;
    width: 8px;
    height: 15%;
    margin-top: auto;
    border-radius: 2px;
    background-color: rgba(5, 150, 105);
    animation: barAnimation 0.5s linear infinite alternate;
  }

  & span:nth-child(1) {
    animation-delay: 0.3s;
  }
  & span:nth-child(2) {
    animation-delay: 0.9s;
  }
  & span:nth-child(3) {
    animation-delay: 0.6s;
  }
}

@keyframes barAnimation {
  0% {
    height: 15%;
  }
  25% {
    height: 25%;
  }
  50% {
    height: 50%;
  }
  75% {
    height: 75%;
  }
  100% {
    height: 100%;
  }
}
</style>
