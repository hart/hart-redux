const defaultOperationNames = ["fetch", "create", "update", "delete"];
const defaultActionNames = ["request", "success", "error"];

export const createActionNames = (name, operationNames = defaultOperationNames, actionNames = defaultActionNames) => {

	operationNames = operationNames.map(x => x.toUpperCase());
	actionNames = actionName.map(x => x.toUpperCase());

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
		case Actions.fetch.success:
			return action.response.data.map(object => object.id);
		case Actions.create.success:
			return [...state, action.response.data.id];
		default:
			return state;
	}
};

const ByIdsReducer = Actions => (state = {}, action) => {
	switch (action.type) {
		// case for the complete list of objects returned
		case Actions.fetch.success:
			return action.response.data.reduce((objects, object) => {
				objects[object.id] = object;
				return objects;
			}, {});
		case Actions.create.success:
			let object = action.response.data;
			return Object.assign({}, state, {[object.id]: object});
		default:
			return state;
	}
};

const ObjectsLoadingReducer = Actions => (state = false, action) => {
	switch (action.type) {
		case Actions.fetch.request:
			return true;
		case Actions.fetch.success:
		case Actions.fetch.error:
			return false;
		default:
			return state;
	}
};

const HasObjectsReducer = Actions => (state = { hasObjects: null, error: null }, action) => {
	switch (action.type) {
		case Actions.fetch.success:
			return { hasObjects: action.response.data.length > 0, error: null };
		case Actions.fetch.error:
			return { hasObjects: null, error: action.response.error };
		default:
			return state;
	}
};

const ObjectCreateReducer = Actions => (state = false, action) => {
	switch (action.type) {
		case Actions.create.request:
			return true;
		case Actions.create.success:
		case Actions.create.error:
			return false;
		default:
			return state;
	}
};

const ObjectUpdateReducer = Actions => (state = false, action) => {
	switch (action.type) {
		case Actions.update.request:
			return true;
		case Actions.update.success:
		case Actions.update.error:
			return false;
		default:
			return state;
	}
};

const ObjectDeleteReducer = (state = false, action) => {
	switch (action.type) {
		case Actions.delete.request:
			return true;
		case Actions.delete.success:
		case Actions.delete.error:
			return false;
		default:
			return state;
	}
};

const getObjectIds = ({ allIds }) => (state) => state[allIds];
const getObjects = ({ allIds, byIds }) => (state) => state[allIds].map(id => state[byIds][id]);
const getObjectById = ({ byIds }) => (state, id) => state[byIds][id];
const areObjectsLoading = ({ areObjectsLoading }) => (state) => state[areObjectsLoading];
const hasObjects = ({ hasObjects }) => (state) => state[hasObjects]; //rename me, please
const isObjectCreating = ({ objectCreating }) => (state) => state[objectCreating];
const isObjectUpdating = ({ objectUpdating }) => (state) => state[objectUpdating];
const isObjectDeleting = ({ objectDeleting }) => (state) => state[objectDeleting];

export const getDefaultReducerNames = () => ({
	allIds: "allIds",
	byIds: "byIds",
	areObjectsLoading: "areObjectsLoading",
	hasObjects: "hasObjects",
	objectCreating: "objectCreating",
	objectUpdating: "objectUpdating",
	objectDeleting: "objectDeleting"
});

export const createNormalizedReducers = (Actions, ReducerNames = getDefaultReducerNames()) => {
	return {
		reducers: {
			[ReducerNames.allIds]: IdsReducer(Actions),
			[ReducerNames.byIds]: ByIdsReducer(Actions),
			[ReducerNames.areObjectsLoading]: ObjectsLoadingReducer(Actions),
			[ReducerNames.hasObjects]: HasObjectsReducer(Actions),
			[ReducerNames.objectCreating]: ObjectCreateReducer(Actions),
			[ReducerNames.objectUpdating]: ObjectUpdateReducer(Actions),
			[ReducerNames.objectDeleting]: ObjectDeleteReducer(Actions)
		},
		selectors: {
			getObjectIds: getObjectIds(ReducerNames),
			getObjects: getObjects(ReducerNames),
			getObjectById: getObjectById(ReducerNames),
			areObjectsLoading: areObjectsLoading(ReducerNames),
			hasObjects: hasObjects(ReducerNames),
			isObjectCreating: isObjectCreating(ReducerNames),
			isObjectUpdating: isObjectUpdating(ReducerNames),
			isObjectDeleting: isObjectDeleting(ReducerNames)
		}
	}
}


