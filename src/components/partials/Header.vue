// split this components to sub components for easy to use
<template>
  <header class='header' :data-song='Boolean(currentSong?.url)'>
    <div class='header-wrapper'>
      <PlaybackControl />
      <div class="header-controls-container">
        <div v-if='currentSong?.uid' class='header__volume'>
          <img
            class='svg-white header__volume-icon'
            :src='volumeSVG'
            width='18'
            height='18'
          />
          <BaseRange
            type='range'
            name='volume-control'
            class="header__volume-control"
            :value='volume'
            @change.prevent='onUpdateVolume'
          />
        </div>
        <div class='header__auth'>
          <BaseButton
            v-if='!userLoggedIn'
            class='header__btn-signin'
            color='secondary'
            @onClick='openAuthModal'
            >
            {{ $t('header.signin') }}
          </BaseButton>
          <BaseDropdown
            v-if='userLoggedIn'
            :options='[
              {
                key: "manage",
                label: "Manage",
              },
              {
                key: "signout",
                label: "Sign Out",
              },
            ]'
            @onItemClick='onDropdownItemClick'
          >
            <img
              class='svg-red-800'
              :src='avatarSVG'
              width='24'
              height='24'
            />
          </BaseDropdown>
        </div>
      </div>
    </div>
  </header>
  <!-- Auth Modals -->
  <BaseModal :visible='auth.modal.container' @onCancel='closeAuthModal'>
    <div class='flex flex-col items-center -mt-20 lg:mt-auto pb-14'>
      <Login v-if="auth.modal.login" :pending='auth.pending' class='pt-4' @onSubmit='onLogin'>
        <BaseLoading v-show='auth.pending' class='flex justify-center mt-3' />
        <span v-show='!auth.pending && auth.error' class='text-red-500 mt-1.5'>
          {{ $t('auth.signin.error') }}
        </span>
      </Login>
      <Register v-if="auth.modal.register" :pending='auth.pending' @onSubmit='onRegister'>
        <span v-show='!auth.pending && auth.error' class='text-red-500 mt-1.5'>
          {{ $t(`auth.register.errors.${auth?.error?.code ?? 'default'}`) }}
        </span>
      </Register>
      <ForgotPassword
        v-if="auth.modal.forgotPassword"
        :pending='auth.pending'
        :success='auth.user.resetPassword'
        @onSubmit='onForgotPassword'
        @onClose='closeAuthModal'
      >
        <span
          v-show='!auth.pending && auth.error && !auth.user.resetPassword'
          class='text-red-500 mt-1.5'
        >
          {{ $t(`auth.forgotPassword.errors.${auth?.error?.code ?? 'default'}`) }}
        </span>
      </ForgotPassword>
      <BaseButton
        v-if='auth.modal.login'
        class='header__btn-register'
        color='link'
        @onClick='updateAuthModal("register")'
        >
        {{ $t('auth.register.submit') }}
      </BaseButton>
      <BaseButton
        v-if='auth.modal.login'
        class='header__btn-forgot'
        color='link'
        @onClick='() => updateAuthModal("forgotPassword")'
        >
        {{ $t('auth.forgotPassword.button') }}
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';

import Login from '@/components/partials/Forms/Login.vue';
import Register from '@/components/partials/Forms/Register.vue';
import ForgotPassword from '@/components/partials/Forms/ForgotPassword.vue';
import { PlaybackControl } from '@/components/partials/Playback';
import volumeSVG from '@/assets/svg/volume.svg';
import avatarSVG from '@/assets/svg/avatar.svg';

export default {
  name: 'Header',
  components: {
    Login,
    Register,
    ForgotPassword,
    PlaybackControl,
  },
  data() {
    return {
      volumeSVG,
      avatarSVG,
      showOptions: false,
    };
  },
  methods: {
    ...mapMutations('auth', ['openAuthModal', 'closeAuthModal', 'updateAuthModal']),
    ...mapMutations('player', ['updateVolume']),
    onDropdownItemClick(key) {
      if (key === 'manage') {
        this.$router.push({ name: key });
      }
      if (key === 'signout') {
        this.signout();
      }
    },
    signout() {
      this.$store.dispatch('auth/signout');
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'listen-now' });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
    async onLogin(values) {
      this.$store.dispatch('auth/login', values, { root: true });
    },
    async onRegister(values) {
      this.$store.dispatch('auth/register', values, { root: true });
    },
    async onForgotPassword(values) {
      const { email } = values;
      this.$store.dispatch('auth/forgotPassword', email, { root: true });
    },
    onUpdateVolume(e) {
      const { target: { value } } = e;
      this.updateVolume(value);
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
      userLoggedIn: (state) => state.auth.userLoggedIn,
      currentSong: (state) => state.player.currentSong,
      volume: (state) => state.player.volume,
    }),
    currentLocale() {
      return this.$i18n.t('locale');
    },
  },
  watch: {
    userLoggedIn(newValue) {
      if (newValue) {
        this.closeAuthModal();
        this.$router.push({ name: 'browse' });
      } else {
        this.$router.push({ name: 'listen-now' });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.header {
  z-index: 9;

  &[data-song='true'] {
    width: calc(100vw - 260px);
    position: fixed;
    top: 0;
    background-color: rgba(45, 45, 45, .88);
    backdrop-filter: saturate(50%) blur(20px);
    box-shadow: 0 1px 0rgba(0,0,0,.05),
      0 1px 3px rgba(#000, .1),
      inset 0 -0.5px 0 rgba(#fff, .1);
  }

  &[data-song='false'] {
    .header__auth {
      margin-left: auto;
     }
  }

  &-wrapper {
    width: 100%;
    max-width: 1680px;
    height: 55px;
    display: grid;
    grid-template-columns: calc(30% - 22px) minmax(40%,900px) calc(30% + 22px);
    grid-template-rows: 55px;
    align-items: center;
    margin: 0 auto;
    z-index: 1;
  }

  &-controls-container {
    display: flex;
    align-items: center;
    grid-column-start: 3;
  }

  &__auth {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-end: 20px;
  }

  &__volume {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 0 10px;
    margin: 0 auto;

    &-control {
      width: 70px;
    }

    &-icon {
      opacity: 0.4;
      padding: 2px;
    }
  }

  &__btn {
    &-signin {
      height: 28px;
      padding: 6px 12px;
      border-radius: 6px;
      margin-left: auto;
      font-weight: 500;
      letter-spacing: 0.4px;
    }

    &-register {
      font-size: .93rem !important;
      margin-top: 4rem;
    }

    &-forgot {
      font-size: .93rem !important;
    }
  }
}
.modal {
  &-title, &-subtitle {
    color: #f5f5f7;
  }

  &-subtitle {
    font-size: 17px;
  }
}
</style>
