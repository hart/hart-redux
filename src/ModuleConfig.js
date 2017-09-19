import { applyNamespaceToAll } from './Namespace';
import { buildActions } from './utils';

export default class ModuleConfig {
	constructor(namespace){
		const module = { namespace: namespace, actions: {}, selectors: {}, actionTypes: {}, reducer: null, reducers: {} };

		this.selectors = (selectors) => {
			if(selectors) Object.assign(module.selectors, applyNamespaceToAll(namespace, selectors));
			return this;
		}

		this.reducer = (reducer) => {
			if(reducer) module.reducer = reducer;
			return this;
		}

		this.reducers = (reducers) => {
			if(reducers) Object.assign(module.reducers, reducers);
			return this;
		}

		this.actionTypes = (actionTypes) => {
			if(actionTypes) Object.assign(module.actionTypes, actionTypes);
			return this;
		}

		this.actions = (actions) => {
			if(actions) Object.assign(module.actions, actions);
			return this;
		}

		this.buildActions = (actions) => {
			if(actions){
				actions = buildActions(module.actionTypes, module.selectors, actions);
				return this.actions(actions);
			}
			return this;
		}

		this.module = () => module;
	}
}