import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import getFiles, { exists } from './mod.ts';

Deno.test('simple', () => {
  console.log(getFiles('./examples'));

  const files = getFiles({
    root: '.',
    // include: ['examples'],
    exclude: ['.git', 'examples/testfile'],
  })
  console.log(files);
})

Deno.test('exists', async () => {
  const isExists = await exists('mod.ts');
  assertEquals(isExists, true);
})