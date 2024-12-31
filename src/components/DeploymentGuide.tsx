import { ChevronDown, ChevronUp, Terminal, Globe, Server, FolderTree, FileCode2 } from 'lucide-react';
import { useState } from 'react';

const DeploymentGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left dark:text-white"
      >
        <span className="font-semibold text-lg">Deployment Guide</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-6">
          <section>
            <h3 className="flex items-center gap-2 text-lg font-medium mb-3 dark:text-white">
              <Terminal className="w-5 h-5" />
              Build Process
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>1. Run the production build command:</p>
              <code className="block bg-gray-50 dark:bg-gray-900 p-2 rounded text-sm font-mono">
                npm run build
              </code>
              <p>This will generate a <code>dist</code> folder containing all your production files.</p>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-medium mb-3 dark:text-white">
              <FileCode2 className="w-5 h-5" />
              Apache Configuration
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>Your PWA requires a proper <code>.htaccess</code> configuration. We've included one in the <code>public</code> folder that:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Configures correct MIME types for PWA files</li>
                <li>Sets up proper caching headers</li>
                <li>Enables service worker access</li>
                <li>Handles SPA routing</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded text-yellow-800 dark:text-yellow-300">
                Make sure to upload the <code>.htaccess</code> file to your server's root directory along with other files.
              </div>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-medium mb-3 dark:text-white">
              <FolderTree className="w-5 h-5" />
              Dist Folder Structure
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                After building, your dist folder will contain:
              </p>
              <pre className="text-sm font-mono text-gray-600 dark:text-gray-300">
{`dist/
├── assets/
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── index-[hash].css
│   └── index-[hash].js
├── index.html
├── manifest.json
├── .htaccess
└── sw.js`}
              </pre>
              
              <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p><strong>When deploying to your server:</strong></p>
                <ul className="list-disc list-inside ml-2">
                  <li>Upload <strong>ALL</strong> contents of the dist folder</li>
                  <li>Maintain the exact same structure on your server</li>
                  <li>The contents of <code>assets/</code> folder must stay in an <code>assets/</code> folder</li>
                  <li>Keep <code>index.html</code>, <code>manifest.json</code>, <code>.htaccess</code>, and <code>sw.js</code> in the root</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-medium mb-3 dark:text-white">
              <Globe className="w-5 h-5" />
              Deployment Steps
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 dark:text-white">Option 1: Static Hosting (Recommended)</h4>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-600 dark:text-gray-300">
                  <li>Netlify: Just drag and drop the entire dist folder</li>
                  <li>Vercel: Push to Git and it will handle the build</li>
                  <li>GitHub Pages: Use gh-pages package</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 dark:text-white">Option 2: Manual Upload</h4>
                <ol className="list-decimal list-inside ml-4 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Connect to your web server via FTP/SFTP</li>
                  <li>Navigate to your website's root directory</li>
                  <li>Upload the <strong>entire contents</strong> of the dist folder</li>
                  <li>Verify the <code>.htaccess</code> file is in the root directory</li>
                  <li>Maintain the exact folder structure from dist</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-medium mb-3 dark:text-white">
              <Server className="w-5 h-5" />
              Post-Deployment Checklist
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>✓ Verify your site loads correctly</li>
              <li>✓ Check that all files are in their correct locations</li>
              <li>✓ Confirm the service worker registers successfully</li>
              <li>✓ Confirm the PWA can be installed</li>
              <li>✓ Test offline functionality</li>
              <li>✓ Verify icons are loading properly</li>
              <li>✓ Check browser console for any MIME type or file access errors</li>
            </ul>
          </section>

          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-sm text-yellow-700 dark:text-yellow-300">
            ⚠️ Important: If you experience any issues with file access or MIME types, verify that your <code>.htaccess</code> file was uploaded and is being processed by the server.
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentGuide;
