<template>
  <section class='song-detail'>
    <img
      class='song-detail__cover'
      src="https://picsum.photos/270"
      height="270"
      width="270"
    />
    <div class='song-detail__description'>
      <h1 class='song-name'>{{ song?.modified_name }}</h1>
      <div class='artist-name'>{{ song?.artist_name }}</div>
      <BaseButton
        color='secondary'
        class='play-button'
        @onClick='onPlaySong'
      >
        <img
          class='svg-white'
          :src='playSVG'
          width='36'
          height='36'
        />
        {{ $t('views.songDetail.play') }}
      </BaseButton>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

import { songsCollection } from '@/includes/firebase';

import playSVG from '@/assets/svg/play.svg';
import pauseSVG from '@/assets/svg/pause.svg';

export default {
  name: 'SongDetail',
  setup() {
    const store = useStore();

    const song = ref({});

    const onPlaySong = () => {
      const songItem = song.value;

      store.dispatch('player/newSong', songItem);
    };

    return {
      playSVG,
      pauseSVG,
      song,
      onPlaySong,
    };
  },
  async beforeRouteEnter(to, _, next) {
    const docSnapshot = await songsCollection.doc(to.params.id).get();

    next((vm) => {
      if (!docSnapshot.exists) {
        vm.$router.push({ name: 'listen-now' });
        return;
      }

      // eslint-disable-next-line no-param-reassign
      vm.song = docSnapshot.data();
    });
  },
};
</script>

<style lang='scss' scoped>
.song-detail {
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 2.5rem 2.5rem 0;
  display: flex;
  flex-direction: row;
  gap: 2.125rem;

  @include on-small {
    padding: 0rem 1rem 0;
  }

  &__cover {
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .3);
  }

  &__description {
    display: flex;
    flex-direction: column;
    line-height: 2rem;

    .song-name {
      font-size: 1.625rem;
      font-weight: 600;
      margin-top: auto;
    }

    .artist-name {
      font-size: 1.625rem;
      font-weight: 400;
      color: $nav-list-item-link-icon-color;
      margin-bottom: auto;
    }

    .play-button {
      min-width: 72px;
      width: min-content;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 0;
    }
  }
}
</style>
