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
  const brokenPath = localPath.replace(/^projects\//, '');
  const pathWithSlash = '/' + localPath;
  
  // Replace all variations of the local path with the full Cloudinary URL
  content = content.split('"' + brokenPath + '"').join('"' + cloudUrl + '"');
  content = content.split('"' + localPath + '"').join('"' + cloudUrl + '"');
  content = content.split('"' + pathWithSlash + '"').join('"' + cloudUrl + '"');
}

fs.writeFileSync('src/constants/projects.js', content);
console.log('Fixed projects.js URLs');
