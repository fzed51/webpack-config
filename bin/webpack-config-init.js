#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const process = require("process");
const input = require("inquirer");
const cwd = process.env.INIT_CWD || ".";

const updatePackage = () => {
  const packagePath = path.resolve(cwd + "/package.json");

  fs.readFile(packagePath, (err, data) => {
    if (err) {
      throw "Impossible de lire le fichier package.json (" + packagePath + ")";
    }

    let package = JSON.parse(data);
    let scripts = package.scripts || {};

    let prefix = "";
    if ("build" in scripts || "dev" in scripts) {
      prefix = "wc:";
    }

    scripts["_" + prefix + "clean"] = "git clean -xq ./dist";
    scripts["_" + prefix + "build"] = "webpack --mode production";
    scripts[
      prefix + "build"
    ] = `npm run _${prefix}clean && npm run _${prefix}build`;
    scripts[prefix + "dev"] = "webpack-dev-server --mode development --hot";
    scripts[prefix + "dev:o"] =
      "webpack-dev-server --mode development --hot --open";
    package.scripts = scripts;

    console.log(
      `Ajout des script ${prefix}build et ${prefix}dev dans le fichier ${packagePath}`
    );

    let newData = JSON.stringify(package, null, 2);
    fs.writeFileSync(packagePath, newData);
  });
};

const initWebpack = () => {
  const webpackPath = path.resolve(cwd + "/webpack.config.js");
  const webpackConfigExist = fs.existsSync(webpackPath);
  if (!webpackConfigExist) {
    const webpackConfigContent = `const config = require("@fzed51/webpack-config");
    
    module.exports = config({
      useReact: true,
      useTypescript: true,
      htmlWebpackPlugin: true
    });
    `;
    fs.writeFileSync(webpackPath, webpackConfigContent);
  }
};

console.log("webpack-config");
console.log("==============");
input
  .prompt([
    {
      type: "confirm",
      name: "package",
      message: "Voulez-vous ajouter les scripts au package.json",
    },
    {
      type: "confirm",
      name: "webpack",
      message: "Voulez-vous ajouter initialiser un fichier webpack.config.js",
    },
  ])
  .then((answers) => {
    // console.log(answers);
    if (answers.package) {
      updatePackage();
    }
    if (answers.webpack) {
      initWebpack();
    }
  });
