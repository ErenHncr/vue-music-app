import { auth, usersCollection } from '@/includes/firebase';

export default {
  namespaced: true,
  state: {
    pending: false,
    error: null,
    authModalShow: false,
    userLoggedIn: false,
  },
  getters: {},
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
    authStart: (state) => {
      state.pending = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.pending = false;
      state.userLoggedIn = true;
    },
    authFail: (state, error) => {
      state.pending = false;
      state.error = error;
    },
    authReset: (state) => {
      state.pending = false;
      state.error = null;
    },
  },
  actions: {
    async register({ commit }, payload) {
      const {
        firstName, lastName, email, password,
      } = payload;

      const { user } = await auth
        .createUserWithEmailAndPassword(email, password);

      await usersCollection.doc(user.uid).set({
        firstName, lastName, email,
      });

      await user.updateProfile({ displayName: `${firstName} ${lastName}` });

      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      const { email, password } = payload;
      commit('authStart');
      try {
        await auth.signInWithEmailAndPassword(email, password);
        commit('loginSuccess');
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
