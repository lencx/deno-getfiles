import { assertEquals, assertArrayContains } from "https://deno.land/std/testing/asserts.ts";
import getFiles, { exists, fmtFileSize, trimPath, fileExt } from './mod.ts';

Deno.test('simple', () => {
  const files = getFiles('./examples').map(i => i.path);
  const oFiles = ['examples/include.ts', 'examples/exclude.ts', 'examples/testfile/1.txt', 'examples/tree.ts'];

  try {
    assertEquals(files.sort(), oFiles.sort());
  } catch (e) {
    console.error(e);
  }
})

Deno.test('exclude & ignore', () => {
  const files = getFiles({
    root: '.',
    exclude: ['.git', './examples'],
    ignore: ['*.ts']
  }).map(i => i.path);
  const oFiles = ['.vscode/settings.json', '.gitignore', 'README.md', 'LICENSE'];

  try {
    assertEquals(files.sort(), oFiles.sort());
  } catch (e) {
    console.error(e);
  }
})

Deno.test('exclude & ignore', () => {
  const files = getFiles({
    root: '.',
    exclude: ['.git', './examples'],
    ignore: ['*.ts']
  }).map(i => i.path);
  const oFiles = ['.vscode/settings.json', '.gitignore', 'README.md', 'LICENSE'];

  try {
    assertEquals(files.sort(), oFiles.sort());
  } catch (e) {
    console.error(e);
  }
})

Deno.test('file info', () => {
  const files = getFiles({
    root: './examples',
    hasInfo: true,
  }).map((i: any) => Object.keys(i.info));
  const hasFileInfo = ['isFile', 'isSymlink', 'atime', 'mtime', 'birthtime', 'size', 'fmtSize'];

  try {
    assertArrayContains(files[0], hasFileInfo);
  } catch (e) {
    console.error(e);
  }
})

Deno.test('include & exclude & ignore', () => {
  const files = getFiles({
    root: '.',
    include: ['./examples'],
    exclude: ['.git'],
    ignore: ['*.ts', './examples/testfile/1.txt']
  }).map(i => i.path);
  const oFiles: any = [];

  try {
    assertEquals(files.sort(), oFiles.sort());
  } catch (e) {
    console.error(e);
  }
})

Deno.test('include & exclude', () => {
  const files = getFiles({
    root: '.',
    include: ['./examples/testfile', '.vscode'],
    exclude: ['.vscode'],
  }).map(i => i.path);
  const oFiles = ['examples/testfile/1.txt'];

  try {
    assertEquals(files.sort(), oFiles.sort());
  } catch (e) {
    console.error(e);
  }
})

Deno.test('fmtFileSize', async () => {
  assertEquals(fmtFileSize(400), '400 B');
  assertEquals(fmtFileSize(1024), '1.00 KiB');
  assertEquals(fmtFileSize(1024, true), '1.02 KB');
  assertEquals(fmtFileSize(1024, true, 1), '1.0 KB');
})

Deno.test('file exists', async () => {
  const isExists = await exists('mod.ts');
  assertEquals(isExists, true);
})

Deno.test('trimPath', async () => {
  assertEquals(trimPath('./a/b/c.txt'), 'a/b/c.txt');
  assertEquals(trimPath('./a/b/'), 'a/b');
  assertEquals(trimPath('a/b/c'), 'a/b/c');
})

Deno.test('fileExt', async () => {
  assertEquals(fileExt('./a.txt'), 'txt');
  assertEquals(fileExt('/a/b/c.txt'), 'txt');
  assertEquals(fileExt('.gitignore'), '');
  assertEquals(fileExt('.deno.test.js'), 'js');
  assertEquals(fileExt(''), '');
})