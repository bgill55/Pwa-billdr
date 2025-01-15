import './index.css';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import DeploymentGuide from './components/DeploymentGuide';
import HTMLConverter from './components/HTMLConverter';
import ManifestBuilder from './components/ManifestBuilder';

  function App() {
  return (
   <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100 p-2 sm:p-4 pb-12">
<header className="w-full mb-6 sm:mb-8 bg-gray-800 shadow-md">
<div className="flex items-center justify-between px-4 py-2">
<div className="flex items-center">
<img src="/logo.png" alt="Company Logo" className="h-10 w-10 mr-2" />
<h1 className="text-2xl sm:text-3xl font-bold">PWA Builder</h1>
</div>
<div className="flex items-center space-x-2">
{/* You can add other icons or buttons here if needed */}
</div>
</div>
</header>

<div className="w-full max-w-4xl space-y-4 sm:space-y-6 px-2 sm:px-4">
<HTMLConverter />
<ManifestBuilder />
<div className="flex justify-center">
<PWAInstallPrompt />
</div>
<div className="text-sm text-gray-400 p-3 sm:p-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
<p>To make this a complete PWA, make sure to:</p>
<ul className="list-disc list-inside mt-2">
<li>Add your app icons (pwa-192x192.png and pwa-512x512.png) in the public folder</li>
<li>Use the Manifest Builder above to customize your app's manifest.json</li>
<li>Update the cache strategy in sw.js for your specific needs</li>
</ul>
</div>
<DeploymentGuide />
</div>
</div>
);
}

export default App;