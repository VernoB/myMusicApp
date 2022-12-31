import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
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
    defineRule("confirmed", confirmed);
    defineRule("excluded", excluded);
  },
};
