import chai from 'chai';
const should = chai.should();

import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import StoreConfig from '../src/StoreConfig';

describe('StoreConfig', function(){

	const initialState = {};
	const reducers = {
		functionA: (state = "I'm another state", action) => {
			return state;
		},
		functionB: (state = "I'm yet another state", action) => {
			return state;
		}
	}
	const reducer = (state = "I'm state", action) => {
		return state;
	};

	let config = null;
	let store = null;

	describe('default constructor: new StoreConfig()', function(){
		it('should return a new StoreConfig object with default values', function(){
			config = new StoreConfig();
			should.exist(config);
		});
	});

	describe('constructor with parameters: new StoreConfig({})', function(){
		it('should return a new StoreConfig object configured with parameters', function(){
			config = new StoreConfig({
				middleware: [thunkMiddleware],
				initialState: initialState
			});
			should.exist(config);
		})
	});

	describe('addEnhancer()', function(){
		let returnedStoreConfig = null;

		it('should add an enhancer to the StoreConfig', function(){
			returnedStoreConfig = config.addEnhancer(window.devToolsExtension ? window.devToolsExtension() : f => f)
		});

		it('should return the StoreConfig object for chaining', function(){
			should.exist(returnedStoreConfig);
			returnedStoreConfig.should.equal(config);
		});
	});

	describe('addMiddleware()', function(){
		let returnedStoreConfig = null;

		it('should add a middleware function to the StoreConfig', function(){
			returnedStoreConfig = config.addMiddleware(promiseMiddleware);
		});

		it('should return the StoreConfig object for chaining', function(){
			should.exist(returnedStoreConfig);
			returnedStoreConfig.should.equal(config);
		});
	});

	describe('addReducer()', function(){
		let returnedStoreConfig = null;

		it('should add a reducer with a namespace to the StoreConfig', function(){
			returnedStoreConfig = config.addReducer("moduleA", reducer);
		});

		it('should return the StoreConfig object for chaining', function(){
			should.exist(returnedStoreConfig);
			returnedStoreConfig.should.equal(config);
		});

		it('should throw an error if adding a reducer to the same namespace', function(){
			should.throw(() => config.addReducer("moduleA", reducer));
		});		
	});

	describe('addReducers()', function(){
		let returnedStoreConfig = null;

		it('should add multiple reducers with a namespace to the StoreConfig', function(){
			returnedStoreConfig = config.addReducers("moduleB", reducers);
		});

		it('should return the StoreConfig object for chaining', function(){
			should.exist(returnedStoreConfig);
			returnedStoreConfig.should.equal(config);
		});

		it('should throw an error if adding a reducer to the same namespace', function(){
			should.throw(() => config.addReducers("moduleB", reducers));
		});	
	});

	describe('get()', function(){
		it('should return a copy of the StoreConfig\'s values', function(){
			const currentConfig = config.get();
			should.exist(currentConfig);
		});
	});

	describe('build()', function(){
		it('should build and return a new redux store', function(){
			store = config.build();
			should.exist(store);
			store.should.be.a('object');
		})
	});

	describe('store', function(){
		it('should have a non null initial state', function(){
			const state = store.getState()
			should.exist(state);
			state.should.be.a('object');
		});
	});
});