const modules = {};

export const registerModule = (key, module) => modules[key] = module;
export const getModule = key => modules[key];
export const getModules = () => Object.assign({}, modules);