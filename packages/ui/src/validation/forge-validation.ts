import { required, email, alpha, length, max_value, min_value } from "vee-validate/dist/rules";
import { latlongValidator, decimalPlaceValidator, telephoneNumberValidator, urlValidator } from "./validators";
import { extend, ValidationProvider } from "vee-validate";
import { ValidationRule } from "vee-validate/dist/types/types";

function useForgeValidation(): (name: string, schema: ValidationRule) => void {
  extend("required", {
    ...required,
    message: "This field is required"
  });
  extend("email", {
    ...email,
    message: "Email is not formatted correctly"
  });
  extend("telephone", {
    validate: telephoneNumberValidator,
    message: "Must be a valid UK phone number"
  });
  extend("alpha", {
    ...alpha,
    message: "Only alphabetical characters allowed"
  });
  extend("length", {
    ...length,
    message: "Must be {length} characters long"
  });
  extend("2decimalPlaces", {
    validate: decimalPlaceValidator,
    message: "{_field_} must be a positive number to 2 decimal places"
  });
  extend("latlong", {
    validate: latlongValidator,
    message: "Lat / Long must be formatted as 2 decimal numbers eg. 1.23 , 45.6789"
  });
  extend("max_value", {
    ...max_value,
    message: "Must be no more than: {max}",
    params: ["max"]
  });
  extend("min_value", {
    ...min_value,
    message: "Must be no less than: {min}",
    params: ["min"]
  });
  extend("url", {
    validate: urlValidator,
    message: "{_field_} must be a valid URL"
  });

  return extend;
}

export { useForgeValidation, ValidationProvider };
