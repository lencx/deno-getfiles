import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import getFiles, { exists } from './mod.ts';

Deno.test('simple', () => {
  const files = getFiles('./examples').map(i => i.path);
  const oFiles = ['examples/include.ts', 'examples/exclude.ts', 'examples/tree.ts'];

  try {
    assertEquals(files.sort(), oFiles.sort());
  } catch (e) {
    console.error(e);
  }
})

Deno.test('exclude', () => {
  const files = getFiles({
    dir: '.',
    exclude: ['.git'],
    ignore: ['*.ts'],
  }).map(i => i.path);

  const oFiles = ['LICENSE', 'README.md', '.gitignore'];

  try {
    assertEquals(files.sort(), oFiles.sort());
  } catch (e) {
    console.error(e);
  }
})

Deno.test('include & ignore', () => {
  const files = getFiles({
    dir: '.',
    include: ['examples'],
    ignore: ['examples/include.ts'],
  }).map(i => i.path);

  const oFiles = ['examples/exclude.ts', 'examples/tree.ts'];

  try {
    assertEquals(files.sort(), oFiles.sort());
  } catch (e) {
    console.error(e);
  }
})

Deno.test('exists', async () => {
  const isExists = await exists('mod.ts');
  assertEquals(isExists, true);
})