import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = new URL('../images/', import.meta.url).pathname;
const WIDTHS = [400, 800];

const files = (await readdir(IMAGES_DIR)).filter(f => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
  const src = join(IMAGES_DIR, file);
  const ext = extname(file).toLowerCase();
  const base = basename(file, ext);
  const meta = await sharp(src).metadata();

  for (const w of WIDTHS) {
    if (w >= meta.width) continue; // skip if source is smaller
    const out = join(IMAGES_DIR, `${base}@${w}w${ext}`);
    const pipeline = sharp(src).resize(w);
    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    } else {
      await pipeline.png({ compressionLevel: 9 }).toFile(out);
    }
    console.log(`  ${file} → ${base}@${w}w${ext}`);
  }
}
console.log('Done.');
