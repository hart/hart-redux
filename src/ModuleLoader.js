export default class ModuleLoader {
	constructor(StoreConfig, onModuleLoaded){
		this.load = (module) => {
			if(!module) throw new Error("Can not load null module");
			if(!module.namespace) throw new Error(`Module must have a non-null namespace: ${module.namespace}`);
			if(module.reducer && module.reducers) throw new Error(`Module can not have both reducer and reducers properties: ${module}`);

			if(module.reducer) StoreConfig.addReducer(module.namespace, module.reducer);
			else if(module.reducers) StoreConfig.addReducers(module.namespace, module.reducers);
			
			if(onModuleLoaded) onModuleLoaded(module.namespace, module);

			return this;
		}
	}
}