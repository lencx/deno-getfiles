/**
 * @author: lencx
 * @create_at: Jun 14, 2020
 * @cmd: deno run --allow-read examples/include.ts
 */

import getFiles from '../mod.ts';

const files = getFiles({
  root: '.',
  include: ['examples'],
  ignore: ['examples/include.ts'],
});

const _files = files.map(i => i.path).join('\n');

Deno.stdout.write(new TextEncoder().encode(`${_files}\n`));