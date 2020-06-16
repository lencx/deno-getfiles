# getFiles

> Recursively get all files in a directory

## Usage

> needs --allow-read privilege

```ts
import getFiles, { exists } from "https://deno.land/x/getfiles/mod.ts";

// root path: './' or '.'
const files = getFiles('./');

// include files
const files2 = getFiles({
  dir: './',
  include: ['examples'],
  // ignore: ['examples/include.ts'],
});

// exclude files
const files3 = getFiles({
  dir: './',
  exclude: ['.git'],
  // ignore: ['*.ts'],
});

const existFile = await exists('mod.ts');
console.log(existFile);
```

## Methods

* getFiles(default export)
* exists

## API

> getFiles

| Option  | Type     | Description       | Example                                                    |
| ------- | -------- | ----------------- | ---------------------------------------------------------- |
| dir     | string   | directory         | {dir: '.'}                                                 |
| include | string[] | include directory | {dir: '.', include: ['examples']}                          |
| exclude | string[] | exclude directory | {dir: '.', exclude: ['.git']}                              |
| ignore  | string[] | ignore file rule  | {dir: '.', ignore: ['\*.ts', '\*.md', 'examples/tree.ts']} |

## Examples

* [tree](./examples/tree.ts)
* [include](./examples/include.ts)
* [exclude](./examples/exclude.ts)
* [cmd](https://github.com/lencx/deno-example/blob/master/cmd.ts)

## TODO

- [ ] exclude subpath
- [ ] file info
