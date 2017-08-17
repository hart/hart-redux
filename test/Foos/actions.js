import Selectors from './selectors';
import { Actions } from './constants';
import { normalizedAction } from '../../src';

const { areFoosLoading } = Selectors;

export const loadFoos = normalizedAction({
	negativeCondition: state => Selectors.areFoosLoading(state),
	operationActions: Actions.FETCH,
	actionPromise: new Promise((resolve, reject) => {
		console.log("loadFoos actionPromise");
		setTimeout(() => {
			console.log("loadFoos actionPromise resolve/reject");
			if(Math.random() > .5){
				console.log("loadFoos actionPromise resolving");
				resolve({data: [{id: 1, name: "foo 1"}, {id: 2, name: "foo 2"}]});
			}else{
				console.log("loadFoos actionPromise rejecting");
				reject({error: "Luck was not with you."});
			}
		}, 250);
	})
});