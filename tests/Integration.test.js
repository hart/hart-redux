import chai from 'chai';
const should = chai.should();

import { store, modules } from './Integration/redux';

const { Foos, Bars } = modules;

describe('Integration Test', function() {
  describe('dispatch()', function() {
    let foos = [{id: 1, name: "name1"}, {id: 2, name: "name2"}];
    it('should dispatch Foos Actions', function() {
        return store.dispatch(Foos.Actions.loadFoos(foos, "other")).then(
            res => {
                should.exist(res);
                should.not.exist(res.error);
            },
            err => {
                should.not.exist(err);
            }
        );
    });

    it('should handle Foos Actions error', function(){
        return store.dispatch(Foos.Actions.loadFoosWithError(foos, "something")).then(
            res => {
               should.exist(res);
               should.exist(res.error);
            }, 
            err => {
                should.not.exist(err);
            }
        );
    });

    it('should update the state with new Foos', function(){
        should.exist(Foos.getFoos(store.getState()));
        Foos.getFoos(store.getState()).should.be.a('array');
        Foos.getFoos(store.getState()).should.have.length(2);
        let foo1 = Foos.getFooById(store.getState(), 1);
        should.exist(foo1);
        foo1.name.should.equal("name1");
    });
    
  });
});
