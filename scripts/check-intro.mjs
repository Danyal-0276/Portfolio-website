import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const compiled = ts.transpileModule(
  readFileSync(new URL("../src/lib/intro.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const exports = {};
runInNewContext(compiled, { exports });

function bootstrap({ seen = false, hash = "", reduced = false, storageBlocked = false } = {}) {
  const root = { dataset: {} };
  const timers = [];
  runInNewContext(exports.INTRO_BOOTSTRAP_SCRIPT, {
    document: { documentElement: root },
    location: { hash },
    matchMedia: () => ({ matches: reduced }),
    sessionStorage: { getItem: () => {
      if (storageBlocked) throw new Error("Storage blocked");
      return seen ? "seen" : null;
    } },
    setTimeout: (callback) => timers.push(callback),
  });
  return { root, timers };
}

const firstVisit = bootstrap();
assert.equal(firstVisit.root.dataset.intro, "pending", "First visit is covered before hydration");
assert.equal(bootstrap({ seen: true }).root.dataset.intro, "done", "Returning visitors skip the curtain");
assert.equal(bootstrap({ hash: "#work" }).root.dataset.intro, "done", "Deep links remain unobstructed");
assert.equal(bootstrap({ reduced: true }).root.dataset.intro, "done", "Reduced motion skips the intro");
assert.equal(bootstrap({ storageBlocked: true }).root.dataset.intro, "pending", "Blocked storage does not cause a flash");
firstVisit.timers[0]();
assert.equal(firstVisit.root.dataset.intro, "done", "Failed hydration reveals the page after the timeout");
const running = bootstrap();
running.root.dataset.intro = "running";
running.timers[0]();
assert.equal(running.root.dataset.intro, "running", "Fallback never interrupts an active animation");
console.log("Intro checks passed: 7 scenarios.");
