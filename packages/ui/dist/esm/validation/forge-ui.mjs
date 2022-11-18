import { required as a, email as l, alpha as t, length as m, max_value as i, min_value as s } from "vee-validate/dist/rules";
import { telephoneNumberValidator as r, decimalPlaceValidator as o, latlongValidator as n, urlValidator as d } from "./forge-ui2.mjs";
import { extend as e } from "vee-validate";
import { ValidationProvider as v } from "vee-validate";
function p() {
  return e("required", {
    ...a,
    message: "This field is required"
  }), e("email", {
    ...l,
    message: "Email is not formatted correctly"
  }), e("telephone", {
    validate: r,
    message: "Must be a valid UK phone number"
  }), e("alpha", {
    ...t,
    message: "Only alphabetical characters allowed"
  }), e("length", {
    ...m,
    message: "Must be {length} characters long"
  }), e("2decimalPlaces", {
    validate: o,
    message: "{_field_} must be a positive number to 2 decimal places"
  }), e("latlong", {
    validate: n,
    message: "Lat / Long must be formatted as 2 decimal numbers eg. 1.23 , 45.6789"
  }), e("max_value", {
    ...i,
    message: "Must be no more than: {max}",
    params: ["max"]
  }), e("min_value", {
    ...s,
    message: "Must be no less than: {min}",
    params: ["min"]
  }), e("url", {
    validate: d,
    message: "{_field_} must be a valid URL"
  }), e;
}
export {
  v as ValidationProvider,
  p as useForgeValidation
};
