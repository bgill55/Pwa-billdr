import fs from 'fs/promises';
import path from 'path';

async function verifyPWASetup() {
  console.log('Verifying PWA setup...\n');

  try {
    // Check manifest.json
    const manifestPath = path.join('public', 'manifest.json');
    console.log('Checking manifest.json...');
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);

    console.log('✅ manifest.json found and parsed successfully');

    // Check required fields in manifest
    const requiredFields = ['name', 'short_name', 'description', 'start_url', 'display', 'background_color', 'theme_color', 'icons'];
    for (const field of requiredFields) {
      if (manifest[field]) {
        console.log(`✅ '${field}' field found in manifest`);
      } else {
        console.error(`❌ '${field}' field missing in manifest`);
      }
    }

    // Check icons
    console.log('\nChecking icons...');
    if (Array.isArray(manifest.icons)) {
      for (const icon of manifest.icons) {
        const iconPath = path.join('public', icon.src.replace(/^\//, ''));
        try {
          await fs.access(iconPath);
          console.log(`✅ Icon found: ${icon.src} (${icon.sizes})`);
        } catch (error) {
          console.error(`❌ Icon not found: ${icon.src} (${icon.sizes})`);
        }
      }
    } else {
      console.error('❌ No icons defined in manifest');
    }

    // Check service worker
    console.log('\nChecking service worker...');
    const swPath = path.join('public', 'service-worker.js');
    try {
      await fs.access(swPath);
      console.log('✅ service-worker.js found');
    } catch (error) {
      console.error('❌ service-worker.js not found in public folder');
    }

    console.log('\nPWA setup verification complete.');
  } catch (error) {
    console.error('An error occurred during verification:', error);
  }
}

await verifyPWASetup();