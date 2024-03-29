import { Howl } from 'howler';
import { formatTime } from '@/includes/helper';

export default {
  namespaced: true,
  state: {
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    remaining: '00:00',
    playerProgress: 0,
    volume: 0.5,
  },
  mutations: {
    newSong: (state, payload) => {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition: (state) => {
      state.seek = formatTime(state.sound.seek());
      state.duration = formatTime(state.sound.duration());
      state.remaining = formatTime(state.sound.duration() - state.sound.seek());
      state.playerProgress = (state.sound.seek() / state.sound.duration()) * 100;
    },
    updateVolume: (state, payload) => {
      if (state?.sound?.volume) {
        state.sound.volume(payload);
      }
    },
  },
  actions: {
    async newSong({
      commit, state, dispatch,
    }, payload) {
      if (state.sound instanceof Howl) {
        state.sound.unload();
      }
      commit('newSong', payload);
      state.sound.volume(state.volume);
      state.sound.play();

      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({
      commit, state, dispatch,
    }) {
      commit('updatePosition');

      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) {
        return;
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect();

      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);
      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
};
