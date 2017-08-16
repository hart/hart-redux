export const applyNamespace = (namespace, func) => (state, ...rest) => func(state[namespace], ...rest);

export const applyNamespaceToAll = (namespace, funcs) => Object.keys(funcs).reduce((mappedFuncs, key) => {
	mappedFuncs[key] = applyNamespace(namespace, funcs[key]);
	return mappedFuncs;
}, {});