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
Lors de l'installation, un script vous demande si vous voulez modifier les fichiers 
`webpack.config.js` et `package.json` automatiquement.

Créer le fichier `webpack.config.js` manuellement.

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

ou
```js
const config = require("@fzed51/webpack-config");
module.exports = config({
  useReact: true,
  useTypescript: true,
  htmlWebpackPlugin: false,
  cleanOutput: {
    exclude: [
      "static/*.*"
    ]
  }
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

Utilise *@babel/preset-react*

### useTypescript

Ajoute dans la configuration la règle pour compiler du code Typescript

Utilise *@babel/preset-typescript*

### htmlWebpackPlugin

Cette option peut prendre plusieurs types de valeur.
- `false` : ne génère pas de fichier `index.html`
- `true` : génère un fichier `index.html` de base
- `object` : un objet de configuration
  - `template : './chemin/vers/template.html'` : génère un fichier `index.html` 
    prenant pour template un fichier `html` tiers.
  - `title : 'Titre de la page'` : Modifie le titre de la page.

Utilise le plugin *html-webpack-plugin*

### cleanOutput 

Nettoie le dossier de sortie de webpack. par défaut le dossier `./dist`. Cette option 
peut prendre différent valeur :
- `false` : ne netoie pas le dossier de sortie
- `true` : netoie le dossier de sortie
- `object` : un objet de configuration
  - `exclude : ['pattern/*.*', 'fichier.txt']` : exclu un certain nombre de fichiers 
  du nettoyage. La référence des patterns est toujours le dossier de sortie de webpack.

Utilise le plugin *clean-webpack-plugin*

## Description des dépendances

- babel@7 avec preset env, react et typescript
- react@16
- webpack@4
