import r from "vue";
import { BButton as s, BIconUpload as u } from "bootstrap-vue";
import n from "./components/forge-ui.mjs";
import { formatFileSize as o } from "./utils/forge-ui.mjs";
const m = /* @__PURE__ */ r.extend({
  name: "ForgeFileUpload",
  components: {
    BButton: s,
    BIconUpload: u,
    FileInfo: n
  },
  props: {
    placeholder: {
      type: String,
      default: () => "Browse your computer"
    },
    getFileUrlAction: {
      type: Function,
      required: !0
    },
    autoUploadToBlob: {
      type: Boolean,
      default: !0
    },
    acceptedFileTypes: {
      type: String,
      required: !0
    },
    maxFileSize: {
      type: Number,
      required: !0
    },
    multiple: {
      type: Boolean,
      default: !0
    },
    maxFileInput: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      files: [],
      dragInput: !1
    };
  },
  computed: {
    customAttributes() {
      return this.multiple ? { multiple: !0 } : "";
    },
    disableUpload() {
      return this.maxNoOfFileInput != null && this.maxNoOfFileInput <= this.files.length;
    },
    maxNoOfFileInput() {
      return this.multiple ? this.maxFileInput : 1;
    }
  },
  methods: {
    formatFileSize: o,
    addFiles(e) {
      const t = this.files.flatMap((l) => l.file);
      this.files.forEach((l) => l.duplicateWarning = !1), [...e].forEach((l) => {
        const i = t.findIndex((a) => a.name === l.name);
        i === -1 ? this.files.unshift({ file: l, status: "NotUploaded", blobFileName: null, duplicateWarning: !1 }) : this.files[i].duplicateWarning = !0;
      }), this.$refs.fileUpload.value = [];
    },
    onFileChange(e) {
      let t = [...e.target.files];
      this.addFiles(t);
    },
    deleteFile(e) {
      this.files = this.files.filter((t) => t.file != e);
    },
    drop(e) {
      this.dragInput = !1;
      const t = e.dataTransfer.files;
      t.length > this.maxNoOfFileInput && this.maxNoOfFileInput != null || this.disableUpload ? e.preventDefault : this.addFiles(t);
    },
    dragover(e) {
      e.preventDefault(), this.dragInput = !0;
    },
    dragleave(e) {
      e.preventDefault(), this.dragInput = !1;
    }
  },
  watch: {
    files() {
      this.$emit("input", this.files);
    }
  }
});
export {
  m as ForgeFileUpload,
  m as default
};
