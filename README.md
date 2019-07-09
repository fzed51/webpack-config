# webpack-config

![npm](https://img.shields.io/npm/v/@fzed51/webpack-config.svg?style=flat-square)
![npm](https://img.shields.io/npm/dt/@fzed51/webpack-config.svg?style=flat-square)


Ce package fourni les dépendances et un fichier de config de webpack pour un projet utilisant **js/react/typescript**

## Utilisation

Installer le package

```
npm i -D @fzed51/webpack-config
```

Créer le fichier `webpack.config.js`.

```js
const config = require("@fzed51/webpack-config");
module.exports = config({
  useReact: true,
  useTypescript: true,
  htmlWebpackPlugin: true
});
```
ci-dessus, paramétrage par défaut.

ou
```js
const config = require("@fzed51/webpack-config");
module.exports = config({
  useReact: true,
  useTypescript: true,
  htmlWebpackPlugin: {
      template: './src/index.html'
  }
});
```
ou
```js
const config = require("@fzed51/webpack-config");
module.exports = config({
  useReact: false,
  useTypescript: true,
  htmlWebpackPlugin: false
});
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
