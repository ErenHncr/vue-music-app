import { auth, usersCollection } from '@/includes/firebase';

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
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
    authStart: (state) => {
      state.pending = true;
      state.error = null;
    },
    authSuccess: (state) => {
      state.pending = false;
      state.userLoggedIn = true;
    },
    authFail: (state, error) => {
      state.pending = false;
      state.error = error;
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
        commit('authSuccess');
      } catch (error) {
        commit('authFail', error);
      }
    },
    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },
    async signout({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
    },
  },
};
