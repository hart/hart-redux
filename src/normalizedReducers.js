import _union from 'lodash/union';
import _without from 'lodash/without';

const defaultOperationNames = ["fetch", "create", "update", "delete"];
const defaultActionNames = ["request", "success", "error"];

export const createActionNames = (name, operationNames = defaultOperationNames, actionNames = defaultActionNames) => {

	operationNames = operationNames.map(x => x.toUpperCase());
	actionNames = actionNames.map(x => x.toUpperCase());

	let objectName = name.toUpperCase();

	return operationNames.reduce((actions, operationName) => {

		let action = actionNames.reduce((constants, actionName) => {
			let constant = `${objectName}_${operationName}_${actionName}`;

			constants[actionName] = constant;

			return constants;
		}, {});

		actions[operationName] = action;

		return actions;
	} , {});
}

const IdsReducer = Actions => (state = [], action) => {
	switch (action.type) {
		// case for the complete list of objects returned
		case Actions.FETCH.SUCCESS:
			if(action.response.data.id){
				//single item
				return _union(state, [action.response.data.id]);
			}else{
				//multiple items
				return _union(state, action.response.data.map(object => object.id));
			}
		case Actions.CREATE.SUCCESS:
			return [...state, action.response.data.id];
		case Actions.DELETE.SUCCESS:
			return _without(state, action.response.data.id);
		default:
			return state;
	}
};

const ByIdsReducer = Actions => (state = {}, action) => {
	switch (action.type) {
		// case for the complete list of objects returned
		case Actions.FETCH.SUCCESS:
			if(action.response.data.id){
				//single item
				return Object.assign(state, { [action.response.data.id]: action.response.data });
			}else{
				//multiple items
				return Object.assign(state ,action.response.data.reduce((objects, object) => {
					objects[object.id] = object;
					return objects;
				}, {}));
			}
		case Actions.CREATE.SUCCESS:
		case Actions.UPDATE.SUCCESS:
			let object = action.response.data;
			return Object.assign({}, state, {[object.id]: object});
		case Actions.DELETE.SUCCESS:
			let newState = Object.assign({}, state)
			delete newState[action.response.data.id];
			return newState;
		default:
			return state;
	}
};

const ObjectsLoadingReducer = Actions => (state = false, action) => {
	switch (action.type) {
		case Actions.FETCH.REQUEST:
			return true;
		case Actions.FETCH.SUCCESS:
		case Actions.FETCH.ERROR:
			return false;
		default:
			return state;
	}
};

const HasObjectsReducer = Actions => (state = { hasObjects: null, error: null }, action) => {
	switch (action.type) {
		case Actions.FETCH.SUCCESS:
			return { hasObjects: action.response.data.length > 0, error: null };
		case Actions.FETCH.ERROR:
			return { hasObjects: null, error: action.response.error };
		default:
			return state;
	}
};

const ObjectCreateReducer = Actions => (state = false, action) => {
	switch (action.type) {
		case Actions.CREATE.REQUEST:
			return true;
		case Actions.CREATE.SUCCESS:
		case Actions.CREATE.ERROR:
			return false;
		default:
			return state;
	}
};

const ObjectUpdateReducer = Actions => (state = false, action) => {
	switch (action.type) {
		case Actions.UPDATE.REQUEST:
			return true;
		case Actions.UPDATE.SUCCESS:
		case Actions.UPDATE.ERROR:
			return false;
		default:
			return state;
	}
};

const ObjectDeleteReducer = Actions => (state = false, action) => {
	switch (action.type) {
		case Actions.DELETE.REQUEST:
			return true;
		case Actions.DELETE.SUCCESS:
		case Actions.DELETE.ERROR:
			return false;
		default:
			return state;
	}
};

const PageIdsReducer = Actions => (state = {}, action) => {
	switch (action.type) {
		case Actions.FETCH.SUCCESS:
			const metadata = action.response.metadata;
			if(metadata && metadata.pageIndex != null){
				const ids = action.response.data.map(item => item.id);
				return Object.assign({}, state, { [metadata.pageIndex]: ids })
			}else{
				return state;
			}
		default:
			return state;
	}
}

const getObjectIds = ({ allIds }) => (state) => state[allIds];
const getObjects = ({ allIds, byIds }) => (state) => state[allIds].map(id => state[byIds][id]);
const getObjectById = ({ byIds }) => (state, id) => state[byIds][id];
const getObjectsByIds = ({ byIds }) => (state, ids) => ids.map(id => state[byIds][id]);
const areObjectsLoading = ({ areObjectsLoading }) => (state) => state[areObjectsLoading];
const hasObjects = ({ hasObjects }) => (state) => state[hasObjects]; //rename me, please
const isObjectCreating = ({ objectCreating }) => (state) => state[objectCreating];
const isObjectUpdating = ({ objectUpdating }) => (state) => state[objectUpdating];
const isObjectDeleting = ({ objectDeleting }) => (state) => state[objectDeleting];
const getObjectIdsByPage = ({ pageIds }) => (state, pageIndex) => state[pageIds][pageIndex];

export const getDefaultReducerNames = () => ({
	allIds: "allIds",
	byIds: "byIds",
	areObjectsLoading: "areObjectsLoading",
	hasObjects: "hasObjects",
	objectCreating: "objectCreating",
	objectUpdating: "objectUpdating",
	objectDeleting: "objectDeleting",
	pageIds: "pageIds"
});

export const getDefaultSelectorNames = () => ({
	getObjectIds: "getObjectIds",
	getObjects: "getObjects",
	getObjectById: "getObjectById",
	getObjectsByIds: "getObjectsByIds",
	areObjectsLoading: "areObjectsLoading",
	hasObjects: "hasObjects",
	isObjectCreating: "isObjectCreating",
	isObjectUpdating: "isObjectUpdating",
	isObjectDeleting: "isObjectDeleting",
	getObjectIdsByPage: "getObjectIdsByPage"
});

export const createNormalizedReducers = ( Actions, ReducerNames = getDefaultReducerNames(), SelectorNames = getDefaultSelectorNames()) => {
	return {
		reducers: {
			[ReducerNames.allIds]: IdsReducer(Actions),
			[ReducerNames.byIds]: ByIdsReducer(Actions),
			[ReducerNames.areObjectsLoading]: ObjectsLoadingReducer(Actions),
			[ReducerNames.hasObjects]: HasObjectsReducer(Actions),
			[ReducerNames.objectCreating]: ObjectCreateReducer(Actions),
			[ReducerNames.objectUpdating]: ObjectUpdateReducer(Actions),
			[ReducerNames.objectDeleting]: ObjectDeleteReducer(Actions),
			[ReducerNames.pageIds]: PageIdsReducer(Actions)
		},
		selectors: {
			[SelectorNames.getObjectIds]: getObjectIds(ReducerNames),
			[SelectorNames.getObjects]: getObjects(ReducerNames),
			[SelectorNames.getObjectById]: getObjectById(ReducerNames),
			[SelectorNames.getObjectsByIds]: getObjectsByIds(ReducerNames),
			[SelectorNames.areObjectsLoading]: areObjectsLoading(ReducerNames),
			[SelectorNames.hasObjects]: hasObjects(ReducerNames),
			[SelectorNames.isObjectCreating]: isObjectCreating(ReducerNames),
			[SelectorNames.isObjectUpdating]: isObjectUpdating(ReducerNames),
			[SelectorNames.isObjectDeleting]: isObjectDeleting(ReducerNames),
			[SelectorNames.getObjectIdsByPage]: getObjectIdsByPage(ReducerNames)
		}
	}
}


