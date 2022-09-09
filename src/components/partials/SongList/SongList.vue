<template>
  <div class='song-list'>
    <h2 class="song-list-title">{{ title }}</h2>
    <ol class='song-list-body'>
      <SongListItem
        v-for='song in songs'
        :key='song.docID'
        :song='song' />
    </ol>
  </div>
</template>

<script>
import SongListItem from './SongListItem.vue';

export default {
  name: 'SongList',
  components: { SongListItem },
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    songs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  $grid-rows: 2;
  $grid-column-gap: 20px;
  $min-column-width: 144px;

  border-top: 0.5px solid $white-100;
  padding: 15px 0 31px;

  &-title {
    font-size: 17px;
    line-height: 1.29412;
    font-weight: 700;
    letter-spacing: .6px;
    padding-bottom: 13px;
  }

  &-body {
    --gap-multiplier: 5;
    --column-divider: 6;
    --grid-row-gap: 0px;

    width: 100%;
    min-height: 160px;
    display: grid;
    column-gap: $grid-column-gap;
    row-gap: var(--grid-row-gap);
    grid-auto-flow: row;
    grid-template-rows: repeat($grid-rows, max-content);
    grid-template-columns: repeat(auto-fill,
      minmax($min-column-width, calc((100%
        - var(--gap-multiplier) * #{$grid-column-gap}) / var(--column-divider))));

    @include on-large {
      --gap-multiplier: 4;
      --column-divider: 3;
      --grid-row-gap: 24px;
    }

    @include on-medium {
      --gap-multiplier: 3;
      --column-divider: 3;
    }

    @include on-small {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
