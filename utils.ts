/**
 * @author: lencx
 * @create_at: Jun 14, 2020
 */

/**
 * @method fmtFilesize
 * @param {number} bytes
 * @param {boolean} bits - enables bit sizes, default is `false`
 * @param {number} dp - decimal place, default is `2`
 * @see https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string/10420404
 */
export function fmtFilesize(bytes: number, bit: boolean = false, dp: number = 2) {
  const thresh: number = bit ? 1000 : 1024;
  if (bytes <= 0) {
    return '0 B';
  }
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  const units = bit
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  return `${bytes.toFixed(dp)} ${units[u]}`;
}
