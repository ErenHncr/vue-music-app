<template>
  <li class='song-list_item'>
    <router-link :to="{ name: 'song', params: { id: song.docID } }">
      <div class='song-list_item-controls'>
        <img class='song-list_item-controls_cover' src='https://picsum.photos/250' />
        <div class='song-list_item-controls_actions'>
          <button class='song-list_item-controls_actions-play' @click.prevent="">
            <img
              class='svg-white'
              :src='playSVG'
              width='30'
              height='30'
              alt='play icon'
            />
          </button>
        </div>
      </div>
      <span
        class='song-list_item-name'
        :title='song.modified_name'
      >
        {{song.modified_name}}
      </span>

    </router-link>
  </li>
</template>

<script>
import playSVG from '@/assets/svg/play.svg';

export default {
  name: 'SongListItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return { playSVG };
  },
};
</script>

<style lang="scss" scoped>
.song-list_item {
  $item-radius: 4px;

  min-height: 160px;
  border-radius: $item-radius;

  & > a {
    &:focus-visible {
      box-shadow: unset;
    }
  }

  &-controls {
    position: relative;

    &:is(:hover) {
      & .song-list_item-controls {
        &_actions {
          background-color: rgba(51, 51, 51, .3);
          visibility: visible;
          transition: all .3s;
        }
      }
    }

    &_cover {
      object-fit: cover;
      transition: width 0.3s ease-in-out;
      border-radius: $item-radius + 2px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, .1);
    }

    &_actions {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      visibility: hidden;

      &-play {
        all: unset;
        position: inherit;
        left: 10px;
        bottom: 10px;
        background-color: transparent;
        border-radius: 100%;
        backdrop-filter: blur(5px);
        background-color: rgba(#fff, .2);

        &:hover {
          background-color: rgb(214, 0, 23);
        }
      }
    }
  }

  &-name {
    display: -webkit-box;
    font-size: .75rem;
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: .4px;
    color: rgba(#fff, .92);
    word-break: break-word;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 6px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
