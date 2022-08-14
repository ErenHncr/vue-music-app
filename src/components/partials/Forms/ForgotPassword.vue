<template>
  <img
    class='svg-gray mx-auto mb-6'
    :src='logoSVG'
    width='55'
    height='55'
    alt='logo icon'
  />
  <h1 class='modal-title mb-3.5 text-2xl font-semibold '>
    {{ $t("auth.forgotPassword.title") }}
  </h1>
  <p class='modal-subtitle mb-4'>{{ $t('auth.forgotPassword.subtitle') }}</p>
  <VeeForm
    v-slot='{ meta: { valid } }'
    class='form-forgot_password'
    :validation-schema='validationSchema'
    @submit='onSubmit'
  >
    <div class='input-row'>
      <BaseInput
        tabindex='1'
        :disabled='pending'
        name='email'
        type='email'
        :placeholder='$t("auth.email")'
        v-model='email'
      />
      <VeeErrorMessage
        class='text-red-500 text-xs mt-1'
        name='email'
      />
    </div>
    <BaseButton
      tabindex='2'
      :disabled='pending || !valid'
      type='submit'
      color='secondary'
      class='submit-btn'
    >
      <BaseLoading v-show='pending' class='loading' />
      <span v-show='!pending'>
        {{ $t('auth.forgotPassword.submit') }}
      </span>
    </BaseButton>
    <slot></slot>
  </VeeForm>
</template>

<script>
import logoSVG from '@/assets/svg/logo.svg';

export default {
  name: 'Login',
  props: {
    pending: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onSubmit'],
  data() {
    return {
      email: '',
      validationSchema: { email: 'required|email' },
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      this.$emit('onSubmit', values);
    },
  },
  setup() {
    return { logoSVG };
  },
};
</script>

<style lang="scss" scoped>
.form-forgot_password{
  max-width: min(330px, 100%);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .5rem;

  & > .input-row {
    height: 60px;
    display: flex;
    flex-direction: column;
  }

  .submit-btn {
    height: 36px;
    padding: 0;
    font-size: 16px;
    font-weight: 400;
    .loading {
      transform: scale(.8);
    }
  }
}
</style>
