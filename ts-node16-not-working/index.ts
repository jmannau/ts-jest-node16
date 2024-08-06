import assert from "assert";
import { get } from "lodash";
import { setTimeout } from "timers/promises";

export async function helloWorld() {
  assert(!!get({ a: 1 }, "a"), "lodash is not working");
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  assert(!!pdfjs, "pdfjs is not working");
  // insert await to prevent jest error due to async import initialization
  await setTimeout(1000);
  return "Hello World";
}
