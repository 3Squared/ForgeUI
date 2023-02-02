function latlongValidator(value: string) {
  return /^-?\d{0,2}(.\d\d{0,5}\s*)?\s*,\s*-?\d{0,2}(.\d\d{0,5}\s*)?$/.test(value);
}

function decimalPlaceValidator(value: string) {
  return /^-?\d+(.\d\d?)?\s*$/.test(value);
}

function telephoneNumberValidator(value: string) {
  //takes all extra characters out
  const strippedValue = value.replace(/#|_|-|.|,|\+|\s|\(|\)/, "");
  //regex checks that all characters are numeric
  return /^[0-9]*$/.test(strippedValue);
}

function urlValidator(value: string) {
  return /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(value);
}

export { latlongValidator, decimalPlaceValidator, telephoneNumberValidator, urlValidator };
