//the combined reducer for this module
import { reducer } from './reducers';

// import and export the selectors
import Selectors from './selectors';

// top-level namespace
import { namespace } from './constants';

// actions for other components to use
import * as Actions from './actions';

const Foos = Object.assign({
	/* required */
	reducer, // must export the combined reducer
	namespace, // must export the namespace
	/* optional */
	Actions
}, Selectors);

export default Foos;