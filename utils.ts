/**
 * @author: lencx
 * @create_at: Jun 14, 2020
 */

/**
 * @method fmtFileSize
 * @param {number} bytes
 * @param {boolean} bits - enables bit sizes, default is `false`
 * @param {number} dp - decimal place, default is `2`
 * @see https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string/10420404
 */
export function fmtFileSize(bytes: number, bit: boolean = false, dp: number = 2) {
  const thresh: number = bit ? 1000 : 1024;
  if (bytes <= 0) {
    return '0 B';
  }
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  const units = bit
    ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  return `${bytes.toFixed(dp)} ${units[u]}`;
}

export const isStr = (arg: any): boolean => typeof arg === 'string';

// exists directory or file
export const exists = async (filename: string): Promise<boolean> => {
  try {
    await Deno.stat(filename);
    return true;
  } catch (e) {
    return false;
  }
}

// https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
export const fileExt = (fname: string): string => fname.slice((fname.lastIndexOf('.') - 1 >>> 0) + 2);

// example: './a/b/' => 'a/b'
export const trimPath = (path: string): string => {
  // example: './a/b/' => './a/b'
  if (/\/$/.test(path)) path = path.slice(0, -1);
  // example: './a/b' => 'a/b'
  if (/^\.\//.test(path)) path = path.slice(2);
  return path;
}
