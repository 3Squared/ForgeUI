<template>
  <tr class="file-upload-table">
    <td class="w-75 border-left-0">
      <div>
        <b-row class="align-items-center ml-0">
          <b-col cols="1" class="d-flex justify-content-center">
            <div v-if="fileType === 'Image'">
              <b-img v-b-popover.hover.html.viewport="preview" class="img-thumbnail" :src="previewUrl"
                     :alt="trimFileName(file.name, 20)" thumbnail />
            </div>
            <div v-else>
              <b-img v-b-tooltip.hover.viewport="file.name" class="file-thumbnail" :src="getReplacementImage(file.name)"
                     :alt="file.name" />
            </div>
          </b-col>
          <b-col cols="4">
            <div v-if="editableFileName">
              <forge-inline-editor :value="customFileName" @input="setFileName" :is-valid="checkCustomFileName">
              </forge-inline-editor>
            </div>
            <div v-else>
              <div v-if="file.name.length < 50">{{ file.name }}</div>
              <div v-if="file.name.length >= 50" v-b-tooltip.hover.viewport="file.name">
                {{ trimFileName(file.name, 50) }}
              </div>
            </div>
          </b-col>
          <b-col cols="7">
            <div v-if="state === 'Uploading'">
              <b-progress :max="file.size" class="mt-2">
                <b-progress-bar
                    :value="bytesUploaded"
                    :striped="true"
                    :animated="true"
                    :label="`${((bytesUploaded / file.size) * 100).toFixed(0)}%`"
                ></b-progress-bar>
              </b-progress>
            </div>
            <div v-if="state === 'Failed' || state === 'Invalid'">
              <b-alert variant="danger" :show="true" class="mb-0 m-1">{{ fileUploadFailed }}</b-alert>
            </div>
            <div v-if="state === 'Aborted'">
              <b-alert variant="warning" :show="true" class="mb-0 m-1">{{ fileUploadFailed }}</b-alert>
            </div>
            <div v-if="state === 'Uploaded' && deleteFileFailed != null">
              <b-alert variant="warning" :show="true" class="mb-0 m-1">{{ deleteFileFailed }}</b-alert>
            </div>
            <div v-if="duplicateWarning">
              <b-alert variant="danger" :show="true" class="mb-0 m-1">
                Upload failed: This file has either just been uploaded, or has the same name as another file you have
                just uploaded
              </b-alert>
            </div>
          </b-col>
        </b-row>
      </div>
    </td>
    <td class="text-center">
      <div v-if="state === 'Uploaded'">
        <b-button v-b-popover.hover.html.viewport="preview" variant="link">
          <b-icon-search />
        </b-button>
      </div>
      <div v-else-if="state === 'Not Uploaded'">
        <b-button variant="link" @click="uploadBlob">
          <b-icon-upload />
        </b-button>
      </div>
      <div v-else-if="state === 'Failed' || state === 'Aborted'">
        <b-button variant="link" @click="uploadBlob">
          <b-icon-arrow-clockwise />
        </b-button>
      </div>
    </td>
    <td class="text-center">
      <div>
        {{ formatFileSize(file.size) }}
      </div>
    </td>
    <td class="text-center border-right-0">
      <b-button v-if="state === 'Uploading'" variant="link" @click="cancel">
        <b-icon-x-circle-fill />
      </b-button>
      <b-button v-else variant="link" @click="deleteFromBlob">
        <b-icon-trash />
      </b-button>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import {
  BRow,
  BCol,
  BImg,
  BProgress,
  BProgressBar,
  BAlert,
  BButton,
  BIconSearch,
  BIconUpload,
  BIconXCircleFill,
  BIconTrash,
  VBPopover,
  BIconArrowClockwise,
  VBTooltip
} from "bootstrap-vue";
import { BlockBlobClient, BlockBlobParallelUploadOptions } from "@azure/storage-blob";
import { AbortController } from "@azure/abort-controller";
import {
  FileType,
  formatFileSize,
  getFileType,
  trimFileName,
  getReplacementImage
} from "../utils/fileUtilities";
import { ForgeInlineEditor, ValidationResult } from "../../../../../index";

type State = "Not Uploaded" | "Preparing" | "Uploading" | "Uploaded" | "Failed" | "Aborted" | "Invalid";

// This is not exported in @azure/storage-blob
type TransferProgressEvent = { loadedBytes: number };

