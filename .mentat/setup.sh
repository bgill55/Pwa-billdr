npm install
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react globals
cat > eslint.config.js << 'EOF'
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      'react': reactPlugin
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-console': 'off',
      ...tseslint.configs.recommended.rules
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
EOF
npm run build