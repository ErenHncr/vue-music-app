<template>
  <AppHeader />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

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
.fade-enter {
  &-from {
    opacity: 0;
  }
  &-active {
    transition: all 0.5s linear;
  }
  &-leave-to {
    transition: all 0.5s linear;
    opacity: 0;
  }
}
</style>
