/**
 * @author: lencx
 * @create_at: Jun 14, 2020
 */

export interface GetFilesOptions {
  // root directory
  root: string;
  include?: string[];
  exclude?: string[];
  ignore?: string[];
  // default: false
  hasInfo?: boolean;
}

export interface FindFileOptions {
  path: string;
  collect: any[];
  exclude?: string[];
  ignore?: string[];
  hasInfo?: boolean;
  isFirst?: boolean;
}

export interface FileInfoDetail {
  // true if this is info for a regular file
  isFile: boolean;
  // true if this is info for a regular directory
  isDirectory: boolean;
  // true if this is info for a symlink
  isSymlink: boolean;
  // the size of the file, in bytes
  size: number;
  // format file size
  fmtSzie: string;
  // the last modification time of the file
  mtime: Date | null;
  // the last access time of the file
  atime: Date | null;
  // the creation time of the file
  birthtime: Date | null;
}

export interface FileInfo {
  path: string;
  // file name
  name: string;
  // file extension
  ext: string;
  // current working directory
  realPath: string;
  // file info
  info?: FileInfoDetail;
}
