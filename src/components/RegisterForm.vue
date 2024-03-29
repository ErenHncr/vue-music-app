<template>
  <!-- Registration Form -->
  <div
    v-if="reg_show_alert"
    class="text-white text-center font-bold p-5 mb-4"
    :class="reg_alert_variant">
    {{ reg_alert_msg }}
  </div>
  <VeeForm
    :validation-schema="schema"
    :initial-values="userData"
    @submit="$emit('register', {
      values: $event,
      onRegisterInSubmission,
      onRegisterSuccess,
      onRegisterError,
    })">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name" />
      <VeeErrorMessage
        class="text-red-600"
        name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <VeeErrorMessage
        class="text-red-600"
        name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded" />
      <VeeErrorMessage
        class="text-red-600"
        name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        v-slot="{ field, errors }"
        name="password"
        :bails="false">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border
          border-gray-300 transition duration-500 focus:outline-none
          focus:border-black rounded"
          placeholder="Password"
          v-bind="field">
        <div
          v-for="error in errors"
          :key="error"
          class="text-red-600">
          {{ error }}
        </div>
      </VeeField>
      <!-- <VeeErrorMessage class="text-red-600" name="password" /> -->
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password" />
      <VeeErrorMessage
        class="text-red-600"
        name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
        <option value="USA">
          USA
        </option>
        <option value="Mexico">
          Mexico
        </option>
        <option value="Germany">
          Germany
        </option>
        <option value="Antarctica">
          Antarctica
        </option>
      </VeeField>
      <VeeErrorMessage
        class="text-red-600"
        name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
      <i18n-t
        keypath="register.accept"
        tag="label"
        class="inline-block"
      >
        <a href="#">{{ $t('register.TOS')}}</a>
        Accept terms of service
      </i18n-t>
      <VeeErrorMessage
        class="block text-red-600"
        name="tos" />
    </div>
    <button
      :disabled="reg_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
      Submit
    </button>
  </VeeForm>
</template>

<script>
export default {
  name: 'RegisterForm',
  emits: ['register'],
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:3|max:32',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },
      userData: { country: 'USA' },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    onRegisterInSubmission() {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';
    },
    onRegisterSuccess() {
      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account has been created.';
    },
    onRegisterError() {
      this.reg_in_submission = false;
      this.reg_alert_variant = 'bg-red-500';
      this.reg_alert_msg = 'An unexpected error occured. Please try again later.';
    },
  },
};
</script>
