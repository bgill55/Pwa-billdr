import { validateManifest } from '@pwabuilder/manifest-validation';
import fs from 'fs';
import path from 'path';

async function validate() {
  try {
    // Path to your local manifest file
    const manifestPath = ('./dist/manifest.json'); // Adjust the path as necessary

    // Read the manifest file
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // Validate the manifest
    const validationResults = await validateManifest(manifest,true,manifestPath);
    // Log the validation results
    console.log('Validation Results:', validationResults);
  } catch (error) {
    console.error('Error validating manifest:', error);
  }
}

validate();
