/**
 * @author: lencx
 * @create_at: Jun 14, 2020
 */

import { GetFilesArgs, FileInfo } from './types.ts';

const isStr = (opts: any): boolean => typeof opts === 'string';

// exists directory or file
export const exists = async (filename: string) => {
  try {
    await Deno.stat(filename);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * findFile
 * @param path - file path
 * @param collect - collect files found
 * @param exclude - exclude directory
 * @param ignore - ignore file extension or file
 */
export const findFile = (path: string, collect: FileInfo[], exclude: string[] = [], ignore: string[] = []) => {
  const rs = Deno.readDirSync(path);
  if (/\/$/.test(path)) path = path.slice(0, -1);
  for (const item of rs) {
    if (exclude.includes(item.name)) return;
    if (item.isDirectory) {
      findFile(`${path}/${item.name}`, collect, [], ignore)
    } else {
      let _path = `${path}/${item.name}`;
      if (/^\.\//.test(_path)) _path = _path.slice(2);

      // ignore extension or file
      let flag = false;
      if (ignore.length > 0) {
        ignore.forEach(i => {
          const reg = i.replace('*.', "\\/\*\\.");
          const _path2 = /^\.\//.test(reg) ? reg.slice(2) : reg;
          if (new RegExp(`${reg}$`).test(item.name) || _path2 === _path) flag = true;
        })
      }
      !flag && collect.push({
        path: _path,
        filename: item.name,
        isFile: item.isFile,
        isDirectory: item.isDirectory,
        isSymlink: item.isSymlink,
      })
    }
  }
}

export const getFiles = <T extends (string | GetFilesArgs)>(opts: T): FileInfo[] => {
  const files: FileInfo[] = [];

  if (isStr(opts)) {
    findFile((opts as string), files)
  } else {
    const { dir, include = [], exclude = [], ignore = [] } = (opts as GetFilesArgs);

    // all files
    if (include.length > 0 && exclude.length > 0) {
      findFile(dir, files)
    }

    // inclued directory
    if (include.length > 0) {
      include.map((path: string) => findFile(path, files, [], ignore))
    }

    // exclude directory
    // ignore extension or file
    if (include.length === 0 && (exclude.length > 0 || ignore.length > 0)) {
      findFile(dir, files, exclude, ignore)
    }
  }
  return files;
}

export default getFiles;