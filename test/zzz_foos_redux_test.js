import chai from 'chai';
const should = chai.should();

import { getModule } from '../src';
import { store } from './Foos/redux_setup';

const Foos = getModule("Foos");

describe('Foos', function() {
  describe('dispatch()', function() {
    it('should dispatch Foos Actions', function() {
        return store.dispatch(Foos.Actions.loadFoos).then(
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
        return store.dispatch(Foos.Actions.loadFoosWithError).then(
            res => {
               should.exist(res);
               should.exist(res.error);
            }, 
            err => {
                should.not.exist(err);
            }
        );
    });
  });
});
