function r(t) {
  return /^-?\d{0,2}(.\d\d{0,5}\s*)?\s*,\s*-?\d{0,2}(.\d\d{0,5}\s*)?$/.test(t);
}
function a(t) {
  return /^-?\d+(.\d\d?)?\s*$/.test(t);
}
function d(t) {
  const e = t.replace(/#|_|-|.|,|\+|\s|\(|\)/, "");
  return /^[0-9]*$/.test(e);
}
function n(t) {
  return /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(t);
}
export {
  a as decimalPlaceValidator,
  r as latlongValidator,
  d as telephoneNumberValidator,
  n as urlValidator
};
