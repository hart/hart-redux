import Selectors from './selectors';
import { Actions } from './constants';
import { normalizedAction } from '../../src';

const { areFoosLoading } = Selectors;

export const loadFoos = normalizedAction({
	negativeCondition: state => Selectors.areFoosLoading(state),
	operationActions: Actions.FETCH,
	actionPromise: () => new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({data: [{id: 1, name: "foo 1"}, {id: 2, name: "foo 2"}]});
		}, 10);
	})
});

export const loadFoosWithError = normalizedAction({
	negativeCondition: state => Selectors.areFoosLoading(state),
	operationActions: Actions.FETCH,
	actionPromise: () => new Promise((resolve, reject) => {
		setTimeout(() => {
			reject({error: "Luck was not with you."});
		}, 10);
	})
});