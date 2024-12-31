import { useState } from 'react';
import { Copy, Download, CheckCheck } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ManifestData {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  orientation: 'any' | 'natural' | 'landscape' | 'portrait';
  startUrl: string;
  scope: string;
  categories: string[];
  dir: 'auto' | 'ltr' | 'rtl';
  id: string;
  lang: string;
  handle_links: 'auto' | 'preferred' | 'not-preferred';
  preferred_related_applications: boolean;
}

const DEFAULT_MANIFEST: ManifestData = {
  name: 'My PWA App',
  shortName: 'PWA App',
  description: 'A Progressive Web Application',
  themeColor: '#000000',
  backgroundColor: '#ffffff',
  display: 'standalone',
  orientation: 'any',
  startUrl: '/',
  scope: '/',
  categories: ['utilities'],
  dir: 'auto',
  id: '',
  lang: 'en',
  handle_links: 'auto',
  preferred_related_applications: false,
};

// ISO 639-1 language codes with names
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ur', name: 'Urdu' },
  { code: 'tr', name: 'Turkish' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
].sort((a, b) => a.name.localeCompare(b.name));

const ManifestBuilder = () => {
  const [manifestData, setManifestData] = useState<ManifestData>(DEFAULT_MANIFEST);
  const [copied, setCopied] = useState(false);

  const generateManifest = () => {
    const manifest = {
      name: manifestData.name,
      short_name: manifestData.shortName,
      description: manifestData.description,
      theme_color: manifestData.themeColor,
      background_color: manifestData.backgroundColor,
      display: manifestData.display,
      orientation: manifestData.orientation,
      start_url: manifestData.startUrl,
      scope: manifestData.scope,
      categories: manifestData.categories.filter(Boolean),
      dir: manifestData.dir,
      id: manifestData.id || undefined, // Only include if not empty
      lang: manifestData.lang,
      handle_links: manifestData.handle_links,
      preferred_related_applications: manifestData.preferred_related_applications,
      icons: [
        {
          src: '/assets/icons/icon_512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/assets/icons/icon_192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/assets/android/android-launchericon-512-512.png',
          sizes: '512x512'
        },
        {
          src: '/assets/android/android-launchericon-192-192.png',
          sizes: '192x192'
        },
        {
          src: '/assets/android/android-launchericon-144-144.png',
          sizes: '144x144'
        },
        {
          src: '/assets/android/android-launchericon-96-96.png',
          sizes: '96x96'
        },
        {
          src: '/assets/android/android-launchericon-72-72.png',
          sizes: '72x72'
        },
        {
          src: '/assets/android/android-launchericon-48-48.png',
          sizes: '48x48'
        },
        {
          src: '/assets/ios/180.png',
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: '/assets/ios/152.png',
          sizes: '152x152',
          type: 'image/png'
        },
        {
          src: '/assets/ios/120.png',
          sizes: '120x120',
          type: 'image/png'
        }
      ]
    };

    return JSON.stringify(manifest, null, 2);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateManifest());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateManifest()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manifest.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Manifest Builder</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              App Name
            </label>
            <input
              type="text"
              value={manifestData.name}
              onChange={(e) => setManifestData({ ...manifestData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Short Name
            </label>
            <input
              type="text"
              value={manifestData.shortName}
              onChange={(e) => setManifestData({ ...manifestData, shortName: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={manifestData.description}
              onChange={(e) => setManifestData({ ...manifestData, description: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Theme Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={manifestData.themeColor}
                  onChange={(e) => setManifestData({ ...manifestData, themeColor: e.target.value })}
                  className="h-10 w-10"
                />
                <input
                  type="text"
                  value={manifestData.themeColor}
                  onChange={(e) => setManifestData({ ...manifestData, themeColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={manifestData.backgroundColor}
                  onChange={(e) => setManifestData({ ...manifestData, backgroundColor: e.target.value })}
                  className="h-10 w-10"
                />
                <input
                  type="text"
                  value={manifestData.backgroundColor}
                  onChange={(e) => setManifestData({ ...manifestData, backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Mode
              </label>
              <select
                value={manifestData.display}
                onChange={(e) => setManifestData({ ...manifestData, display: e.target.value as ManifestData['display'] })}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="standalone">Standalone</option>
                <option value="fullscreen">Fullscreen</option>
                <option value="minimal-ui">Minimal UI</option>
                <option value="browser">Browser</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Direction
              </label>
              <select
                value={manifestData.dir}
                onChange={(e) => setManifestData({ ...manifestData, dir: e.target.value as ManifestData['dir'] })}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="auto">Auto</option>
                <option value="ltr">Left to Right (LTR)</option>
                <option value="rtl">Right to Left (RTL)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </label>
              <select
                value={manifestData.lang}
                onChange={(e) => setManifestData({ ...manifestData, lang: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                {LANGUAGES.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name} ({code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Handle Links
              </label>
              <select
                value={manifestData.handle_links}
                onChange={(e) => setManifestData({ ...manifestData, handle_links: e.target.value as ManifestData['handle_links'] })}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="auto">Auto</option>
                <option value="preferred">Preferred</option>
                <option value="not-preferred">Not Preferred</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              App ID
            </label>
            <input
              type="text"
              value={manifestData.id}
              onChange={(e) => setManifestData({ ...manifestData, id: e.target.value })}
              placeholder="Unique identifier for your PWA"
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="preferred_related_applications"
              checked={manifestData.preferred_related_applications}
              onChange={(e) => setManifestData({ ...manifestData, preferred_related_applications: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
            />
            <label 
              htmlFor="preferred_related_applications"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Prefer Related Applications
            </label>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium dark:text-white">Generated Manifest</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {copied ? (
                  <CheckCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          
          <div className="relative">
            <SyntaxHighlighter
              language="json"
              style={atomOneDark}
              customStyle={{
                backgroundColor: 'rgb(31 41 55)',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                height: '500px',
                overflowY: 'auto'
              }}
            >
              {generateManifest()}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestBuilder;
