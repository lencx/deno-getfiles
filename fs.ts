/**
 * @author: lencx
 * @create_at: Jun 17, 2020
 */

import { fmtFilesize } from './utils.ts';
import { GetFilesOptions, FindFileOptions, FileInfo } from './types.ts';

const isStr = (arg: any): boolean => typeof arg === 'string';
const encoder = new TextEncoder();

// exists directory or file
export const exists = async (filename: string): Promise<boolean> => {
  try {
    await Deno.stat(filename);
    return true;
  } catch (e) {
    return false;
  }
}

export const trimPath = (path: string): string => {
  // example: './a/b/' => './a/b'
  if (/\/$/.test(path)) path = path.slice(0, -1);
  // example: './a/b' => 'a/b'
  if (/^\.\//.test(path)) path = path.slice(2);
  return path;
}

export async function findFile({ path, collect, exclude, ignore, hasInfo }: FindFileOptions): Promise<void> {
  let rs;
  try {
    rs = Deno.readDirSync(path);
  } catch (e) {
    await Deno.stderr.write(encoder.encode('NotFound: No such file or directory\n'))
    Deno.exit(-1);
  }

  path = trimPath(path);

  if (exclude) {
    let flag = false;
    exclude.some(i => {
      if (trimPath(i) === path) {
        flag = true;
        return true;
      }
    })
    if (flag) return;
  }

  for (const item of rs) {
    let _path = `${path}/${item.name}`;
    _path = trimPath(_path);
    if (item.isDirectory) {
      // recursively directory
      findFile({
        path: _path,
        collect,
        exclude,
        ignore,
        hasInfo,
      });
    } else {
      // collect files according to rules
      let fileInfo = null;
      if (hasInfo) {
        const info = Deno.statSync(_path);
        fileInfo = {
          ...info,
          fmtSize: fmtFilesize(info.size),
        }
      }
      collect.push({
        path: _path,
        name: item.name,
        // https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
        ext: item.name.slice((item.name.lastIndexOf('.') - 1 >>> 0) + 2),
        realPath: Deno.realPathSync(_path),
        info: fileInfo,
      });
    }
  }
}

export function getFiles<T extends (string | GetFilesOptions)>(opts: T): FileInfo[] {
  const files: FileInfo[] = [];

  if (isStr(opts)) {
    findFile({ path: (opts as string), collect: files });
  } else {
    // there are multiple parameters
    const { root, include, exclude, ignore, hasInfo } = (opts as GetFilesOptions);

    if (root && include === undefined) {
      findFile({ path: root, collect: files, exclude, ignore, hasInfo });
    }

    if (include && include.length === 0) return [];

    if (include) {
      include.forEach(dir => findFile({ path: dir, collect: files, exclude, ignore, hasInfo }))
    }

    if (ignore && ignore.length) {
      // TODO:
    }
  }
  // console.log(files);
  return files;
}

export default getFiles;