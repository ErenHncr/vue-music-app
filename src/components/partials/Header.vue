<template>
  <header class='header'>
    <BaseButton
      class='header__btn-signin'
      color='secondary'
      @onClick='modal.container = true'
      >
      {{ $t('header.signin') }}
    </BaseButton>
  </header>
  <BaseModal :visible='modal.container' @onCancel='onCloseModal'>
    <div class='flex flex-col items-center -mt-20 lg:mt-auto pb-14'>
      <Login v-if="modal.login" :pending='auth.pending' class='pt-4' @onSubmit='onLogin'>
        <BaseLoading v-show='auth.pending' class='flex justify-center mt-3' />
        <span v-show='!auth.pending && auth.error' class='text-red-500 mt-1.5'>
          {{ $t('auth.signin.error') }}
        </span>
      </Login>
      <div v-if="modal.register">Signup</div>
      <div v-if="modal.forgot">Forgot password</div>
      <BaseButton
        v-if='modal.login'
        class='header__btn-signup'
        color='link'
        @onClick='onChangeModal("register")'
        >
        {{ $t('auth.signup.button') }}
      </BaseButton>
      <BaseButton
        v-if='modal.login'
        class='header__btn-forgot'
        color='link'
        @onClick='() => onChangeModal("forgot")'
        >
        {{ $t('auth.forgotPassword.button') }}
      </BaseButton>
    </div>
  </BaseModal>
  {{ auth.userLoggedIn.toString() }}
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Login from './Forms/Login.vue';

export default {
  name: 'Header',
  components: { Login },
  data() {
    return {
      modal: {
        container: false,
        login: true,
        register: false,
        forgot: false,
      },
    };
  },
  methods: {
    ...mapMutations('auth', ['authReset']),
    signout() {
      this.$store.dispatch('signout');
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
    async onLogin(values) {
      this.$store.dispatch('auth/login', values, { root: true });
    },
    onChangeModal(name) {
      Object.keys(this.modal)
        .filter((key) => key !== 'container')
        .forEach((key) => {
          this.modal[key] = key === name;
        });
    },
    onCloseModal() {
      this.authReset();
      Object.keys(this.modal)
        .forEach((key) => {
          this.modal[key] = key === 'login';
        });
    },
  },
  computed: {
    ...mapState({ auth: (state) => state.auth }),
    currentLocale() {
      return this.$i18n.t('locale');
    },
  },
  watch: {
    auth: {
      handler(newValue) {
        if (newValue.userLoggedIn) {
          this.modal.login = false;
          this.$router.push({ name: 'browse' });
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang='scss' scoped>
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
    letter-spacing: 0.004em;
  }

  &__btn-signup {
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
