const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const INPUT_DIRS = ["app", "components", "content", "lib", "stores", "types"];
const OUTPUT_FILE = path.join(ROOT, "bundled.txt");

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".css",
  ".scss",
  ".mjs",
  ".cjs",
  ".txt",
  ".yml",
  ".yaml",
  ".svg",
  ".d.ts",
]);

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return TEXT_EXTENSIONS.has(ext);
}

function collectFiles(dirPath) {
  const results = [];
  if (!fs.existsSync(dirPath)) {
    return results;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else if (entry.isFile() && isTextFile(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

function writeBundle() {
  const allFiles = INPUT_DIRS.flatMap((dir) => collectFiles(path.join(ROOT, dir)));
  allFiles.sort();

  const chunks = [];
  for (const filePath of allFiles) {
    const relativePath = path.relative(ROOT, filePath).replace(/\\/g, "/");
    const content = fs.readFileSync(filePath, "utf8");

    chunks.push(`===== ${relativePath} =====`);
    chunks.push(content);
    chunks.push("");
  }

  fs.writeFileSync(OUTPUT_FILE, chunks.join("\n"), "utf8");
  console.log(`Bundled ${allFiles.length} files into ${OUTPUT_FILE}`);
}

writeBundle();
