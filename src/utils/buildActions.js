const buildActions = (ActionTypes={}, Selectors={}, Actions={}) => Object.keys(Actions).reduce((mappedActions, key) => {
	mappedActions[key] = Actions[key](ActionTypes, Selectors);
	return mappedActions;
}, {});

export default buildActions;