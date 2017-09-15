module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    'es6': true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "parser": "babel-eslint",
  "root": true,
  "globals": {
    "__DEV__": true,
  },
  "rules": {
    "global-require": "off",
    "no-use-before-define": ["error", {
      "variables": false
    }],
    "arrow-parens": ["error", "always"],
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "linebreak-style": ["error", "unix"],
    "no-console": "off",
    "max-len": [1, 200],
  },
};