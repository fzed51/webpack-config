# webpack-config

Ce package fourni les dépendances et un fichier de config de webpack pour un projet utilisant **js/react/typescript**

## Utilisation

Installer le package

```
npm i -D @fzed51/webpack-config
```

Créer le fichier `webpack.config.js`.

```js
const config = require("@fzed51/webpack-config");
module.exports = config;
```

Ajouter la clé _scripts_ au fichier `package.json`.

```js
"scripts": {
    "build": "webpack -p --mode production",
    "dev": "webpack-dev-server -d --mode development --hot --open"
},
```

## Description des dépendances

- babel@7 avec preset env, react et typescript
- react@16
- webpack@4
    