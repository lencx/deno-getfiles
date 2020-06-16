import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import getFiles, { exists } from './mod.ts';

Deno.test('simple', () => {
  console.log(getFiles('./examples'));

  const files = getFiles({
    root: '.',
    // hasInfo: true,
    // include: ['examples'],
    exclude: ['.git', 'examples/testfile', 'xx'],
  })
  console.log(files);
})

Deno.test('exists', async () => {
  const isExists = await exists('mod.ts');
  assertEquals(isExists, true);
})