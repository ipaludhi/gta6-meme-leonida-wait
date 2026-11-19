// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the X post itself: a GTA 6 meme (meme.png in this repo) posted
// from a public X account, with make.fun / @makefunai and our play code in its
// text. POST.json at the repo root names the post. This program's only job is
// to hand that address to the grader: it reads POST.json, checks it really
// names an X post, and writes the same bytes to /output/POST.json.
//
// No network, no wall clock, nothing outside the repository: two runs write
// the same bytes. Outside the grader's container, MAKEFUN_BOT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// An X post address, as X shows it. X's Share button can hand back three
// shapes, and a query or fragment after the id is read past:
//   https://x.com/<handle>/status/<digits>
//   https://x.com/i/web/status/<digits>
//   either on twitter.com, with www. or mobile. in front.
function postUrlOk(raw: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  const host = parsed.hostname.replace(/^(www\.|mobile\.)/, "");
  if (host !== "x.com" && host !== "twitter.com") return false;
  const parts = parsed.pathname.split("/").filter(Boolean);
  if (parts.length === 3 && parts[1] === "status" && /^\d+$/.test(parts[2])) return true;
  if (
    parts.length === 4 &&
    parts[0] === "i" &&
    parts[1] === "web" &&
    parts[2] === "status" &&
    /^\d+$/.test(parts[3])
  ) {
    return true;
  }
  return false;
}

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

const sourcePath = join(BOT_DIR, "POST.json");
let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  fail(`cannot read ${sourcePath}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString("utf8"));
} catch (err) {
  fail(`POST.json is not valid JSON: ${(err as Error).message}`);
}

if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
  fail("POST.json must be a JSON object with a url field");
}
const url = (parsed as Record<string, unknown>).url;
if (typeof url !== "string" || !postUrlOk(url)) {
  fail(`POST.json url is not an X post address: ${String(url)}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  // Copy the file byte for byte: what the grader reads is exactly what the
  // repository holds, so both runs of this program write identical bytes.
  writeFileSync(join(OUTPUT_DIR, "POST.json"), raw);
} catch (err) {
  fail(`cannot write ${OUTPUT_DIR}/POST.json: ${(err as Error).message}`);
}
