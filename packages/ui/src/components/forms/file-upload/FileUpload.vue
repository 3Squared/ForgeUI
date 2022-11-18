<template>
  <div>
    <div class="d-flex justify-content-between">
      <slot name="message"></slot>
      <div class="position-relative">
        <label for="file-input" class="w-100">
          <b-button block :disabled="disableUpload" variant="primary">{{ placeholder }}</b-button>
        </label>
        <input
            type="file"
            @input="onFileChange"
            id="file-input"
            class="custom-file-input position-absolute"
            style="left: 0"
            ref="fileUpload"
            v-bind="customAttributes"
            :accept="acceptedFileTypes"
            :class="disableUpload ? 'd-none' : ''"
        >
      </div>
    </div>
    <div class="mt-3 file-container forge-table border-dashed"
         @drop.prevent="drop"
         @dragover.prevent
         @dragover="dragover"
         @dragleave="dragleave"
         :class="dragInput ? 'drag-border' : ''"
    >
      <table class="table table-striped mb-0 table-bordered">
        <tbody v-if="files.length <= 0">
        <template>
          <div class="no-files-text-box d-flex align-items-center" :class="dragInput ? 'drag-input' : ''">
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
              :get-file-url-action="getFileUrlAction"
              :file="file.file"
              @deleted="deleteFile(file.file)"
              :auto-upload-to-blob="autoUploadToBlob"
              :max-file-size="maxFileSize"
              :accepted-file-types="acceptedFileTypes"
              @uploaded="file.status = 'Uploaded'; file.blobFileName = $event"
              @upload-failed="file.status = 'Failed'"
              :duplicate-warning="file.duplicateWarning"
          >
          </file-info>
        </template>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-end">
      <div>
        Max file size: {{ formatFileSize(maxFileSize) }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType, VueConstructor } from 'vue';
import {
  BButton,
  BIconUpload
} from "bootstrap-vue";
import FileInfo from './components/FileInfo.vue.js';
import { formatFileSize } from "./utils/fileUtilities";
import { ForgeFileStatus } from "../../../helpers/types";

/**
 * @displayName File Upload
 **/
export const ForgeFileUpload = /*#__PURE__*/ (Vue as VueConstructor<Vue & {
  $refs: {
    fileUpload: { value: FileList[] };
  };
}>).extend({
  name: 'ForgeFileUpload',
  components: {
    BButton,
    BIconUpload,
    FileInfo
  },
  props: {
    placeholder: {
      type: String,
      default: () => 'Browse your computer'
    },
    getFileUrlAction: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(fileName: string) => Promise<[string, string]>>,
      required: true
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
        return { multiple: true }
      } else {
        return ''
      }
    },
    disableUpload(): boolean {
      if (this.maxNoOfFileInput != null && (this.maxNoOfFileInput <= this.files.length)) {
        return true;
      } else {
        return false;
      }
    },
    maxNoOfFileInput(): number {
      if (!this.multiple) {
        return 1;
      } else {
        return this.maxFileInput;
      }
    }
  },
  methods: {
    formatFileSize,
    addFiles(files: File[]) {
      const checkFiles = this.files.flatMap(a => a.file)
      this.files.forEach(b => b.duplicateWarning = false); 
      [...files].forEach(f => {
        const doesFileExist = checkFiles.findIndex(a => a.name === f.name);
        if (doesFileExist === -1) {
          this.files.unshift({ file: f, status: 'NotUploaded', blobFileName: null, duplicateWarning: false })
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
      this.files = this.files.filter(f => f.file != fileInfo);
    },
    drop(e: any) {
      this.dragInput = false;
      const files: File[] = e.dataTransfer.files;
      if ((files.length > this.maxNoOfFileInput && this.maxNoOfFileInput != null) || this.disableUpload) {
        e.preventDefault;
      } else {
        this.addFiles(files)
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
  },
  watch: {
    files() {
      this.$emit('input', this.files);
    },
  }
});

export default ForgeFileUpload;
</script>