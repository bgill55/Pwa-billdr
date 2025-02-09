npm install
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react
cat > .eslintrc.json << 'EOF'
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
EOF
npm run build