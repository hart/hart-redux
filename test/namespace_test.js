import chai from 'chai';
const should = chai.should();

import { applyNamespace, applyNamespaceToAll } from '../src';

const state = { 
	person: {
		name: "Tester McTesterson", 
		age: 30
	},
	car: {
		make: "Chevrolet",
		model: "Corvette"
	}
};

const getName = state => state.name;
const getMake = state => state.make;
const getModel = state => state.model;

describe("applyNamespace", function(){

	it('should map a function to a function', function(){
		should.exist(applyNamespace("person", getName));
		applyNamespace("person", getName).should.be.a('function');
	});

	it('should map a function to a namespaced function', function(){
		let nameSelector = applyNamespace("person", getName);
		should.exist(nameSelector(state));
		nameSelector(state).should.be.a('string');
		nameSelector(state).should.equal(state.person.name);
	});
});

describe("applyNamespaceToAll", function(){

	it('should map an object map of functions to an object map of functions', function(){
		let carsSelectors = applyNamespaceToAll("car", {getMake, getModel});
		should.exist(carsSelectors);
		carsSelectors.should.be.a('object');
	});

	it('should map each function to a namespaced function', function(){
		let carsSelectors = applyNamespaceToAll("car", {getMake, getModel});
		
		should.exist(carsSelectors.getMake);
		should.exist(carsSelectors.getModel);

		should.exist(carsSelectors.getMake(state));
		should.exist(carsSelectors.getModel(state));

		carsSelectors.getMake(state).should.be.a('string');
		carsSelectors.getModel(state).should.be.a('string');

		carsSelectors.getMake(state).should.equal(state.car.make);
		carsSelectors.getModel(state).should.equal(state.car.model);
	});
});