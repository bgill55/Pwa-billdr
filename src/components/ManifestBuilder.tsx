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
      id: manifestData.id || undefined,
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
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 dark:text-white">Manifest Builder</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              App Name
            </label>
            <input
              type="text"
              value={manifestData.name}
              onChange={(e) => setManifestData({ ...manifestData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
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
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={manifestData.description}
              onChange={(e) => setManifestData({ ...manifestData, description: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Theme Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={manifestData.themeColor}
                  onChange={(e) => setManifestData({ ...manifestData, themeColor: e.target.value })}
                  className="h-9 w-9"
                />
                <input
                  type="text"
                  value={manifestData.themeColor}
                  onChange={(e) => setManifestData({ ...manifestData, themeColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Background
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={manifestData.backgroundColor}
                  onChange={(e) => setManifestData({ ...manifestData, backgroundColor: e.target.value })}
                  className="h-9 w-9"
                />
                <input
                  type="text"
                  value={manifestData.backgroundColor}
                  onChange={(e) => setManifestData({ ...manifestData, backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Mode
              </label>
              <select
                value={manifestData.display}
                onChange={(e) => setManifestData({ ...manifestData, display: e.target.value as ManifestData['display'] })}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
              >
                <option value="standalone">Standalone</option>
                <option value="fullscreen">Fullscreen</option>
                <option value="minimal-ui">Minimal UI</option>
                <option value="browser">Browser</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </label>
              <select
                value={manifestData.lang}
                onChange={(e) => setManifestData({ ...manifestData, lang: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
              >
                {LANGUAGES.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base sm:text-lg font-medium dark:text-white">Generated Manifest</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
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
                className="flex items-center gap-1 px-2 sm:px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
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
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                lineHeight: '1.25rem',
              }}
              className="h-[400px] overflow-y-auto"
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
