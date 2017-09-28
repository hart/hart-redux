import RequestAction from '../../../src/RequestAction';

export const loadFoos = (ActionTypes, Selectors) => RequestAction({
	shouldSkip: (getState, ...params) => Selectors.areFoosLoading(getState()),
	operation: ActionTypes.READ,
	promise: (getState, foos) => new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({data: foos});
		}, 10);
	})
});

export const loadFoosWithError = (ActionTypes, Selectors) => RequestAction({
	shouldSkip: (getState, ...params) => Selectors.areFoosLoading(getState()),
	operation: ActionTypes.READ,
	promise: (getState, foos) => new Promise((resolve, reject) => {
		setTimeout(() => {
			reject({error: "Luck was not with you.", params: {foos: foos} });
		}, 10);
	})
});