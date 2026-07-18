import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = 'src/assets';
const files = [
  'pop_handdrawn_browser.png',
  'works/evershine.png',
  'line-qr.png',
  'logo.png'
];

for (const file of files) {
  const filePath = path.join(assetsDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} (does not exist)`);
    continue;
  }
  
  const statsBefore = fs.statSync(filePath);
  const sizeBeforeKB = (statsBefore.size / 1024).toFixed(1);
  
  const tempPath = filePath + '.temp.png';
  
  try {
    let pipeline = sharp(filePath);
    
    // For very large images like the browser illustration, let's also resize them if they are too wide
    const metadata = await pipeline.metadata();
    if (metadata.width && metadata.width > 1200) {
      pipeline = pipeline.resize({ width: 1200 });
    }
    
    await pipeline
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(tempPath);
      
    fs.renameSync(tempPath, filePath);
    
    const statsAfter = fs.statSync(filePath);
    const sizeAfterKB = (statsAfter.size / 1024).toFixed(1);
    const percentReduction = (((statsBefore.size - statsAfter.size) / statsBefore.size) * 100).toFixed(1);
    
    console.log(`Optimized ${file}: ${sizeBeforeKB} KB -> ${sizeAfterKB} KB (${percentReduction}% reduction)`);
  } catch (err) {
    console.error(`Error optimizing ${file}:`, err);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}
