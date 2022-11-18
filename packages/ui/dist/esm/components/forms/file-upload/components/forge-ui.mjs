import { FileInfo as a } from "./forge-ui2.mjs";
import { FileInfo as p } from "./forge-ui2.mjs";
import i from "../../../../_virtual/forge-ui.mjs";
var r = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("tr", { staticClass: "file-upload-table" }, [t("td", { staticClass: "w-75 border-left-0" }, [t("div", [t("b-row", { staticClass: "align-items-center ml-0" }, [t("b-col", { staticClass: "d-flex justify-content-center", attrs: { cols: "1" } }, [e.fileType === "Image" ? t("div", [t("b-img", { directives: [{ name: "b-popover", rawName: "v-b-popover.hover.html.viewport", value: e.preview, expression: "preview", modifiers: { hover: !0, html: !0, viewport: !0 } }], staticClass: "img-thumbnail", attrs: { src: e.previewUrl, alt: e.trimFileName(e.file.name, 20), thumbnail: "" } })], 1) : t("div", [t("b-img", { directives: [{ name: "b-tooltip", rawName: "v-b-tooltip.hover.viewport", value: e.file.name, expression: "file.name", modifiers: { hover: !0, viewport: !0 } }], staticClass: "file-thumbnail", attrs: { src: e.getReplacementImage(e.file.name), alt: e.file.name } })], 1)]), t("b-col", { attrs: { cols: "4" } }, [e.file.name.length < 50 ? t("div", [e._v(e._s(e.file.name))]) : e._e(), e.file.name.length >= 50 ? t("div", { directives: [{ name: "b-tooltip", rawName: "v-b-tooltip.hover.viewport", value: e.file.name, expression: "file.name", modifiers: { hover: !0, viewport: !0 } }] }, [e._v(" " + e._s(e.trimFileName(e.file.name, 50)) + " ")]) : e._e()]), t("b-col", { attrs: { cols: "7" } }, [e.state === "Uploading" ? t("div", [t("b-progress", { staticClass: "mt-2", attrs: { max: e.file.size } }, [t("b-progress-bar", { attrs: { value: e.bytesUploaded, striped: !0, animated: !0, label: `${(e.bytesUploaded / e.file.size * 100).toFixed(0)}%` } })], 1)], 1) : e._e(), e.state === "Failed" || e.state === "Invalid" ? t("div", [t("b-alert", { staticClass: "mb-0 m-1", attrs: { variant: "danger", show: !0 } }, [e._v(e._s(e.fileUploadFailed))])], 1) : e._e(), e.state === "Aborted" ? t("div", [t("b-alert", { staticClass: "mb-0 m-1", attrs: { variant: "warning", show: !0 } }, [e._v(" " + e._s(e.fileUploadFailed))])], 1) : e._e(), e.state === "Uploaded" && e.deleteFileFailed != null ? t("div", [t("b-alert", { staticClass: "mb-0 m-1", attrs: { variant: "warning", show: !0 } }, [e._v(" " + e._s(e.deleteFileFailed))])], 1) : e._e(), e.duplicateWarning ? t("div", [t("b-alert", { staticClass: "mb-0 m-1", attrs: { variant: "danger", show: !0 } }, [e._v(" Upload failed: This file has either just been uploaded, or has the same name as another file you have just uploaded ")])], 1) : e._e()])], 1)], 1)]), t("td", { staticClass: "text-center" }, [e.state === "Uploaded" ? t("div", [t("b-button", { directives: [{ name: "b-popover", rawName: "v-b-popover.hover.html.viewport", value: e.preview, expression: "preview", modifiers: { hover: !0, html: !0, viewport: !0 } }], attrs: { variant: "link" } }, [t("b-icon-search")], 1)], 1) : e.state === "Not Uploaded" ? t("div", [t("b-button", { attrs: { variant: "link" }, on: { click: e.uploadBlob } }, [t("b-icon-upload")], 1)], 1) : e.state === "Failed" || e.state === "Aborted" ? t("div", [t("b-button", { attrs: { variant: "link" }, on: { click: e.uploadBlob } }, [t("b-icon-arrow-clockwise")], 1)], 1) : e._e()]), t("td", { staticClass: "text-center" }, [t("div", [e._v(" " + e._s(e.formatFileSize(e.file.size)) + " ")])]), t("td", { staticClass: "text-center border-right-0" }, [e.state === "Uploading" ? t("b-button", { attrs: { variant: "link" }, on: { click: e.cancel } }, [t("b-icon-x-circle-fill")], 1) : t("b-button", { attrs: { variant: "link" }, on: { click: e.deleteFromBlob } }, [t("b-icon-trash")], 1)], 1)]);
}, l = [], s = /* @__PURE__ */ i(
  a,
  r,
  l,
  !1,
  null,
  null,
  null,
  null
);
const v = s.exports;
export {
  p as FileInfo,
  v as default
};
