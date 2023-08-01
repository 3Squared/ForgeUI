<template>
  <div>
    <div class="d-flex justify-content-between">
      <slot name="message"></slot>
      <div>
        <input
          id="file-input"
          ref="fileUpload"
          :accept="acceptedFileTypes"
          :disabled="disableUpload"
          class="d-none"
          style="left: 0"
          type="file"
          v-bind="customAttributes"
          @input="onFileChange"
        />
        <label :class="{ disabled: disableUpload }" class="w-100 btn btn-primary" for="file-input">
          {{ placeholder }}
        </label>
      </div>
    </div>
    <div
      :class="dragInput ? 'drag-border' : ''"
      class="mt-3 file-container forge-table border-dashed"
      @dragleave="dragleave"
      @dragover="dragover"
      @drop.prevent="drop"
      @dragover.prevent
    >
      <table class="table table-striped mb-0 table-bordered">
        <tbody v-if="files.length <= 0">
          <template>
            <div :class="dragInput ? 'drag-input' : ''" class="no-files-text-box d-flex align-items-center">
              <div>Drag and drop files here</div>
              <div class="p-1">
                <b-icon-upload font-scale="1.25" />
              </div>
            </div>
          </template>
        </tbody>
        <tbody v-else>
          <template v-for="file in files">
            <file-info
              :key="file.file.name"
              :accepted-file-types="acceptedFileTypes"
              :auto-upload-to-blob="autoUploadToBlob"
              :duplicate-warning="file.duplicateWarning"
              :editable-file-name="editableFileName"
              :file="file.file"
              :get-file-url-action="getFileUrlAction"
              :max-file-size="maxFileSize"
              :validate-file-name="validateFileName"
              @deleted="deleteFile(file.file)"
              @uploaded="
                file.status = 'Uploaded';
                file.blobFileName = $event;
              "
              @edit-file-name="file.customFileName = $event"
              @upload-failed="file.status = 'Failed'"
            ></file-info>
          </template>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-end">
      <div>Max file size: {{ formatFileSize(maxFileSize) }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType, VueConstructor } from "vue";
import { BIconUpload } from "bootstrap-vue";
import FileInfo from "./components/FileInfo.vue";
import { formatFileSize } from "./utils/fileUtilities";
import { ForgeFileStatus } from "../../../helpers/types";
import { ValidationResult } from "../../../helpers";

/**
 * @displayName File Upload
 **/
export const ForgeFileUpload = /*#__PURE__*/ (
  Vue as VueConstructor<
    Vue & {
      $refs: {
        fileUpload: { value: FileList[] };
      };
    }
  >
).extend({
  name: "ForgeFileUpload",
  components: {
    BIconUpload,
    FileInfo
  },
  props: {
    placeholder: {
      type: String,
      default: () => "Browse your computer"
    },
    getFileUrlAction: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(fileName: string) => Promise<[string, string]>>,
      required: true
    },
    validateFileName: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(fileName: string) => Promise<ValidationResult>>,
      required: false
    },
    autoUploadToBlob: {
      type: Boolean,
      default: true
    },
    acceptedFileTypes: {
      type: String,
      required: true
    },
    maxFileSize: {
      type: Number,
      required: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    maxFileInput: {
      type: Number,
      default: null
    },
    editableFileName: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: [] as ForgeFileStatus[],
      dragInput: false
    };
  },
  computed: {
    customAttributes(): "" | { multiple: boolean } {
      if (this.multiple) {
        return { multiple: true };
      } else {
        return "";
      }
    },
    disableUpload(): boolean {
      return this.maxNoOfFileInput != null && this.maxNoOfFileInput <= this.files.length;
    },
    maxNoOfFileInput(): number {
      if (!this.multiple) {
        return 1;
      } else {
        return this.maxFileInput;
      }
    }
  },
  watch: {
    files() {
      this.$emit("input", this.files);
    }
  },
  methods: {
    formatFileSize,
    addFiles(files: File[]) {
      const checkFiles = this.files.flatMap((a) => a.file);
      this.files.forEach((b) => (b.duplicateWarning = false));
      [...files].forEach((f) => {
        const doesFileExist = checkFiles.findIndex((a) => a.name === f.name);
        if (doesFileExist === -1) {
          this.files.unshift({
            file: f,
            status: "NotUploaded",
            blobFileName: null,
            duplicateWarning: false,
            customFileName: null
          });
        } else {
          this.files[doesFileExist].duplicateWarning = true;
        }
      });
      //if a file is uploaded then deleted, this will allow them to add it again
      this.$refs.fileUpload.value = [];
    },
    onFileChange(e: any) {
      let files: File[] = [...e.target.files];
      this.addFiles(files);
    },
    deleteFile(fileInfo: File) {
      this.files = this.files.filter((f) => f.file != fileInfo);
    },
    drop(e: any) {
      this.dragInput = false;
      const files: File[] = e.dataTransfer.files;
      if ((files.length > this.maxNoOfFileInput && this.maxNoOfFileInput != null) || this.disableUpload) {
        e.preventDefault;
      } else {
        this.addFiles(files);
      }
    },
    dragover(event: Event) {
      event.preventDefault();
      this.dragInput = true;
    },
    dragleave(event: Event) {
      event.preventDefault();
      this.dragInput = false;
    }
  }
});

export default ForgeFileUpload;
</script>
