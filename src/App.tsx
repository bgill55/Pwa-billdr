import './index.css'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import DeploymentGuide from './components/DeploymentGuide'
import HTMLConverter from './components/HTMLConverter'
import ManifestBuilder from './components/ManifestBuilder'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100 p-2 sm:p-4 pb-12">
      <div className="text-center mt-6 sm:mt-12 mb-6 sm:mb-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
          PWA Ready App
        </h1>
        <p className="text-base sm:text-lg text-gray-400">
          Convert your website into a Progressive Web App
        </p>
      </div>

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
  )
}

export default App