export const FileInfo = /*#__PURE__*/ Vue.extend({
  name: "FileInfo",
  components: {
    BRow,
    BCol,
    BImg,
    BProgress,
    BProgressBar,
    BAlert,
    BButton,
    BIconSearch,
    BIconUpload,
    BIconXCircleFill,
    BIconTrash,
    BIconArrowClockwise,
    ForgeInlineEditor
  },
  directives: {
    "b-popover": VBPopover,
    "b-tooltip": VBTooltip
  },
  props: {
    file: {
      type: File,
      required: true
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
    maxFileSize: {
      type: Number,
      required: true
    },
    acceptedFileTypes: {
      type: String,
      required: true
    },
    duplicateWarning: {
      type: Boolean,
      default: false
    },
    editableFileName: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: "Not Uploaded" as State,
      fileUploadFailed: null as string | null,
      bytesUploaded: 0,
      originalName: null as string | null,
      uploadUrl: null as string | null,
      previewUrl: null as string | null,
      controller: new AbortController(),
      deleteFileFailed: null as string | null,
      customFileName: null as string | null
    };
  },
  computed: {
    validFileType(): boolean {
      if (this.file.type === "") {
        return false;
      }
      return this.acceptedFileTypes.includes(this.file.type);
    },
    validFileSize(): boolean {
      return this.file.size <= this.maxFileSize;
    },
    fileType(): FileType {
      return getFileType(this.file.name);
    },
  },
  mounted() {
    this.previewImage();
  },
  created() {
    if (this.autoUploadToBlob) {
      this.uploadBlob();
    }
    this.customFileName = this.file.name;
  },
  methods: {
    formatFileSize,
    trimFileName,
    getFileType,
    getReplacementImage,
    preview() {
      return `<img src="${this.previewUrl}" alt="${this.file.name}" style="max-width: 45vw;  max-height: 45vh;" />`;
    },
    setFileName(value: string) {
      this.customFileName = value;
      this.$emit('edit-file-name', this.customFileName)
    },
    async uploadBlob() {
      this.state = "Preparing";
      if (!this.validFileType) {
        this.fileUploadFailed = "Upload failed: file type is not accepted";
        this.state = "Invalid";
      } else if (!this.validFileSize) {
        this.fileUploadFailed = "Upload failed: file size exceeds the " + formatFileSize(this.maxFileSize) + " limit";
        this.state = "Invalid";
      } else if (this.validFileType && this.validFileSize) {
        this.controller = new AbortController();
        const [uploadUrl, blobFileName] = await this.getFileUrlAction(this.file.name);
        if (!uploadUrl) {
          this.fileUploadFailed = "Upload failed: connection error, please try again";
          this.state = "Failed";
          return;
        }
        this.bytesUploaded = 0;

        try {
          this.state = "Uploading";
          const blockBlobClient = new BlockBlobClient(uploadUrl);
          const options = {
            abortSignal: this.controller.signal,
            onProgress: this.onFileUploadProgress,
            tags: { temp: "true" }
          } as BlockBlobParallelUploadOptions;

          // Upload directly to Azure Blob Storage
          await blockBlobClient.uploadData(this.file, options);
          this.originalName = this.file.name;
          this.uploadUrl = uploadUrl;

          this.state = "Uploaded";
          this.$emit("uploaded", blobFileName);

          this.fileUploadFailed = null;
        } catch (ex: Error | any) {
          if (ex.name === "AbortError") {
            this.state = "Aborted";
            this.fileUploadFailed = "Upload failed: user cancelled";
          } else {
            this.state = "Failed";
            this.fileUploadFailed = "Upload failed: connection error, please try again";
          }
          this.$emit("upload-failed");
        }
      }
    },
    onFileUploadProgress(progress: TransferProgressEvent) {
      this.bytesUploaded = progress.loadedBytes;
    },
    async deleteFromBlob() {
      if (this.state === "Uploaded") {
        if (this.uploadUrl != null) {
          try {
            const blockBlobClient = new BlockBlobClient(this.uploadUrl);
            await blockBlobClient.delete();
            this.$emit("deleted");
          } catch (ex) {
            if (ex === "BlobNotFound") {
              this.$emit("deleted");
            }
            this.deleteFileFailed = "Failed to delete: connection error, please try again";
          }
        }
      } else {
        this.$emit("deleted");
      }
    },
    previewImage() {
      this.previewUrl = URL.createObjectURL(this.file);
    },
    cancel() {
      this.controller.abort();
    },
    checkCustomFileName(value: string) {
      if (value.length == 0) {
        return { errors: ['Enter name'], valid: false } as ValidationResult;
      }

      if (value.length > 501) {
        return { errors: ['File name over 100 characters'], valid: false } as ValidationResult;
      }

      return { errors: [], valid: true } as ValidationResult;
    }
  }
});

export default FileInfo;
</script>
