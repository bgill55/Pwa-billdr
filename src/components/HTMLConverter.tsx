import { useState } from 'react';
import { Copy, CheckCheck } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const HTMLConverter = () => {
  const [inputHtml, setInputHtml] = useState('');
  const [copied, setCopied] = useState(false);

  const convertedHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${inputHtml.includes('<title>') ? '' : '<title>My PWA App</title>'}
    
    <!-- PWA Meta Tags -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="A Progressive Web Application"/>
    
    <!-- iOS Support -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="PWA App">
    
    <!-- iOS Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/ios/180.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/ios/152.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/ios/120.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/ios/76.png">
    
    <!-- Favicons -->
    <link rel="icon" type="image/png" sizes="512x512" href="/assets/icons/icon_512.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/icon_192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/ios/32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/ios/16.png">
    
    ${inputHtml.match(/<head>([\s\S]*?)<\/head>/)?.[1] || ''}
  </head>
  <body>
    ${inputHtml.match(/<body>([\s\S]*?)<\/body>/)?.[1] || inputHtml}
    
    <!-- Service Worker Registration -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('ServiceWorker registration successful');
            })
            .catch(err => {
              console.log('ServiceWorker registration failed: ', err);
            });
        });
      }
    </script>
  </body>
</html>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(convertedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 dark:text-white">HTML Converter</h2>
      
      <div className="mb-4">
        <label htmlFor="html-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Paste your HTML code here
        </label>
        <textarea
          id="html-input"
          value={inputHtml}
          onChange={(e) => setInputHtml(e.target.value)}
          className="w-full h-32 sm:h-48 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          placeholder="Enter your HTML code..."
        />
      </div>

      {inputHtml && (
        <>
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base sm:text-lg font-medium dark:text-white">Converted PWA-ready Code</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {copied ? (
                  <CheckCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            
            <div className="relative">
              <SyntaxHighlighter
                language="html"
                style={atomOneDark}
                customStyle={{
                  backgroundColor: 'rgb(31 41 55)',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  lineHeight: '1.25rem',
                }}
                className="max-h-[400px] overflow-y-auto"
              >
                {convertedHtml}
              </SyntaxHighlighter>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HTMLConverter;
