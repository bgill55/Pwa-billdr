import { Settings as SettingsIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AppSettings {
  appName: string;
  themeColor: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  appName: 'PWA Ready App',
  themeColor: '#000000'
};

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = (newSettings: AppSettings) => {
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
    setSettings(newSettings);
    setIsOpen(false);

    // Update manifest theme color
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', newSettings.themeColor);
    }

    // Update page title
    document.title = newSettings.appName;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="Settings"
      >
        <SettingsIcon className="w-6 h-6 text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg p-4 z-10 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">App Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                App Name
              </label>
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Theme Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.themeColor}
                  onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                  className="h-10 w-20"
                />
                <input
                  type="text"
                  value={settings.themeColor}
                  onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(settings)}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const useAppSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return settings;
};
