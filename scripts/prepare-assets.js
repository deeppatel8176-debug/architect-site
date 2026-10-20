const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'interior design');
const destDir = path.join(__dirname, '..', 'public', 'images', 'studio');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));
  files.forEach((file, index) => {
    const ext = path.extname(file);
    const destName = `project-interior-${index + 1}${ext}`;
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, destName);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} -> ${destName}`);
  });
}
console.log('Asset prep complete.');
