<template>
  <img
    class='svg-gray mx-auto mb-6'
    :src='logoSVG'
    width='55'
    height='55'
    alt='logo icon'
  />
  <h1 class='modal-title mb-3.5 text-2xl font-semibold '>
    {{ $t("auth.signin.title") }}
  </h1>
  <p class='modal-subtitle mb-8'>{{ $t('auth.signin.subtitle') }}</p>
  <VeeForm
    v-slot='{ errors, meta: { touched } }'
    class='form-login'
    :validation-schema='validationSchema'
    @submit='onSubmit'
  >
    <BaseInput
      tabindex='1'
      ref='emailInput'
      :disabled='pending'
      name='email'
      type='email'
      :class='{
        "login-email": true,
        valid: !errors?.email && touched
      }'
      :placeholder='$t("auth.email")'
      v-model='email'
    />
    <BaseInput
      tabindex='2'
      v-if='!errors?.email && touched'
      :disabled='pending'
      name='password'
      type='password'
      :placeholder='$t("auth.password")'
      v-model='password'
    />
    <VeeErrorMessage
      class='text-red-500 mt-1.5'
      name='email'
    />
    <!-- added for using submit event with enter key -->
    <button
      v-show='false'
      type="submit"
    >
      Submit
    </button>
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
      password: '',
      validationSchema: {
        email: 'required|email',
        password: 'required|min:6|max:32',
      },
    };
  },
  methods: {
    onSubmit(values) {
      this.$emit('onSubmit', values);
    },
  },
  setup() {
    return { logoSVG };
  },
};
</script>

<style lang="scss" scoped>
.form-login {
  max-width: min(330px, 100%);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;

  & > input {
    &[type="email"] {
      border: 1px solid rgba(214, 214, 214, 0.4);

      &.valid {
        border-radius: 6px 6px 0 0;
      }
    }

    &[type="password"] {
      border-radius: 0 0 6px 6px;
      border: 1px solid rgba(214, 214, 214, 0.4);
      border-top: none;
    }
  }
}
</style>
