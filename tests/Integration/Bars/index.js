import ActionTypes from '../../../src/ActionTypes';
import Normalized from '../../../src/Normalized';
import RequestAction from '../../../src/RequestAction';

const actionTypes = ActionTypes("bars");
const normalized = Normalized(actionTypes);
const actions = {
	loadBar: (ActionTypes, Selectors) => RequestAction({
		shouldSkip: (getState, ...params) => Selectors.isObjectLoading(getState()),
		operation: actionTypes.READ,
		promise: (getState, bar) => Promise.resolve({data: bar})
	})
}
export default {
	actionTypes,
	actions,
	...normalized
};