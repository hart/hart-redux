import buildActions from './buildActions';
import { applyNamespaceToAll } from '../Namespace';

export default function prepareModule(namespace, { actionTypes, actions, selectors } = {}){
	selectors = applyNamespaceToAll(namespace, selectors);
	actions = buildActions(actionTypes, selectors, actions);
	
	return {
		[namespace]: {
			Actions: actions,
			...selectors
		}
	}
}