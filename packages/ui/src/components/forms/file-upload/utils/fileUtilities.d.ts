export declare function formatFileSize(bytes: number, si?: boolean, dp?: number): string;
export declare function trimFileName(fileName: string, characters: number): string;
export declare function fileExtension(filename: string): string | undefined;
export declare type FileType = 'Image' | 'Other';
export declare function getFileType(fileName: string): FileType;
export declare function getReplacementImage(fileName: string): string;
//# sourceMappingURL=fileUtilities.d.ts.map