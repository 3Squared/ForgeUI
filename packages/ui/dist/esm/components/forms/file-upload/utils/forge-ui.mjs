function u(e, t = !0, n = 1) {
  const s = t ? 1e3 : 1024;
  if (Math.abs(e) < s)
    return e + " B";
  const r = t ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let i = -1;
  const c = 10 ** n;
  do
    e /= s, ++i;
  while (Math.round(Math.abs(e) * c) / c >= s && i < r.length - 1);
  return e.toFixed(n) + " " + r[i];
}
function a(e, t) {
  const n = e.substring(0, t), s = o(e);
  return n + "..." + s;
}
function o(e) {
  return e.split(".").pop();
}
const p = ["gif", "png", "jpg", "jpeg"];
function g(e) {
  let t;
  const n = o(e);
  return p.includes(n) ? t = "Image" : t = "Other", t;
}
const l = ["mp4", "wmv", "m4v", "mov", "mp3", "wav", "wma", "xls", "xlsx", "xps", "doc", "pdf", "docx"];
function B(e) {
  const t = o(e);
  return l.includes(t) ? "https://cdn.3sq.app/assets/products/general/images/files/" + t + ".svg" : "https://cdn.3sq.app/assets/products/general/images/files/unknown.svg";
}
export {
  o as fileExtension,
  u as formatFileSize,
  g as getFileType,
  B as getReplacementImage,
  a as trimFileName
};
