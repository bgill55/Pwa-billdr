import { useState, useEffect } from 'react';
import { Download, AlertTriangle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Updated paths to match the standardized structure
const REQUIRED_ICONS = [
  { path: '/assets/icons/icon_512.png', size: '512x512', purpose: 'any' },
  { path: '/assets/icons/icon_192.png', size: '192x192', purpose: 'maskable' }
];

const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [iconErrors, setIconErrors] = useState<string[]>([]);

  useEffect(() => {
    // Check if critical icons are properly loaded
    const checkIcons = async () => {
      try {
        const errors: string[] = [];
        
        // Check required icons first
        for (const icon of REQUIRED_ICONS) {
          try {
            const response = await fetch(icon.path);
            if (!response.ok) {
              errors.push(`${icon.size} ${icon.purpose} icon missing (${icon.path})`);
            }
          } catch {
            errors.push(`${icon.size} ${icon.purpose} icon missing (${icon.path})`);
          }
        }

        setIconErrors(errors);
      } catch (error) {
        console.error('Error checking icons:', error);
        setIconErrors(['Error verifying PWA icons']);
      }
    };

    checkIcons();

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const result = await installPrompt.userChoice;
    
    if (result.outcome === 'accepted') {
      setIsInstalled(true);
      setInstallPrompt(null);
    }
  };

  if (iconErrors.length > 0) {
    return (
      <div className="text-yellow-600 flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/30 px-4 py-3 rounded-lg">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <div className="flex flex-col">
          <span className="font-medium">Critical Icons Missing</span>
          <span className="text-sm">
            Please ensure these required icons exist:
            <ul className="list-disc list-inside mt-1 space-y-1">
              {iconErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    );
  }

  if (isInstalled) {
    return (
      <div className="text-green-600 flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-lg">
        <Download className="w-5 h-5" />
        <span>App is installed!</span>
      </div>
    );
  }

  return installPrompt ? (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Download className="w-5 h-5" />
      Install App
    </button>
  ) : null;
};

export default PWAInstallPrompt;
