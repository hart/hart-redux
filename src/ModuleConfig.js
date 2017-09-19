import { applyNamespaceToAll } from './Namespace';
import { buildActions } from './utils';

export default class ModuleConfig {
	constructor(StoreConfig, onPrepareModule){
		this.prepareModule = function(namespace, module){
			const preparedModule = prepareModule(namespace, module);
			if(onPrepareModule) onPrepareModule(namespace, preparedModule);
			StoreConfig.addReducers(namespace, module.reducers);
			return this;
		}
	}
}

function prepareModule(namespace, { actionTypes, actions, selectors } = {}){
	selectors = selectors ? applyNamespaceToAll(namespace, selectors) : {};
	actions = actionTypes && selectors && actions ? buildActions(actionTypes, selectors, actions) : {};
	return {
		Actions: actions,
		...selectors
	}
}