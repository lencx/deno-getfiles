/**
 * @author: lencx
 * @create_at: Jun 16, 2020
 */

export interface GetFilesOptions {
  // root directory
  root: string;
  include?: string[];
  exclude?: string[]; // subpath
  ignore?: string[];
  // type?: 'file' | 'dir'; // default: file
  hasInfo?: boolean;
}

export interface FindFileOptions {
  path: string;
  collect: any[];
  exclude?: string[];
  ignore?: string[];
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
  // current working directory
  cwd: string;
  filename: string;
  info: FileInfoDetail;
}
