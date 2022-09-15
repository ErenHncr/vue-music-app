<template>
  <li  class='song-list_item'>
    <router-link tabindex="-1" :to="{ name: 'song', params: { id: song.docID } }">
      <div class='song-list_item-controls' tabindex="0">
        <img tabindex="-1" class='song-list_item-controls_cover' src='https://picsum.photos/250' />
        <div tabindex="-1" class='song-list_item-controls_actions'>
          <button
            tabindex="-1"
            class='song-list_item-controls_actions-play'
            @click.prevent="onPlaySong"
          >
            <img
              v-if="!isSongPlaying"
              class='svg-white'
              :src='playSVG'
              width='30'
              height='30'
            />
            <img
              v-if="isSongPlaying"
              class='svg-white pause'
              :src='pauseSVG'
              width='19'
              height='19'
            />
          </button>
          <button
            tabindex="-1"
            class='song-list_item-controls_actions-more'
            @click.prevent="showOptions = !showOptions">
            <img
              class='svg-white'
              :src='moreSVG'
              width='30'
              height='30'
            />
            <div
              v-if='showOptions'
              class='song-list_item-controls_actions-more--options'
            >
              <button
                class='song-list_item-controls_actions-more--option'
                :data-id='song.docID'
                @click.prevent.stop='copySongUrl'
              >
                {{ isLinkCopied ? $t('views.browse.linkCopied') :  $t('views.browse.copyLink') }}
                <img
                  class='svg-white'
                  :src='linkSVG'
                  width='16'
                  height='16'
                />
              </button>
            </div>
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
import {
  ref,
  toRef,
  computed,
} from 'vue';
import { useStore } from 'vuex';

import { copyToClipboard } from '@/includes/helper';

import playSVG from '@/assets/svg/play.svg';
import pauseSVG from '@/assets/svg/pause.svg';
import moreSVG from '@/assets/svg/more.svg';
import linkSVG from '@/assets/svg/link.svg';

export default {
  name: 'SongListItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const song = toRef(props, 'song');
    const showOptions = ref(false);
    const isLinkCopied = ref(false);

    const currentSong = computed(() => store.state.player.currentSong);
    const playing = computed(() => store.getters?.['player/playing']);
    const isSongPlaying = computed(() => playing.value
      && song.value?.url === currentSong.value?.url);

    const copySongUrl = (element) => {
      const songId = element.target.getAttribute('data-id');
      const url = `${window.location.origin}/song/${songId}`;
      copyToClipboard(url);

      isLinkCopied.value = true;
      setTimeout(() => {
        isLinkCopied.value = false;
        showOptions.value = false;
      }, 1400);
    };

    const onPlaySong = () => {
      const songItem = song.value;
      const songItemUrl = songItem?.url;
      const currentSongUrl = currentSong.value?.url;

      if (songItemUrl !== currentSongUrl) {
        store.dispatch('player/newSong', songItem);
      } else {
        store.dispatch('player/toggleAudio');
      }
    };

    return {
      isSongPlaying,
      showOptions,
      isLinkCopied,
      copySongUrl,
      onPlaySong,
      playSVG,
      pauseSVG,
      moreSVG,
      linkSVG,
    };
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
    border-radius: $item-radius + 2px;

    &:is(:hover, :focus, :focus-within) {
      & .song-list_item-controls {
        &_actions {
          background-color: rgba(51, 51, 51, .3);
          visibility: visible;
          transition: all .3s;
        }
      }
    }

    &:focus-visible {
      border: 0;
      outline: 0;
      box-shadow: 0 0 0 4px rgb(250 88 106 / 60%);
    }

    &_cover {
      object-fit: cover;
      transition: width 0.3s ease-in-out;
      border-radius: inherit;
      box-shadow: 0 4px 14px rgba(0, 0, 0, .1);
    }

    &_actions {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      visibility: hidden;
      color: white;

      &-play, &-more {
        all: unset;
        position: inherit;
        bottom: 10px;
        width: 30px;
        height: 30px;
        background-color: transparent;
        border-radius: 100%;
        backdrop-filter: blur(5px);
        background-color: rgba(#fff, .2);
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: rgb(214, 0, 23);
        }
      }

      &-play {
        left: 10px;

        img.pause {
          margin-top: .7px;
          margin-left: .7px;
        }
      }

      &-more {
        right: 10px;

        &--options {
          display: flex;
          flex-direction: column;
          position: absolute;
          right: 0;
          min-width: 140px;
          color: rgba(255, 255, 255, .85);
          backdrop-filter: blur(60px) saturate(210%);
          background-color: rgb(110, 110, 115);
          border: .5px solid rgba(0, 0, 0, .2);
          border-radius: $item-radius + 2px;
          box-shadow: inset 0 0 0 1px rgb(255 255 255 / 20%), 0 2px 10px rgb(0 0 0 / 8%);
          white-space: pre;
          font-size: 13px;
          font-weight: 400;
          overflow: hidden;
          padding: 1px;
        }

        &--option {
          all: unset;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 31px;
          text-align: left;
          padding: 0 8px;
          border-radius: inherit;

          &:hover {
            background-color: rgb(117, 117, 122);
          }
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
