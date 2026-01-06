const fs = require('fs');
const path = require('path');

// Get the folder path from command line argument
const folderPath = process.argv[2];

if (!folderPath) {
  console.error('❌ Please provide a folder path as an argument');
  console.error('Usage: node compile.js /app/(admin)/dashboard');
  process.exit(1);
}

// Convert relative path to absolute
const absolutePath = path.resolve(folderPath);

// Check if folder exists
if (!fs.existsSync(absolutePath)) {
  console.error(`❌ Folder not found: ${absolutePath}`);
  process.exit(1);
}

// Check if it's a directory
if (!fs.statSync(absolutePath).isDirectory()) {
  console.error(`❌ Path is not a directory: ${absolutePath}`);
  process.exit(1);
}

let output = `# Compiled Code from: ${folderPath}\n`;
output += `Generated on: ${new Date().toISOString()}\n`;
output += `${'='.repeat(80)}\n\n`;

let fileCount = 0;

// Recursive function to read all files
function readFilesRecursively(dir, relativeDir = '') {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    // Skip node_modules and other common directories
    if (['.next', 'node_modules', '.git', '.env', '__pycache__'].includes(file)) {
      return;
    }

    const filePath = path.join(dir, file);
    const relativePath = relativeDir ? `${relativeDir}/${file}` : file;
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively read subdirectories
      readFilesRecursively(filePath, relativePath);
    } else {
      // Read file content
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        output += `\n${'─'.repeat(80)}\n`;
        output += `📄 FILE: ${relativePath}\n`;
        output += `${'─'.repeat(80)}\n`;
        output += `\`\`\`\n${fileContent}\n\`\`\`\n`;
        
        fileCount++;
      } catch (error) {
        console.warn(`⚠️  Could not read file: ${relativePath}`);
      }
    }
  });
}

// Start reading files
console.log(`📦 Compiling files from: ${absolutePath}`);
readFilesRecursively(absolutePath);

// Write to output file
const outputFileName = `output.md`;
fs.writeFileSync(outputFileName, output);

console.log(`✅ Success! Compiled ${fileCount} files into ${outputFileName}`);
console.log(`📊 Output file size: ${(fs.statSync(outputFileName).size / 1024).toFixed(2)} KB`);
