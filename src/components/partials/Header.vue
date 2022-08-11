<template>
  <header class='header'>
    <BaseButton
      class='header__btn-signin'
      color='secondary'
      @onClick='modal.login = true'
      >
      {{ $t('header.signin') }}
    </BaseButton>
  </header>
  <BaseModal :visible='modal.login' @onCancel='onCloseModal'>
    <div class='flex flex-col items-center -mt-20 lg:mt-auto pb-14'>
      <img
        class='modal-icon svg-gray mb-6'
        :src='logoSVG'
        width='55'
        height='55'
        alt='close icon'
      />
      <h1 class='modal-title mb-3.5 text-2xl font-semibold '>
        {{ $t("auth.signin.title") }}
      </h1>
      <p class='modal-subtitle mb-8'>{{ $t('auth.signin.subtitle') }}</p>
      <Login :pending='auth.pending' class='pt-4' @onSubmit='onLogin'>
        <BaseLoading v-show='auth.pending' class='flex justify-center mt-3' />
        <span v-show='!auth.pending && auth.error' class='text-red-500 mt-1.5'>
          {{ $t('auth.signin.error') }}
        </span>
      </Login>
    </div>
  </BaseModal>
  <!-- {{ auth.pending.toString() }}
  {{ auth.userLoggedIn.toString() }} -->
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import logoSVG from '@/assets/svg/logo.svg';
import Login from './Forms/Login.vue';

export default {
  name: 'Header',
  components: { Login },
  data() {
    return {
      modal: {
        login: false,
        register: false,
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
    onCloseModal() {
      this.authReset();
      this.modal.login = false;
    },
  },
  computed: {
    ...mapState({ auth: (state) => state.auth }),
    currentLocale() {
      return this.$i18n.t('locale');
    },
  },
  setup() {
    return { logoSVG };
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
