<template>
  <!-- <Header /> -->
  <div class="app-container">
    <Navigation />

  <main class="page-container">
    <Header />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>

    <!-- Player -->
    <!-- <Player /> -->

    <!-- Auth Modal -->
    <!-- <Auth /> -->
  </div>
</template>

<script>
import Header from '@/components/partials/Header.vue';

export default {
  name: 'App',
  components: { Header },
  created() {
    this.$store.dispatch('auth/init_login', null, { root: true });
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
