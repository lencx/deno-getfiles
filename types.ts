export interface FileInfo {
  path: string;
  filename: string;
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
}

export interface GetFilesArgs {
  dir: string;
  include?: string[];
  exclude?: string[];
  ignore?: string[];
}
