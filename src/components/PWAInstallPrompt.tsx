import { useState, useEffect } from 'react';
import { Download, AlertTriangle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}

const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [iconErrors, setIconErrors] = useState<string[]>([]);

  useEffect(() => {
    const getAllIconPaths = async (): Promise<string[]> => {
      const iconPaths: Set<string> = new Set();

      // Icons from index.html (hardcoded for now, as direct DOM parsing is not feasible in this context)
      iconPaths.add('/assets/icons/icon_192.png');
      iconPaths.add('/assets/icons/icon_512.png');
      iconPaths.add('/assets/ios/180.png');
      iconPaths.add('/assets/ios/152.png');
      iconPaths.add('/assets/ios/120.png');

      // Icons from manifest.webmanifest
      try {
        const response = await fetch('/manifest.webmanifest');
        if (response.ok) {
          const manifest = await response.json();
          if (manifest.icons && Array.isArray(manifest.icons)) {
            manifest.icons.forEach((icon: ManifestIcon) => {
              iconPaths.add(icon.src);
            });
          }
        }
      } catch (error) {
        console.error('Error fetching or parsing manifest:', error);
      }

      return Array.from(iconPaths);
    };

    const checkIcons = async () => {
      try {
        const errors: string[] = [];
        const allIconPaths = await getAllIconPaths();

        for (const path of allIconPaths) {
          try {
            const response = await fetch(path);
            if (!response.ok) {
              errors.push(`Icon missing or inaccessible: ${path}`);
            }
          } catch {
            errors.push(`Icon missing or inaccessible: ${path}`);
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
          <span className="font-medium">PWA Icons Missing or Inaccessible</span>
          <span className="text-sm">
            Please ensure all PWA icons exist and are accessible:
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