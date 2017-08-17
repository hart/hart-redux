import { namespace } from './constants';
import { selectors } from './reducers';
import { applyNamespaceToAll } from '../../src';

// passing the "slice" of state required for the selector
// child reducers and selectors should know nothing about the state shape above their own
const FoosSelectors = applyNamespaceToAll(namespace, selectors);

console.log("FoosSelectors (namespaced)", FoosSelectors);

export default FoosSelectors;