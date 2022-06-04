<template>
  <!-- <Header /> -->
  <div class="app-container">
    <Navigation />

  <main class="page-container">
    <HeaderAuth />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>

    <!-- Player -->
    <Player />

    <!-- Auth Modal -->
    <AuthModal />
  </div>
</template>

<script>

export default {
  name: 'App',
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
