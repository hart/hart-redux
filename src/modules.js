const modules = {};

export const registerModule = (key, module) => modules[key] = module;
export const registerModules = (modulesObj) => Object.keys(modulesObj).forEach(key => modules[key] = modulesObj[key]);
export const getModule = key => modules[key];
export const getModules = () => Object.assign({}, modules);