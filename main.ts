import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I watered the office plant for a year before HR told me it was plastic \u2014 apparently I'm the only thing in this office that grows.";

// The grader runs `node main.ts` and reads <output-dir>/entry.txt.
// The output dir comes from MAKEFUN_OUTPUT_DIR when set, otherwise /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be exactly one non-blank line");
}
if (ENTRY !== ENTRY.trim() || ENTRY.includes("  ")) {
  throw new Error("entry must have no leading/trailing whitespace or double spaces");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length}-character entry to ${join(outDir, "entry.txt")}`);
