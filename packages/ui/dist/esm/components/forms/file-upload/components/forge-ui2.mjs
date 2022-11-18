import d from "vue";
import { BRow as n, BCol as p, BImg as h, BProgress as c, BProgressBar as f, BAlert as u, BButton as m, BIconSearch as F, BIconUpload as U, BIconXCircleFill as B, BIconTrash as y, BPopover as b, BIconArrowClockwise as g, BTooltip as v, VBPopover as w, VBTooltip as I } from "bootstrap-vue";
import { BlockBlobClient as l } from "@azure/storage-blob";
import { AbortController as t } from "@azure/abort-controller";
import { getFileType as o, formatFileSize as a, trimFileName as T, getReplacementImage as x } from "../utils/forge-ui.mjs";
const N = /* @__PURE__ */ d.extend({
  name: "FileInfo",
  components: {
    BRow: n,
    BCol: p,
    BImg: h,
    BProgress: c,
    BProgressBar: f,
    BAlert: u,
    BButton: m,
    BIconSearch: F,
    BIconUpload: U,
    BIconXCircleFill: B,
    BIconTrash: y,
    BPopover: b,
    BIconArrowClockwise: g,
    BTooltip: v
  },
  directives: {
    "b-popover": w,
    "b-tooltip": I
  },
  props: {
    file: {
      type: File,
      required: !0
    },
    getFileUrlAction: {
      type: Function,
      required: !0
    },
    autoUploadToBlob: {
      type: Boolean,
      default: !0
    },
    maxFileSize: {
      type: Number,
      required: !0
    },
    acceptedFileTypes: {
      type: String,
      required: !0
    },
    duplicateWarning: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      state: "Not Uploaded",
      fileUploadFailed: null,
      bytesUploaded: 0,
      originalName: null,
      uploadUrl: null,
      previewUrl: null,
      controller: new t(),
      deleteFileFailed: null
    };
  },
  computed: {
    validFileType() {
      return this.file.type === "" ? !1 : this.acceptedFileTypes.includes(this.file.type);
    },
    validFileSize() {
      return this.file.size <= this.maxFileSize;
    },
    fileType() {
      return o(this.file.name);
    }
  },
  methods: {
    formatFileSize: a,
    trimFileName: T,
    getFileType: o,
    getReplacementImage: x,
    preview() {
      return `<img src="${this.previewUrl}" alt="${this.file.name}" style="max-width: 45vw;  max-height: 45vh;" />`;
    },
    async uploadBlob() {
      if (this.state = "Preparing", !this.validFileType)
        this.fileUploadFailed = "Upload failed: file type is not accepted", this.state = "Invalid";
      else if (!this.validFileSize)
        this.fileUploadFailed = "Upload failed: file size exceeds the " + a(this.maxFileSize) + " limit", this.state = "Invalid";
      else if (this.validFileType && this.validFileSize) {
        this.controller = new t();
        const [e, r] = await this.getFileUrlAction(this.file.name);
        if (!e) {
          this.fileUploadFailed = "Upload failed: connection error, please try again", this.state = "Failed";
          return;
        }
        this.bytesUploaded = 0;
        try {
          this.state = "Uploading";
          const i = new l(e), s = {
            abortSignal: this.controller.signal,
            onProgress: this.onFileUploadProgress,
            tags: { temp: "true" }
          };
          await i.uploadData(this.file, s), this.originalName = this.file.name, this.uploadUrl = e, this.state = "Uploaded", this.$emit("uploaded", r), this.fileUploadFailed = null;
        } catch (i) {
          i.name === "AbortError" ? (this.state = "Aborted", this.fileUploadFailed = "Upload failed: user cancelled") : (this.state = "Failed", this.fileUploadFailed = "Upload failed: connection error, please try again"), this.$emit("upload-failed");
        }
      }
    },
    onFileUploadProgress(e) {
      this.bytesUploaded = e.loadedBytes;
    },
    async deleteFromBlob() {
      if (this.state === "Uploaded") {
        if (this.uploadUrl != null)
          try {
            await new l(this.uploadUrl).delete(), this.$emit("deleted");
          } catch (e) {
            e === "BlobNotFound" && this.$emit("deleted"), this.deleteFileFailed = "Failed to delete: connection error, please try again";
          }
      } else
        this.$emit("deleted");
    },
    previewImage() {
      this.previewUrl = URL.createObjectURL(this.file);
    },
    cancel() {
      this.controller.abort();
    }
  },
  mounted() {
    this.previewImage();
  },
  created() {
    this.autoUploadToBlob && this.uploadBlob();
  }
});
export {
  N as FileInfo,
  N as default
};
