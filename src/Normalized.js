import _union from 'lodash/union';
import _without from 'lodash/without';

const IdsReducer = Actions => (state = [], action) => {
	switch (action.type) {
		// case for the complete list of objects returned
		case Actions.READ.SUCCESS:
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
		case Actions.READ.SUCCESS:
			if(action.response.data.id){
				//single item
				return Object.assign({}, state, { [action.response.data.id]: action.response.data });
			}else{
				//multiple items
				return Object.assign({}, state, action.response.data.reduce((objects, object) => {
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
		case Actions.READ.REQUEST:
			return true;
		case Actions.READ.SUCCESS:
		case Actions.READ.ERROR:
			return false;
		default:
			return state;
	}
};

const HasObjectsReducer = Actions => (state = { hasObjects: null, error: null }, action) => {
	switch (action.type) {
		case Actions.READ.SUCCESS:
			return { hasObjects: action.response.data.length > 0, error: null };
		case Actions.READ.ERROR:
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
		case Actions.READ.SUCCESS:
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

const PageMetadataReducer = Actions => (state = {}, action) => {
	switch (action.type) {
		case Actions.READ.SUCCESS:
			const metadata = action.response.metadata;
			if(metadata){
				return {
					itemsPerPage: metadata.itemsPerPage,
					totalItems: metadata.totalItems,
					totalPages: metadata.totalPages
				}
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
const getPageMetadata = ({ pages }) => (state) => state[pages];

const getDefaultReducerNames = () => ({
	allIds: "allIds",
	byIds: "byIds",
	areObjectsLoading: "areObjectsLoading",
	hasObjects: "hasObjects",
	objectCreating: "objectCreating",
	objectUpdating: "objectUpdating",
	objectDeleting: "objectDeleting",
	pageIds: "pageIds",
	pages: "pages"
});

const getDefaultSelectorNames = () => ({
	getObjectIds: "getObjectIds",
	getObjects: "getObjects",
	getObjectById: "getObjectById",
	getObjectsByIds: "getObjectsByIds",
	areObjectsLoading: "areObjectsLoading",
	hasObjects: "hasObjects",
	isObjectCreating: "isObjectCreating",
	isObjectUpdating: "isObjectUpdating",
	isObjectDeleting: "isObjectDeleting",
	getObjectIdsByPage: "getObjectIdsByPage",
	getPageMetadata: "getPageMetadata"
});

const build = (Actions, ReducerNames = getDefaultReducerNames(), SelectorNames = getDefaultSelectorNames()) => ({
	reducers: {
		[ReducerNames.allIds]: IdsReducer(Actions),
		[ReducerNames.byIds]: ByIdsReducer(Actions),
		[ReducerNames.areObjectsLoading]: ObjectsLoadingReducer(Actions),
		[ReducerNames.hasObjects]: HasObjectsReducer(Actions),
		[ReducerNames.objectCreating]: ObjectCreateReducer(Actions),
		[ReducerNames.objectUpdating]: ObjectUpdateReducer(Actions),
		[ReducerNames.objectDeleting]: ObjectDeleteReducer(Actions),
		[ReducerNames.pageIds]: PageIdsReducer(Actions),
		[ReducerNames.pages]: PageMetadataReducer(Actions)
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
		[SelectorNames.getObjectIdsByPage]: getObjectIdsByPage(ReducerNames),
		[SelectorNames.getPageMetadata]: getPageMetadata(ReducerNames)
	}
});

export default build;

export const Defaults = {
	reducerNames: getDefaultReducerNames(),
	selectorNames: getDefaultSelectorNames()
}