import Vue from 'vue';
import { AbortController } from '@azure/abort-controller';
import { FileType, formatFileSize, getFileType, trimFileName, getReplacementImage } from '../utils/fileUtilities';
declare type State = 'Not Uploaded' | 'Preparing' | 'Uploading' | 'Uploaded' | 'Failed' | 'Aborted' | 'Invalid';
declare type TransferProgressEvent = {
    loadedBytes: number;
};
export declare const FileInfo: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    state: State;
    fileUploadFailed: string | null;
    bytesUploaded: number;
    originalName: string | null;
    uploadUrl: string | null;
    previewUrl: string | null;
    controller: AbortController;
    deleteFileFailed: string | null;
}, {
    formatFileSize: typeof formatFileSize;
    trimFileName: typeof trimFileName;
    getFileType: typeof getFileType;
    getReplacementImage: typeof getReplacementImage;
    preview(): string;
    uploadBlob(): Promise<void>;
    onFileUploadProgress(progress: TransferProgressEvent): void;
    deleteFromBlob(): Promise<void>;
    previewImage(): void;
    cancel(): void;
}, {
    validFileType: boolean;
    validFileSize: boolean;
    fileType: FileType;
}, {
    file: File;
    getFileUrlAction: (fileName: string) => Promise<[string, string]>;
    autoUploadToBlob: boolean;
    maxFileSize: number;
    acceptedFileTypes: string;
    duplicateWarning: boolean;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default FileInfo;
//# sourceMappingURL=FileInfo.vue.d.ts.map