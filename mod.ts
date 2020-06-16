/**
 * @author: lencx
 * @create_at: Jun 14, 2020
 */

import { GetFilesOptions, FindFileOptions, FileInfo } from './types.ts';

const isStr = (arg: any): boolean => typeof arg === 'string';
const encoder = new TextEncoder();

// exists directory or file
export const exists = async (filename: string) => {
  try {
    await Deno.stat(filename);
    return true;
  } catch (e) {
    return false;
  }
}

export async function findFile({ path, collect, exclude, ignore }: FindFileOptions) {
  let rs;
  try {
    rs = Deno.readDirSync(path);
  } catch (e) {
    await Deno.stderr.write(encoder.encode('NotFound: No such file or directory\n'))
    Deno.exit(-1);
  }

  // example: './a/b/' => './a/b'
  if (/\/$/.test(path)) path = path.slice(0, -1);
  // example: './a/b' => 'a/b'
  if (/^\.\//.test(path)) path = path.slice(2);

  if (exclude && exclude.includes(path)) return;

  for (const item of rs) {
    let _path = `${path}/${item.name}`;
    if (item.isDirectory) {
      // recursively directory
      findFile({
        path: _path,
        collect,
        exclude,
        ignore,
      });
    } else {
      // collect files according to rules
      collect.push(item);
    }
  }
}

export function getFiles<T extends (string | GetFilesOptions)>(opts: T) {
  const files: FileInfo[] = [];

  if (isStr(opts)) {
    findFile({ path: (opts as string), collect: files });
  } else {
    // there are multiple parameters
    const { root, include, exclude, ignore } = (opts as GetFilesOptions);

    if (root && include === undefined) {
      findFile({ path: root, collect: files, exclude, ignore });
    }

    if (include && include.length === 0) return;

    if (include) {
      include.forEach(dir => findFile({ path: dir, collect: files, exclude, ignore }))
    }

    if (ignore && ignore.length) {
      // TODO:
    }
  }
  // console.log(files);
  return files;
}

export default getFiles;
