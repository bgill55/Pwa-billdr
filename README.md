# PWA Converter App

A modern Progressive Web App (PWA) converter and toolkit that helps developers transform their web applications into installable PWAs with ease.

## 🚀 Features

- **HTML Converter**: Automatically adds necessary PWA meta tags and configurations
- **Manifest Builder**: Interactive GUI for creating and customizing your web app manifest
- **PWA Installation Prompt**: Built-in install button with proper checks and validations
- **Icon Management**: Comprehensive icon verification and guidelines
- **Deployment Guide**: Detailed instructions for deploying your PWA

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pwa-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

## 💻 Usage

### Converting Your App to PWA

1. **HTML Conversion**
   - Paste your existing HTML code into the converter
   - Get PWA-ready HTML with all necessary meta tags and configurations

2. **Manifest Generation**
   - Use the interactive Manifest Builder
   - Customize app name, colors, and other PWA properties
   - Download the generated manifest.json

3. **Icon Setup**
   The app requires the following icon structure:
   ```
   public/
   ├── assets/
   │   ├── icons/
   │   │   ├── icon_512.png  (512x512, purpose: any)
   │   │   └── icon_192.png  (192x192, purpose: maskable)
   │   ├── android/
   │   │   ├── android-launchericon-512-512.png
   │   │   ├── android-launchericon-192-192.png
   │   │   └── ... (other sizes)
   │   └── ios/
   │       ├── 180.png
   │       ├── 152.png
   │       └── ... (other sizes)
   ```

### Deployment

1. Build your application:
```bash
npm run build
```

2. Deploy the contents of the `dist` folder to your web server

3. Ensure your server is configured with the provided `.htaccess` file for proper PWA functionality

## ⚙️ Configuration

### Theme Customization
The app supports light, dark, and system theme modes. Configure theme settings through the settings panel.

### App Settings
Customize:
- Application name
- Theme colors
- PWA display mode
- Language and direction
- Icon preferences

## 🌐 Browser Support

The PWA features are supported in:
- Chrome (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Safari (iOS)
- Edge (Desktop & Mobile)
- Samsung Internet

## 📱 PWA Features

- ✅ Installable
- ✅ Offline Support
- ✅ Add to Home Screen
- ✅ Full Screen Mode
- ✅ Custom Theme Colors
- ✅ iOS Support
- ✅ Android Support

## 🔒 Security

The application includes:
- Proper Content Security Policy
- Secure Header Configurations
- HTTPS Enforcement
- Service Worker Scope Management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by @bgill55_art
