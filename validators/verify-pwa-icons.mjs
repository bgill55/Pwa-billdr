import fs from 'fs/promises';
import path from 'path';

async function verifyPWAIcons() {
  console.log('Verifying PWA icon configuration...\n');

  try {
    // Read and parse manifest.json
    const manifestPath = path.join('public', 'manifest.json');
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);

    console.log('Checking manifest.json...');
    if (!manifest.icons || !Array.isArray(manifest.icons)) {
      console.error('❌ manifest.json does not contain an icons array');
      return;
    }

    console.log('✅ manifest.json contains an icons array');

    // Check each icon in the manifest
    for (const icon of manifest.icons) {
      const iconPath = path.join('public', icon.src.replace(/^\//, ''));
      console.log(`\nChecking icon: ${icon.src}`);

      // Verify icon file exists
      try {
        await fs.access(iconPath);
        console.log(`✅ Icon file exists: ${iconPath}`);
      } catch (error) {
        console.error(`❌ Icon file not found: ${iconPath}`);
        continue;
      }

      // Verify icon properties
      if (!icon.sizes) {
        console.error(`❌ Missing 'sizes' property for icon: ${icon.src}`);
      } else {
        console.log(`✅ Icon has 'sizes' property: ${icon.sizes}`);
      }

      if (!icon.type) {
        console.error(`❌ Missing 'type' property for icon: ${icon.src}`);
      } else {
        console.log(`✅ Icon has 'type' property: ${icon.type}`);
      }
    }

    console.log('\nPWA icon verification complete.');
  } catch (error) {
    console.error('An error occurred during verification:', error);
  }
}

await verifyPWAIcons();