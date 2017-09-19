import ModuleConfig from '../../../src/ModuleConfig';
import ActionTypes from '../../../src/ActionTypes';
import Normalized from '../../../src/Normalized';
import RequestAction from '../../../src/RequestAction';

const actionTypes = ActionTypes("bars");
const normalized = Normalized(actionTypes);
const actions = {
	loadBar: (ActionTypes, Selectors) => RequestAction({
		shouldSkip: (getState, ...params) => Selectors.isObjectLoading(getState()),
		operation: ActionTypes.READ,
		promise: (getState, bar) => Promise.resolve({data: bar})
	})
}

export default function(namespace){
	return new ModuleConfig(namespace)
		.reducers(normalized.reducers)
		.selectors(normalized.selectors)
		.actionTypes(actionTypes)
		.mapActions(actions)
		.module();
}