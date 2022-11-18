import o from "dayjs";
const e = {
  fromNative: (t) => t ? t.toISOString() : null,
  toNative: (t) => t ? new Date(t) : null
}, r = {
  fromNative: (t) => t,
  toNative: (t) => t
}, i = {
  fromNative: (t) => t && o(t),
  toNative: (t) => t && t.toDate()
};
export {
  i as dayjsNormalizer,
  r as nativeNormalizer,
  e as stringNormalizer
};
