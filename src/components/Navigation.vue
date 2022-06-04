<template>
  <nav class="navigation">
    <div class="navigation-header">
      <router-link class="navigation-header-link" :to="{ name: 'listen-now' }">
        <img
          class="navigation-header-link-logo svg-white"
          :src="brandSVG"
          width="83"
          height="20"
          alt="icon"
        />
      </router-link>
    </div>
    <ul class="navigation-list">
      <li
        v-for="item in listItems"
        :key="item.label"
        class="navigation-list-item"
      >
        <router-link
          class="navigation-list-item-link"
          exact-active-class="navigation-list-item-link__active"
          :to="{ name: item.routeName }"
        >
          <img
            class="navigation-list-item-link-icon svg-red"
            :src="item.icon"
            width="24"
            height="24"
            alt="icon"
          />
          <span class="navigation-list-item-link-label">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import brandSVG from '@/assets/svg/brand.svg';
import listenSVG from '@/assets/svg/listen.svg';
import browseSVG from '@/assets/svg/browse.svg';

export default {
  name: 'Navigation',
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
  setup() {
    const listItems = [
      {
        label: 'Listen Now',
        icon: listenSVG,
        routeName: 'listen-now',
      },
      {
        label: 'Browse',
        icon: browseSVG,
        routeName: 'browse',
      },
    ];

    return { listItems, brandSVG };
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  max-width: $nav-width;
  min-width: $nav-width;
  height:100%;
  background-color: $nav-bg-color;
  position:relative;
  padding: 0px 25px 0 25px;
  border-inline-end-color: $nav-border-rule;
  border-inline-end-style: solid;
  border-inline-end-width: 1px;

  &-header {
    width: 100%;
    margin: 17px 0 18px 0;

    &-link {
      &-logo {
        margin-left: 5px;
      }
    }
  }

  &-list {
    &-item {
      font-size: $nav-list-item-font-size;
      line-height: $nav-list-item-line-height;
      color: $nav-list-item-color;
      height: 32px;

      &:not(:last-of-type) {
        margin-bottom: 2px;
      }

      &-link {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 3px;
        border-radius: 6px;
        font-weight: 400;

        &__active {
          background-color: $nav-list-item-link__active-bg-color;
          font-weight: 500;
        }

        &:hover {
          color: $nav-list-item-color;
        }

        &-label {
          line-height: 1.46667;
        }
      }
    }
  }
}

</style>
