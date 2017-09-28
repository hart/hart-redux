import chai from 'chai';
const should = chai.should();

import Namespace, { applyNamespace, applyNamespaceToAll, all } from '../src/Namespace'

const state = { 
  person: {
    name: "Tester McTesterson", 
    age: 30
  },
  car: {
    make: "Chevrolet",
    model: "Corvette"
  },
  countries: {
    "us": {
      id: "us",
      name: "United States"
    }
  }
};

const getName = state => state.name;
const getMake = state => state.make;
const getModel = state => state.model;
const getCountry = (state, id) => state[id];

describe('Namespace', function(){
  describe("applyNamespace", function(){

    it('should be equal to the default export', function(){
      applyNamespace.should.equal(Namespace);
    });

    it('should map a function to a function', function(){
      const getNameSelector = applyNamespace("person", getName)
      should.exist(getNameSelector);
      getNameSelector.should.be.a('function');
    });

    it('should map a function to a namespaced function', function(){
      const getNameSelector = applyNamespace("person", getName);
      const name = getNameSelector(state);
      should.exist(name);
      name.should.equal(state.person.name);
    });

    it('should map extra parameters to the namespaced function', function(){
      const getCountrySelector = applyNamespace("countries", getCountry);
      const country = getCountrySelector(state, "us");
      should.exist(country);
      country.should.equal(state.countries["us"]);
    })
  });

  describe("applyNamespaceToAll", function(){

    it('should be equal to the "all" export', function(){
      applyNamespaceToAll.should.equal(all);
    });

    it('should map an object map of functions to an object map of functions', function(){
      let carsSelectors = applyNamespaceToAll("car", {getMake, getModel});
      should.exist(carsSelectors);
      carsSelectors.should.be.a('object');
    });

    it('should map each function to a namespaced function', function(){
      let carsSelectors = applyNamespaceToAll("car", {getMake, getModel});
      
      should.exist(carsSelectors.getMake);
      should.exist(carsSelectors.getModel);

      const make = carsSelectors.getMake(state);
      const model = carsSelectors.getModel(state);

      should.exist(make);
      should.exist(model);

      make.should.equal(state.car.make);
      model.should.equal(state.car.model);
    });
  });
});