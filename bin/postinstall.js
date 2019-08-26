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

    scripts[prefix + "build"] = "webpack -p --mode production";
    scripts[prefix + "dev"] =
      "webpack-dev-server -d --mode development --hot --open";
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
      htmlWebpackPlugin: true,
      cleanOutput: true
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
      message: "Voulez-vous ajouter les scripts au package.json"
    },
    {
      type: "confirm",
      name: "webpack",
      message: "Voulez-vous ajouter initialiser un fichier webpack.config.js"
    }
  ])
  .then(answers => {
    // console.log(answers);
    if (answers.package) {
      updatePackage();
    }
    if (answers.webpack) {
      initWebpack();
    }
  });
