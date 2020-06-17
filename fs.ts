/**
 * @author: lencx
 * @create_at: Jun 17, 2020
 */

import { fmtFileSize, trimPath, fileExt, isStr } from './utils.ts';
import { GetFilesOptions, FindFileOptions, FileInfo } from './types.ts';

const encoder = new TextEncoder();

export async function findFile({ path, collect, exclude, ignore, hasInfo, isFirst }: FindFileOptions): Promise<void> {
  let rs;
  try {
    rs = Deno.readDirSync(path);
  } catch (e) {
    await Deno.stderr.write(encoder.encode('NotFound: No such file or directory\n'))
    Deno.exit(-1);
  }

  path = trimPath(path);

  if (exclude && exclude.length) {
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
      findFile({ path: _path, collect, exclude, ignore, hasInfo, isFirst: false });
    } else {
      const fExt = fileExt(item.name);

      //=== ignore rules
      // `**/*.ts`: recursive directory ignores files
      // `*.ts` : ignore files under `root path` or `include path`
      // `a/b/c.ts`: specific ignore files
      let flag = false;
      if (ignore && ignore.length) {
        ignore.some(i => {
          const regRule = (/^\*\./.test(i) && isFirst) || /\*\*\/\*\./.test(i);
          if ((regRule && fExt && fExt === fileExt(i)) || trimPath(i) === _path) {
            flag = true;
            return true;
          }
        })
      }

      // collect files according to rules
      let fileInfo = null;
      if (hasInfo) {
        const info = Deno.statSync(_path);
        fileInfo = {
          ...info,
          fmtSize: fmtFileSize(info.size),
        }
      }
      !flag && collect.push({
        path: _path,
        name: item.name,
        ext: fExt,
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
      findFile({ path: root, collect: files, exclude, ignore, hasInfo, isFirst: true });
    }

    if (include && include.length === 0) return [];

    if (include) {
      include.forEach(dir => findFile({ path: dir, collect: files, ignore, exclude, hasInfo, isFirst: true }))
    }
  }
  return files;
}

export default getFiles;