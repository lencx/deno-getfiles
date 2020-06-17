# getFiles

> Recursively get all files in a directory

[![getfiles ci](https://github.com/lencx/deno-getfiles/workflows/getfiles-ci/badge.svg)](https://github.com/lencx/deno-getfiles/actions)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/lencx/deno-getfiles)
[![license](https://img.shields.io/github/license/lencx/deno-getfiles)](https://github.com/lencx/deno-getfiles/blob/master/LICENSE)
[![Made by lencx](https://img.shields.io/badge/Made%20by%20-lencx-inactive)](https://github.com/lencx)

## Usage

> needs --allow-read privilege

```ts
import getFiles, { exists, fileExt, trimPath, fmtFileSize } from "https://deno.land/x/getfiles/mod.ts";

// root path: './' or '.'
const files = getFiles('./');

// include files
const files2 = getFiles({
  root: './',
  include: ['examples'],
  hasInfo: true,
  // ignore: ['examples/include.ts'],
});

// exclude files
const files3 = getFiles({
  root: './',
  exclude: ['.git'],
  // ignore: ['*.ts'],
});

// if a file exists
const existFile = await exists('mod.ts');
console.log(existFile);
```

## Methods

* [fs] - `getFiles`: default export
* [fs] - `findFile`
* [utils] - `exists`
* [utils] - `fileExt`: get file extensions
* [utils] - `trimPath`: trim path
* [utils] - `fmtFileSize`: converting file size in bytes to human readable string
* [utils] - `isStr`

## API

> getFiles

| Option  | Type     | Description                   | Example                                                          |
| ------- | -------- | ----------------------------- | ---------------------------------------------------------------- |
| root    | string   | directory                     | {root: '.'}                                                      |
| include | string[] | include directory             | {root: '.', include: ['examples']}                               |
| exclude | string[] | exclude directory             | {root: '.', exclude: ['.git']}                                   |
| ignore  | string[] | ignore file rule              | {root: '.', ignore: ['\*.md', '\*\*/\*.ts', 'examples/tree.ts']} |
| hasInfo | boolean  | file details, default `false` | {root: '.', hasInfo: true}                                       |

## Examples

* [tree](./examples/tree.ts)
* [include](./examples/include.ts)
* [exclude](./examples/exclude.ts)
* [cmd](https://github.com/lencx/deno-example/blob/master/cmd.ts)
