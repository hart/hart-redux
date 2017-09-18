const mapSelectorsToActions = (Selectors, Actions) => Actions ? Object.keys(Actions).reduce((mappedActions, key) => {
	mappedActions[key] = Actions[key](Selectors);
	return mappedActions;
}, {}) : {};

export default mapSelectorsToActions;