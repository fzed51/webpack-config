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
  htmlWebpackPlugin: true,
  cleanOutput: true
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
  },
  cleanOutput: true
});
```
ou
```js
const config = require("@fzed51/webpack-config");
module.exports = config({
  useReact: false,
  useTypescript: true,
  htmlWebpackPlugin: false,
  cleanOutput: true
});
```

Ajouter la clé _scripts_ au fichier `package.json`.

```js
"scripts": {
    "build": "webpack -p --mode production",
    "dev": "webpack-dev-server -d --mode development --hot --open"
},
```

## Description des options

### useReact

Ajoute dans la configuration la règle pour compiler le code React et JSX.

Utilise *@babel/preset-react*

### useTypescript

Ajoute dans la configuration la règle pour compiler du code Typescript

Utilise *@babel/preset-typescript*

### htmlWebpackPlugin

Cette optionpeut prendre plusieurs types de valeur.
- `false` : ne génère pas de fichier `index.html`
- `true` : génère un fichier `index.html` de base
- `'./chemin/vers/template.html'` : idem que ci-dessus, à l'exception qu'un fichier template est utilisé pour générer le fichier `index.html`

Utilise le plugin *html-webpack-plugin*

### cleanOutput 

Nettoie le dossier de sortie de webpack. par défaut le dossier `./dist`

Utilise le plugin *clean-webpack-plugin*

## Description des dépendances

- babel@7 avec preset env, react et typescript
- react@16
- webpack@4
