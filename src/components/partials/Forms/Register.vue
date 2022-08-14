<template>
  <div class='relative w-full'>
    <img
      class='svg-gray opacity-60 absolute -top-9 lg:-top-16 right-0 m-0'
      :src='logoSVG'
      width='25'
      height='25'
      alt='logo icon'
    />
  </div>
  <h1 class='modal-title mb-5 text-3xl font-semibold '>
    {{ $t("auth.register.title") }}
  </h1>
  <VeeForm
    v-slot='{ meta: { valid } }'
    class='form-register'
    :validation-schema='validationSchema'
    @submit='onSubmit'
  >
    <div class='input-row'>
      <BaseInput
        tabindex='1'
        :disabled='pending'
        name='firstName'
        type='text'
        :placeholder='$t("auth.firstName")'
        v-model='firstName'
      />
      <VeeErrorMessage
        class='text-red-500 text-xs mt-2'
        name='firstName'
      />
    </div>
    <div class='input-row'>
      <BaseInput
        tabindex='2'
        :disabled='pending'
        name='lastName'
        type='text'
        :placeholder='$t("auth.lastName")'
        v-model='lastName'
      />
      <VeeErrorMessage
        class='text-red-500 text-xs mt-2'
        name='lastName'
      />
    </div>
    <div class='input-row'>
      <BaseInput
        tabindex='3'
        :disabled='pending'
        name='email'
        type='email'
        :placeholder='$t("auth.email")'
        v-model='email'
      />
      <VeeErrorMessage
        class='text-red-500 text-xs mt-2'
        name='email'
      />
    </div>
    <div class='input-row'>
      <BaseInput
        tabindex='4'
        :disabled='pending'
        name='password'
        type='password'
        :placeholder='$t("auth.password")'
        v-model='password'
      />
      <VeeErrorMessage
        class='text-red-500 text-xs mt-1'
        name='password'
      />
    </div>
    <!-- added for using submit event with enter key -->
    <BaseButton
      tabindex='5'
      :disabled='pending || !valid'
      type='submit'
      color='secondary'
      class='submit-btn'
    >
      <BaseLoading v-show='pending' class='loading' />
      {{ $t('auth.register.button') }}
    </BaseButton>
    <slot></slot>
  </VeeForm>
</template>

<script>
import logoSVG from '@/assets/svg/logo.svg';

export default {
  name: 'Register',
  props: {
    pending: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onSubmit'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      validationSchema: {
        firstName: 'required|min:3|max:32',
        lastName: 'required|min:3|max:32',
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
.form-register {
  max-width: min(330px, 100%);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .75rem;

  & > .input-row {
    height: 62px;
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
