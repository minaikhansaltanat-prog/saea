const sharp = require('sharp');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..'); // project root (one above caea-platform)
const OUT = path.join(__dirname, '..', 'public', 'images');

async function run() {
  // 1. Leader/team photo (77.jpg) - enhance, crop to portrait, produce sizes
  const leaderSrc = path.join(ROOT, 'tulga', '77.jpg');

  await sharp(leaderSrc)
    .rotate()
    .resize(1000, 1250, { fit: 'cover', position: 'top' })
    .modulate({ saturation: 1.08, brightness: 1.04 })
    .linear(1.06, -8)
    .sharpen({ sigma: 1 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT, 'team', 'leader.jpg'));

  await sharp(leaderSrc)
    .rotate()
    .resize(1000, 1250, { fit: 'cover', position: 'top' })
    .modulate({ saturation: 1.08, brightness: 1.04 })
    .linear(1.06, -8)
    .sharpen({ sigma: 1 })
    .webp({ quality: 88 })
    .toFile(path.join(OUT, 'team', 'leader.webp'));

  await sharp(leaderSrc)
    .rotate()
    .resize(800, 800, { fit: 'cover', position: 'top' })
    .modulate({ saturation: 1.08, brightness: 1.04 })
    .linear(1.06, -8)
    .sharpen({ sigma: 1 })
    .webp({ quality: 88 })
    .toFile(path.join(OUT, 'team', 'leader-square.webp'));

  // 2. Logos
  await sharp(path.join(ROOT, 'logo 3D.png')).resize(900, null, { withoutEnlargement: true }).png({ quality: 95 }).toFile(path.join(OUT, 'brand', 'logo-3d.png'));
  await sharp(path.join(ROOT, 'logo ОРТА.png')).resize(900, null, { withoutEnlargement: true }).png({ quality: 95 }).toFile(path.join(OUT, 'brand', 'logo-transparent.png'));
  await sharp(path.join(ROOT, 'logo ОРТА.png')).resize(512, null, { withoutEnlargement: true }).png().toFile(path.join(OUT, 'brand', 'logo-transparent-512.png'));

  // 3. D-folder stock images -> optimized webp backgrounds
  const dMap = {
    'Average HireRight Background Check Time.jfif': 'meeting-room',
    'Tarifs création site web professionnel _ ORBITIS France.jfif': 'dashboard-presentation',
    'Why Businesses in Durham Are Turning to Management Consultants for Success.jfif': 'boardroom-analytics',
    'Без названия (3).jfif': 'handshake-network',
  };
  for (const [src, name] of Object.entries(dMap)) {
    await sharp(path.join(ROOT, 'D', src))
      .resize(1920, 1280, { fit: 'cover' })
      .modulate({ saturation: 1.03 })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, 'bg', `${name}.webp`));
  }

  console.log('DONE');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
