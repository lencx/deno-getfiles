/**
 * @author: lencx
 * @create_at: Jun 14, 2020
 * @cmd: deno run --allow-read examples/exclude.ts
 */

import getFiles from '../mod.ts';

const files = getFiles({
  root: '.',
  exclude: ['.git'],
  ignore: ['*.ts', '*.md'],
});

const _files = files.map(i => i.path).join('\n');

Deno.stdout.write(new TextEncoder().encode(`${_files}\n`));