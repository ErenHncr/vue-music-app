import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min, max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('VeeErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('passwords_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `${ctx.field} is required.`,
          min: `${ctx.field} is too short.`,
          max: `${ctx.field} is too long.`,
          alpha_spaces: `'${ctx.field} may only contain
            alphabetical characters and spaces.`,
          email: `${ctx.field} must be a valid email.`,
          min_value: `${ctx.field} is too low.`,
          max_value: `${ctx.field} is too high.`,
          excluded: `You are not allowed to use this value for
            '${ctx.field}.`,
          country_excluded: `Due to restrictions, we do not accept
            users from this location.`,
          passwords_mismatch: "The passwords don't match.",
          tos: 'You must accept the Terms of Service.',
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
