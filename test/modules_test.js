import chai from 'chai';
const should = chai.should();

import { getModule, getModules, registerModule } from '../src';

describe('modules.js', function(){
	const myModule = {
		awesome: true,
		status: "spectacular"
	}

	describe('registerModule', function(){
		it('should not throw an error', function(){
			registerModule("Foos", myModule);
		});
	});

	describe('getModule', function(){
		it('should return a value for a valid key', function(){
			should.exist(getModule('Foos'));
		});

		it('should return null for an invalid key', function(){
			should.not.exist(getModule('FoosTwo'));
		});

		it('should return the correct object for a key', function(){
			getModule('Foos').should.equal(myModule);
		});
	});

	describe('getModules', function(){
		it('should return an object of objects', function(){
			should.exist(getModules());
			getModules().should.be.a('object');
			
			should.exist(getModules().Foos);
			getModules().Foos.should.be.a('object');
			getModules().Foos.should.equal(myModule);
		});
	});
});