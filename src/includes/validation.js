import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";

import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  alpha,
  alpha_num as alphaNum,
  numeric,
  min_value as minValue,
  max_value as maxValue,
  alpha_dash as alphaDash,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeField", VeeField);
    app.component("VeeForm", VeeForm);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos_required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("alpha", alpha);
    defineRule("alpha_num", alphaNum);
    defineRule("numeric", numeric);
    defineRule("min_value", minValue);
    defineRule("max_value", maxValue);
    defineRule("alpha_dash", alphaDash);
    defineRule("password_mismatch", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);
    defineRule("not_one_of", excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          email: `The field ${ctx.field}  need to be an email address `,
          alpha_spaces: `The field ${ctx.field} may contain only alphabetic characters or spaces`,
          numeric: `The field ${ctx.field} is an number`,
          min_value: `The field ${ctx.field} must be a numeric value and must not be less than 18`,
          max_value: `The field ${ctx.field} must be a numeric value and must not be greater than 100`,
          alpha_dash: `The field ${ctx.field}  may contain alpha-numeric characters as well as dashes and underscores`,
          password_mismatch: `The field ${ctx.field} must match the password `,
          not_one_of: `The field ${ctx.field} must not be one of the inserted value`,
          excluded: `You are not allow to use this value for the field ${ctx.field}`,
          country_excluded: `Due to restrictions, we do not accept users from this location.`,
          tos_required: `You want to accept the term of service`,
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
