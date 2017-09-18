export const selector = (namespace, func) => (state, ...rest) => func(state[namespace], ...rest);

export const selectors = (namespace, funcs) => Object.keys(funcs).reduce((mappedFuncs, key) => {
	mappedFuncs[key] = applyNamespace(namespace, funcs[key]);
	return mappedFuncs;
}, {});

//export single default
export default selector;

//export all shortname
export const all = selectors;