const { readFileSync, writeFileSync, rmSync } = require("fs");
const { execSync } = require("child_process");

const packageFileName = "./package.json";

const getPackage = (packageFileName) => {
  console.log("lecture de " + packageFileName);
  const data = readFileSync(packageFileName, "utf8");
  const package = JSON.parse(data);
  return package;
};

const getDevDependencies = (package) => {
  console.log("extraction des devDependencies");
  const dd = package.devDependencies || {};
  const keys = [];
  for (var key in dd) {
    keys.push(key);
  }
  return keys;
};

const getDependencies = (package) => {
  console.log("extraction des dependencies");
  const d = package.dependencies || {};
  const keys = [];
  for (var key in d) {
    keys.push(key);
  }
  return keys;
};

const cleanDependencies = (package) => {
  console.log("suppression des dependances dans package.json");
  return { ...package, devDependencies: undefined, dependencies: undefined };
};

const cleanNodeModules = () => {
  console.log("suppression ddu dossier node_module");
  rmSync("./node_modules", { recursive: true, force: true });
};

const setPackage = (packageFileName, package) => {
  console.log("sauvegarde de " + packageFileName);
  const data = JSON.stringify(package, null, "  ");
  writeFileSync(packageFileName, data);
};

const installDependencies = (dependencies, dev) => {
  dev = !!(dev || false);
  for (const dependency of dependencies) {
    installDependency(dependency, dev);
  }
};

const installDependency = (dependency, dev) => {
  console.log("installation de " + dependency);
  dev = !!(dev || false);
  let commande = "npm i ";
  if (dev) {
    commande = commande + "-D ";
  }
  execSync(commande + dependency);
};

try {
  let package = getPackage(packageFileName);
  const devDep = getDevDependencies(package);
  const dep = getDependencies(package);
  package = cleanDependencies(package);
  setPackage(packageFileName, package);
  cleanNodeModules();
  installDependencies(dep);
  installDependencies(devDep, true);
} catch (err) {
  console.error(err);
}
