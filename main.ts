// main.ts — entry program for the make.fun bounty
// "Promote make.fun's make-your-own-bounty post on X".
//
// The entry is one post on X. This program:
//   1. Loads POST.json from the repository root.
//   2. Checks it names a single public post on X.
//   3. Writes that file unchanged into the output directory.
//   4. Explains how the bounty scores the post.
//
// The score is the post's replies plus its reposts plus its quotes.
// Views and likes are read and shown, and move nothing: the house
// reads the post itself, so nothing written here about the post counts.
//
// Run it:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22, standard library only, no network calls.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const POST_FILE = "POST.json";

// The gate's cap on the post file: POST.json is a JSON object of at
// most 16384 bytes.
const MAX_POST_BYTES = 16384;

// https://x.com/<handle>/status/<id> (or twitter.com, with www. or
// mobile. in front, or /i/web/status/<id>). Anything after the id —
// a query string or a fragment — is read past.
const POST_ADDRESS =
  /^https:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?<handle>[A-Za-z0-9_]{1,15})\/(?:status|i\/web\/status)\/(?<id>[0-9]+)\/?(?:[?#].*)?$/;

function die(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function loadPost(root: string): { raw: Buffer; url: string } {
  const path = join(root, POST_FILE);
  let raw: Buffer;
  try {
    raw = readFileSync(path);
  } catch {
    die(`cannot read ${POST_FILE} from the repository root.`);
  }
  if (raw!.length > MAX_POST_BYTES) {
    die(`${POST_FILE} is over the ${MAX_POST_BYTES}-byte cap.`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw!.toString("utf8"));
  } catch {
    die(`${POST_FILE} is not valid JSON.`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    die(`${POST_FILE} must be a JSON object with a "url" field.`);
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== "string") {
    die(`${POST_FILE} must name one post: https://x.com/<handle>/status/<id>.`);
  }
  return { raw: raw!, url };
}

function explain(url: string, handle: string, id: string): void {
  console.log(`Post: ${url}`);
  console.log(`Handle: @${handle}, status ${id}.`);
  console.log("Score = replies + reposts + quotes. Each one counts 1.");
  console.log("Views and likes move nothing.");
  console.log("The house reads the post at the deadline — that reading");
  console.log("alone decides the places.");
}

function main(): void {
  const root = resolve(dirname(fileURLToPath(import.meta.url)));
  const { raw, url } = loadPost(root);
  const found = POST_ADDRESS.exec(url);
  if (found === null || found.groups === undefined) {
    die(`${POST_FILE} must name one post: https://x.com/<handle>/status/<id>.`);
  }
  // The entry names your own post, never make.fun's.
  const handle = found.groups.handle;
  const id = found.groups.id;
  if (handle.toLowerCase() === "makefunai") {
    die(`${POST_FILE} must name your own post, never make.fun's.`);
  }
  const out = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, POST_FILE), raw);
  explain(url, handle, id);
  console.log(`Wrote ${POST_FILE} to ${out}.`);
}

main();
