import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      const {
        name, email, password, age, country,
      } = payload;

      const { user } = await auth
        .createUserWithEmailAndPassword(email, password);

      await usersCollection.doc(user.uid).set({
        name, email, age, country,
      });

      await user.updateProfile({ displayName: name });

      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      const { email, password } = payload;

      await auth.signInWithEmailAndPassword(email, password);

      commit('toggleAuth');
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
  getters: {},
});
// authModalShow: (state) => state.authModalShow,
