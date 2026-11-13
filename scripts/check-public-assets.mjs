import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publicDirectory = path.join(root, "public");
const searchableEntries = ["src", "scripts", "README.md", "next.config.ts", ".env.example"];
const textExtensions = new Set([".css", ".js", ".json", ".jsx", ".md", ".mjs", ".ts", ".tsx", ".txt"]);

function collectFiles(entry) {
  const absolute = path.join(root, entry);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((child) =>
    collectFiles(path.relative(root, path.join(absolute, child.name))),
  );
}

const searchableText = searchableEntries
  .flatMap(collectFiles)
  .filter((file) => textExtensions.has(path.extname(file)))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const assets = collectFiles("public");
const unused = assets.filter((file) => {
  const publicPath = `/${path.relative(publicDirectory, file).split(path.sep).join("/")}`;
  return !searchableText.includes(publicPath);
});

if (unused.length > 0) {
  console.error("Unreferenced public assets:\n");
  for (const file of unused) console.error(`- ${path.relative(root, file)}`);
  process.exit(1);
}

console.log(`Public asset check passed: ${assets.length} referenced files.`);
