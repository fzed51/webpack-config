# webpack-config

![npm](https://img.shields.io/npm/v/@fzed51/webpack-config.svg?style=flat-square)
![npm](https://img.shields.io/npm/dt/@fzed51/webpack-config.svg?style=flat-square)

Ce package fourni les dépendances et un fichier de config de webpack pour un projet
utilisant **js/react/typescript**

## Utilisation

Installer le package

```
npm i -D @fzed51/webpack-config
```

Après l'installation, lancer le script `./node_modules/.bin/webpack-config-init`. Le script vous demande si vous voulez créer le fichier `webpack.config.js` et modifier le fichier `package.json` automatiquement.

Créer le fichier `webpack.config.js` manuellement.

```js
const config = require("@fzed51/webpack-config");
module.exports = config({
  useReact: true,
  useTypescript: true,
  htmlWebpackPlugin: true,
  cleanOutput: true,
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
    template: "./src/index.html",
  },
  cleanOutput: true,
});
```

ou

```js
const config = require("@fzed51/webpack-config");
module.exports = config({
  useReact: false,
  useTypescript: true,
  htmlWebpackPlugin: false,
  cleanOutput: true,
});
```

ou

```js
const config = require("@fzed51/webpack-config");
module.exports = config({
  useReact: true,
  useTypescript: true,
  htmlWebpackPlugin: false,
  cleanOutput: {
    exclude: ["static/*.*"],
  },
});
```

Ajouter la clé _scripts_ au fichier `package.json` manuellement.

```js
"scripts": {
    "build": "webpack -p --mode production",
    "dev": "webpack-dev-server -d --mode development --hot --open"
},
```

## Description des options

### useReact

Ajoute dans la configuration la règle pour compiler le code React et JSX.

Utilise _@babel/preset-react_

### useTypescript

Ajoute dans la configuration la règle pour compiler du code Typescript

Utilise _@babel/preset-typescript_

### htmlWebpackPlugin

Cette option peut prendre plusieurs types de valeur.

- `false` : ne génère pas de fichier `index.html`
- `true` : génère un fichier `index.html` de base
- `object` : un objet de configuration
  - `template : './chemin/vers/template.html'` : génère un fichier `index.html`
    prenant pour template un fichier `html` tiers.
  - `title : 'Titre de la page'` : Modifie le titre de la page.

Utilise le plugin _html-webpack-plugin_

### cleanOutput

Nettoie le dossier de sortie de webpack. par défaut le dossier `./dist`. Cette option
peut prendre différent valeur :

- `false` : ne netoie pas le dossier de sortie
- `true` : netoie le dossier de sortie
- `object` : un objet de configuration
  - `exclude : ['pattern/*.*', 'fichier.txt']` : exclu un certain nombre de fichiers
    du nettoyage. La référence des patterns est toujours le dossier de sortie de webpack.

Utilise le plugin _clean-webpack-plugin_

## Description des dépendances

- babel@7 avec preset env, react et typescript
- react@16
- webpack@4

### commande d'installation des dépandances

```shell
npm i @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-json-strings @babel/plugin-syntax-dynamic-import @babel/plugin-syntax-import-meta @babel/preset-env @babel/preset-react @babel/preset-typescript @types/react @types/react-dom @types/react-redux @types/webpack babel-loader clean-webpack-plugin css-loader file-loader html-webpack-plugin inquirer react react-dom react-redux redux redux-thunk sass sass-loader style-loader typescript url-loader webpack webpack-cli webpack-dev-server
```
