<template>
  <div
    v-if="login_show_alert"
    class="text-white text-center font-bold p-4 mb-4"
    :class="login_alert_variant">
    {{ login_alert_msg }}
  </div>
  <VeeForm
    :validation-schema="loginSchema"
    @submit="$emit('login', {
      values: $event,
      onLoginInSubmission,
      onLoginSuccess,
      onLoginError,
    })">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <VeeErrorMessage
        class="text-red-600"
        name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password" />
      <VeeErrorMessage
        class="text-red-600"
        name="password" />
    </div>
    <button
      :disabled="login_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
      Submit
    </button>
  </VeeForm>
</template>

<script>
export default {
  name: 'LoginForm',
  emits: ['login'],
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:32',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait! We are logging you in.',
    };
  },
  methods: {
    onLoginInSubmission() {
      this.login_show_alert = true;
      this.login_in_submission = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_msg = 'Please wait! We are logging you in.';
    },
    onLoginSuccess() {
      this.login_alert_variant = 'bg-green-500';
      this.login_alert_msg = 'Success! You are logged in.';
    },
    onLoginError() {
      this.login_in_submission = false;
      this.login_alert_variant = 'bg-red-500';
      this.login_alert_msg = 'Invalid login details.';
    },
  },
};
</script>
