import { auth, usersCollection } from '@/includes/firebase';
import { diffTime } from '@/includes/helper';

export default {
  namespaced: true,
  state: {
    pending: false,
    error: null,
    userLoggedIn: false,
    modal: {
      container: false,
      login: true,
      register: false,
      forgotPassword: false,
    },
    user: {
      email: null,
      resetPassword: false,
    },
  },
  getters: {},
  mutations: {
    openAuthModal: (state) => {
      state.modal.container = !state.modal.container;
    },
    updateAuthModal(state, modalName = 'login') {
      Object.keys(state.modal)
        .filter((key) => key !== 'container')
        .forEach((key) => {
          state.modal[key] = key === modalName;
        });
    },
    closeAuthModal(state) {
      state.pending = false;
      state.error = null;
      Object.keys(state.modal)
        .forEach((key) => {
          state.modal[key] = key === 'login';
        });
    },
    toggleAuth: (state, payload) => {
      state.userLoggedIn = !state.userLoggedIn;
      state.user.email = payload;
    },
    authStart: (state) => {
      state.pending = true;
      state.error = null;
    },
    authSuccess: (state, payload) => {
      state.pending = false;
      state.userLoggedIn = true;
      state.user.email = payload;
    },
    authFail: (state, error) => {
      state.pending = false;
      state.error = error;
    },
    forgotPasswordSuccess: (state, payload) => {
      state.pending = false;
      state.user = {
        email: payload,
        resetPassword: true,
      };
    },
  },
  actions: {
    async register({ commit }, payload) {
      const {
        firstName, lastName, email, password,
      } = payload;

      commit('authStart');
      try {
        const { user } = await auth
          .createUserWithEmailAndPassword(email, password);

        await usersCollection.doc(user.uid).set({
          firstName, lastName, email, createdAt: new Date().toISOString(),
        });

        await user.updateProfile({ displayName: `${firstName} ${lastName}` });
        commit('authSuccess');
        commit('closeAuthModal');
      } catch (error) {
        commit('authFail', error);
      }
    },
    async login({ commit }, payload) {
      const { email, password } = payload;
      commit('authStart');
      try {
        await auth.signInWithEmailAndPassword(email, password);
        commit('authSuccess', email);
      } catch (error) {
        commit('authFail', error);
      }
    },
    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth', user?.email);
      }
    },
    async signout({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
    },
    async forgotPassword({ commit }, payload) {
      commit('authStart');
      try {
        const lastAttemptDate = localStorage.getItem('reset_password_date');
        const { minutes: diffMinutes } = diffTime(lastAttemptDate, new Date());

        if (diffMinutes > 45) {
          await auth.sendPasswordResetEmail(payload);
          localStorage.setItem('reset_password_date', new Date().toISOString());
          commit('forgotPasswordSuccess', payload);
          return;
        }
        commit('authFail', { code: 'auth/too-many-requests' });
      } catch (error) {
        commit('authFail', error);
      }
    },
  },
};
