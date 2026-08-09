import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMap = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "scripts/cloudinary-urls.json"), "utf-8")
);

let content = fs.readFileSync('src/constants/projects.js', 'utf-8');

for (const [localPath, cloudUrl] of Object.entries(urlMap)) {
  // localPath is like "/projects/livraone/Untitled--5psd_01.jpg"
  // broken paths in projects.js are like "livraone/Untitled--5psd_01.jpg"
  
  const brokenPath = localPath.replace(/^\/?projects\//, '');
  const altBrokenPath = localPath.replace(/^\//, ''); // e.g. "projects/livraone/..."
  const fullPathWithSlash = localPath.startsWith('/') ? localPath : '/' + localPath;
  
  // Replace broken paths
  content = content.split('"' + brokenPath + '"').join('"' + cloudUrl + '"');
  content = content.split('"' + altBrokenPath + '"').join('"' + cloudUrl + '"');
  content = content.split('"' + fullPathWithSlash + '"').join('"' + cloudUrl + '"');
}

fs.writeFileSync('src/constants/projects.js', content);
console.log('Fixed projects.js URLs round 2');
