import fs,{readFile} from 'fs/promises';
import path from 'path';


const addDependencies = (packageName, dependeciesToAdd, dependeciesMap) => {
    for(const [name, spec] of Object.entries(dependeciesToAdd)) {
        dependeciesMap[name][spec].add(packageName);
    }
}

const getDependencyMap = (packageJson) => {
    const {dependencies, devDependencies, peerDependencies} = packageJson;
    const dependenciesMap = {};
    console.log(packageJson);
   // packageJson
 //   addDependencies(packageJson.name, packageJson.dependencies, dependenciesMap);
 //   addDependencies(packageJson.name, packageJson.devDependencies, dependencies);
  //  addDependencies(packageJson.name, packageJson.peerDependencies, dependencies);

    return dependenciesMap;

}

const getPackageJsonPaths = async() => {
    try{
        const packageNames = await readFile(path.join(__dirname,"..","packages"));

        const packageJsons = packageNames.map((p) =>
        path.join(__dirname, "..", "packages", p, "package.json")
      );
    
      packageJsons.push(path.join(__dirname, "..", "package.json"));
      packageJsons.push(path.join(__dirname, "..", "docs", "package.json"));
    
      return packageJsons;
    } catch(err) {
        throw new Error('some error');
    }
}