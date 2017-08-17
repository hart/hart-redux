import chai from 'chai';
const should = chai.should();

import { getModule } from '../src';
import { store } from './Foos/redux_setup';

console.log("Store", store);

console.log("Initial State", store.getState());

store.subscribe(() => {
    console.log("State: ", store.getState());
});

const Foos = getModule("Foos");

console.log("Load Foos");

describe('Foos', function() {
  describe('dispatch()', function() {
    it('should dispatch Foos Actions', function(done) {
        store.dispatch(Foos.Actions.loadFoos).then(res => {
            console.log("Done", res);
            done();
        },
        err => {
            console.log("Done with err from api", err);
            done();
        });
    });
  });
});
