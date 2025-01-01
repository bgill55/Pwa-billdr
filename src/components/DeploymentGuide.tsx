import { ChevronDown, ChevronUp, Terminal, Globe, Server, FolderTree, FileCode2 } from 'lucide-react';
import { useState } from 'react';

const DeploymentGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 sm:p-4 flex items-center justify-between text-left dark:text-white"
      >
        <span className="font-semibold text-base sm:text-lg">Deployment Guide</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="p-3 sm:p-4 pt-0 space-y-4 sm:space-y-6 text-sm sm:text-base">
          <section>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-medium mb-3 dark:text-white">
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
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-medium mb-3 dark:text-white">
              <FileCode2 className="w-5 h-5" />
              Apache Configuration
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>Your PWA requires a proper <code>.htaccess</code> configuration. We've included one in the <code>public</code> folder that:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Configures correct MIME types for PWA files</li>
                <li>Sets up proper caching headers</li>
                <li>Enables service worker access</li>
                <li>Handles SPA routing</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-medium mb-3 dark:text-white">
              <FolderTree className="w-5 h-5" />
              File Structure
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <pre className="text-xs sm:text-sm font-mono text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
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
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-medium mb-3 dark:text-white">
              <Globe className="w-5 h-5" />
              Deployment
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2 dark:text-white">Static Hosting</h4>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-600 dark:text-gray-300">
                  <li>Netlify: Drag and drop the dist folder</li>
                  <li>Vercel: Push to Git repository</li>
                  <li>GitHub Pages: Use gh-pages package</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 dark:text-white">Manual Upload</h4>
                <ol className="list-decimal list-inside ml-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Connect via FTP/SFTP</li>
                  <li>Navigate to website root</li>
                  <li>Upload dist contents</li>
                  <li>Verify .htaccess file</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-medium mb-3 dark:text-white">
              <Server className="w-5 h-5" />
              Final Checklist
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>✓ Site loads correctly</li>
              <li>✓ Files in correct locations</li>
              <li>✓ Service worker registers</li>
              <li>✓ PWA can be installed</li>
              <li>✓ Offline mode works</li>
              <li>✓ Icons load properly</li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default DeploymentGuide;
