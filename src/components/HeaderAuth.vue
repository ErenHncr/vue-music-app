<template>
  <header class="header">
    <BaseButton class="header__btn-signin" color="secondary">Sign In</BaseButton>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
  methods: {
    ...mapMutations(['toggleAuthModal']),
    signout() {
      this.$store.dispatch('signout');

      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
  },
  computed: {
    ...mapState({ userLoggedIn: (state) => state.auth.userLoggedIn }),
    currentLocale() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English';
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: end;
  flex-shrink: 0;
  width: 100%;
  max-width: 1680px;
  height: 55px;
  margin: 0 auto;
  padding-inline-end: 20px;
  z-index: 1;

  &__btn-signin {
    height: 28px;
    padding: 6px 12px;
    border-radius: 6px;
    letter-spacing: .004em;
  };
}
</style>
