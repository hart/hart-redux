import Selectors from './selectors';
import { Actions } from './constants';
import { normalizedAction } from '../../src';

const { areFoosLoading } = Selectors;

export const loadFoos = normalizedAction({
	negativeCondition: (getState, ...params) => Selectors.areFoosLoading(getState()),
	operationActions: Actions.FETCH,
	actionPromise: (getState, foos) => new Promise((resolve, reject) => {
		console.log("actionPromise", foos);
		setTimeout(() => {
			resolve({data: foos});
		}, 10);
	})
});

export const loadFoosWithError = normalizedAction({
	negativeCondition: (getState, ...params) => Selectors.areFoosLoading(getState()),
	operationActions: Actions.FETCH,
	actionPromise: (getState, foos) => new Promise((resolve, reject) => {
		setTimeout(() => {
			reject({error: "Luck was not with you.", params: {foos: foos} });
		}, 10);
	})
});