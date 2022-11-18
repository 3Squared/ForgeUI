import Vue from 'vue';
import { formatFileSize } from "./utils/fileUtilities";
import { ForgeFileStatus } from "../../../helpers/types";
/**
 * @displayName File Upload
 **/
export declare const ForgeFileUpload: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>> & {
    $refs: {
        fileUpload: {
            value: FileList[];
        };
    };
}, {
    files: ForgeFileStatus[];
    dragInput: boolean;
}, {
    formatFileSize: typeof formatFileSize;
    addFiles(files: File[]): void;
    onFileChange(e: any): void;
    deleteFile(fileInfo: File): void;
    drop(e: any): void;
    dragover(event: Event): void;
    dragleave(event: Event): void;
}, {
    customAttributes: "" | {
        multiple: boolean;
    };
    disableUpload: boolean;
    maxNoOfFileInput: number;
}, {
    placeholder: string;
    getFileUrlAction: (fileName: string) => Promise<[string, string]>;
    autoUploadToBlob: boolean;
    acceptedFileTypes: string;
    maxFileSize: number;
    multiple: boolean;
    maxFileInput: number;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeFileUpload;
