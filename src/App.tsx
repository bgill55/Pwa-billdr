import PWAInstallPrompt from './components/PWAInstallPrompt'
import DeploymentGuide from './components/DeploymentGuide'
import HTMLConverter from './components/HTMLConverter'
import ManifestBuilder from './components/ManifestBuilder'
import { SpeedInsights } from "@vercel/speed-insights/next"
function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
function App() {
  return (
    <RootLayout>
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
        <header role="banner" className="w-full border-b border-gray-800">
          <div className="w-full max-w-[90rem] mx-auto text-center py-4 sm:py-8 px-3 sm:px-4">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-white">
              PWA Ready App
            </h1>
            <p className="text-sm sm:text-lg text-gray-400">
              Convert your website into a Progressive Web App
            </p>
          </div>
        </header>
        <main role="main" className="flex-1 w-full max-w-[90rem] mx-auto p-3 sm:p-4 space-y-4 sm:space-y-6">
          <nav role="navigation" aria-label="Main tools" className="space-y-4 sm:space-y-6">
            <HTMLConverter />
            <ManifestBuilder />
          </nav>
          <section aria-label="App installation" className="flex justify-center">
            <PWAInstallPrompt />
          </section>
          <section aria-label="PWA requirements" className="text-xs sm:text-sm text-gray-400 p-3 sm:p-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <p>To make this a complete PWA, make sure to:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Add your app icons (pwa-192x192.png and pwa-512x512.png) in the public folder</li>
              <li>Use the Manifest Builder above to customize your app's manifest.json</li>
              <li>Update the cache strategy in sw.js for your specific needs</li>
            </ul>
          </section>
          <DeploymentGuide />
        </main>
        <footer role="contentinfo" className="w-full border-t border-gray-800 mt-8 sm:mt-12">
          <div className="w-full max-w-[90rem] mx-auto py-4 sm:py-6 px-3 sm:px-4 text-center space-y-2">
            <p className="text-xs sm:text-sm text-gray-500">
              Made with accessibility in mind for all developers
            </p>
            <div className="flex justify-center">
              <img
                src="https://img.shields.io/badge/Made_with_%E2%99%A5%EF%B8%8F-%26_Srcbook-purple?style=plastic&labelColor=11112&color=purple&cacheSeconds=3600&link=https%3A%2F%2Finstagram.com%2Fbgill55_art"
                alt="Made with ♥️ bgill55_art"
                className="hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </footer>
      </div>
    </RootLayout>
  )
}
export default App