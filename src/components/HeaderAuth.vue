<template>
  <header class='header'>
    <BaseButton
      class='header__btn-signin'
      color='secondary'
      @onClick='toggleAuthModal'
      >{{ $t('header.signin') }}</BaseButton
    >
  </header>
  <BaseModal :visible='authModalShow' @onCancel='onCancel'>
    <div class='flex flex-col items-center'>
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
      <p class='modal-subtitle mb-16'>{{ $t("auth.signin.subtitle") }}</p>
      <BaseInput type='email' :placeholder='$t("auth.email")' />
      <BaseInput type='password' :placeholder='$t("auth.password")' />
    </div>
  </BaseModal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import logoSVG from '@/assets/svg/logo.svg';

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
    onCancel() {
      this.toggleAuthModal();
      console.log('hello cancel');
    },
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
      authModalShow: (state) => state.auth.authModalShow,
    }),
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
