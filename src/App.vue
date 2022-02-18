<template>
  <AppHeader />

  <router-view />

  <!-- Player -->
  <AppPlayer />

  <!-- Auth Modal -->
  <AuthModal />
</template>

<script>
import AppPlayer from '@/components/Player.vue';
import AppHeader from '@/components/Header.vue';
import AuthModal from '@/components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>

<style lang="scss">
// This comment line required for importing scss files
</style>
