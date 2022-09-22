<template>
  <header class='header' :data-song='Boolean(currentSong?.url)'>
    <PlaybackControl v-if='!userLoggedIn' />
    <div class='header__auth'>
      <BaseButton
        v-if='userLoggedIn'
        class='header__btn-signin'
        color='secondary'
        @onClick='openAuthModal'
        >
        {{ $t('header.signin') }}
      </BaseButton>
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

export default {
  name: 'Header',
  components: {
    Login,
    Register,
    ForgotPassword,
    PlaybackControl,
  },
  methods: {
    ...mapMutations('auth', ['openAuthModal', 'closeAuthModal', 'updateAuthModal']),
    signout() {
      this.$store.dispatch('signout');
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
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
      userLoggedIn: (state) => state.auth.userLoggedIn,
      currentSong: (state) => state.player.currentSong,
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
  height: 55px;
  display: grid;
  grid-template-columns: calc(30% - 22px) minmax(40%,900px) calc(30% + 22px);
  grid-template-rows: 55px;
  align-items: center;
  margin: 0 auto;
  z-index: 1;

  &[data-song='true'] {
    width: -webkit-fill-available;
    position: fixed;
    top: 0;
    background-color: rgba(45, 45, 45, .88);
    backdrop-filter: saturate(50%) blur(20px);
    box-shadow: 0 1px 0rgba(0,0,0,.05),
      0 1px 3px rgba(#000, .1),
      inset 0 -0.5px 0 rgba(#fff, .1);
  }

  &[data-song='false'] {
    width: 100%;
    max-width: 1680px;
    padding-inline-end: 20px;
  }

  &__auth {
    margin-left: auto;
    grid-column-start: 3;
  }

  &__btn-signin {
    height: 28px;
    padding: 6px 12px;
    border-radius: 6px;
    margin-left: auto;
    font-weight: 500;
    letter-spacing: 0.4px;
  }

  &__btn-register {
    font-size: .93rem !important;
    margin-top: 4rem;
  }

  &__btn-forgot {
    font-size: .93rem !important;
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
