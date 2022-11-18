import { ForgeFileUpload as i } from "./forge-ui2.mjs";
import { ForgeFileUpload as v } from "./forge-ui2.mjs";
import s from "../../../_virtual/forge-ui.mjs";
var o = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", [t("div", { staticClass: "d-flex justify-content-between" }, [e._t("message"), t("div", { staticClass: "position-relative" }, [t("label", { staticClass: "w-100", attrs: { for: "file-input" } }, [t("b-button", { attrs: { block: "", disabled: e.disableUpload, variant: "primary" } }, [e._v(e._s(e.placeholder))])], 1), t("input", e._b({ ref: "fileUpload", staticClass: "custom-file-input position-absolute", class: e.disableUpload ? "d-none" : "", staticStyle: { left: "0" }, attrs: { type: "file", id: "file-input", accept: e.acceptedFileTypes }, on: { input: e.onFileChange } }, "input", e.customAttributes, !1))])], 2), t("div", { staticClass: "mt-3 file-container forge-table border-dashed", class: e.dragInput ? "drag-border" : "", on: { drop: function(a) {
    return a.preventDefault(), e.drop.apply(null, arguments);
  }, dragover: [function(a) {
    a.preventDefault();
  }, e.dragover], dragleave: e.dragleave } }, [t("table", { staticClass: "table table-striped mb-0 table-bordered" }, [e.files.length <= 0 ? t("tbody", [[t("div", { staticClass: "no-files-text-box d-flex align-items-center", class: e.dragInput ? "drag-input" : "" }, [t("div", [e._v("Drag and drop files here")]), t("div", { staticClass: "p-1" }, [t("b-icon-upload", { attrs: { "font-scale": "1.25" } })], 1)])]], 2) : t("tbody", [e._l(e.files, function(a) {
    return [t("file-info", { key: a.file.name, attrs: { "get-file-url-action": e.getFileUrlAction, file: a.file, "auto-upload-to-blob": e.autoUploadToBlob, "max-file-size": e.maxFileSize, "accepted-file-types": e.acceptedFileTypes, "duplicate-warning": a.duplicateWarning }, on: { deleted: function(l) {
      return e.deleteFile(a.file);
    }, uploaded: function(l) {
      a.status = "Uploaded", a.blobFileName = l;
    }, "upload-failed": function(l) {
      a.status = "Failed";
    } } })];
  })], 2)])]), t("div", { staticClass: "d-flex justify-content-end" }, [t("div", [e._v(" Max file size: " + e._s(e.formatFileSize(e.maxFileSize)) + " ")])])]);
}, n = [], r = /* @__PURE__ */ s(
  i,
  o,
  n,
  !1,
  null,
  null,
  null,
  null
);
const u = r.exports;
export {
  v as ForgeFileUpload,
  u as default
};
