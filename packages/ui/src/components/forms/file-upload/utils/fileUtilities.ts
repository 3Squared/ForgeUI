import { Mime } from "mime";

import standardTypes from "mime/types/standard.js";
import otherTypes from "mime/types/other.js";
const forgeMime = new Mime(standardTypes, otherTypes);
forgeMime.define({ "application/vnd.ms-outlook": ["pst"] });

export { forgeMime };

export function formatFileSize(bytes: number, si = true, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + " " + units[u];
}

export function trimFileName(fileName: string, characters: number) {
  const trimFileName = fileName.substring(0, characters);
  const ext = fileExtension(fileName);
  return trimFileName + "..." + ext;
}

export function fileExtension(filename: string) {
  return filename.split(".").pop();
}

export type FileType = "Image" | "Other";
const imageTypes = ["gif", "png", "jpg", "jpeg"];
export function getFileType(fileName: string) {
  let fileType: FileType;
  const ext = fileExtension(fileName) as string;
  if (imageTypes.includes(ext)) {
    fileType = "Image";
  } else {
    fileType = "Other";
  }
  return fileType;
}

const iconFilesTypes = ["mp4", "wmv", "m4v", "mov", "mp3", "wav", "wma", "xls", "xlsx", "xps", "doc", "pdf", "docx"];
export function getReplacementImage(fileName: string) {
  const ext = fileExtension(fileName) as string;
  const iconExists = iconFilesTypes.includes(ext);
  if (iconExists) {
    return "https://cdn.3sq.app/assets/products/general/images/files/" + ext + ".svg";
  } else {
    return "https://cdn.3sq.app/assets/products/general/images/files/unknown.svg";
  }
}
