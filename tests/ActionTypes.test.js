import ActionTypes, { Defaults } from '../src/ActionTypes';

import chai from 'chai';
const should = chai.should();

describe('ActionTypes', function() {
  let actionTypes = null;

  describe('ActionTypes()', function() {
    it('should accept a model name', function() {
      actionTypes = ActionTypes("Foo");
    });

    it('should output a map of operation/actions', function(){
      should.exist(actionTypes.CREATE);
      should.exist(actionTypes.READ);
      should.exist(actionTypes.UPDATE);
      should.exist(actionTypes.DELETE);

      actionTypes.CREATE.REQUEST.should.equal("FOO_CREATE_REQUEST");
      actionTypes.CREATE.SUCCESS.should.equal("FOO_CREATE_SUCCESS");
      actionTypes.CREATE.ERROR.should.equal("FOO_CREATE_ERROR");

      actionTypes.READ.REQUEST.should.equal("FOO_READ_REQUEST");
      actionTypes.READ.SUCCESS.should.equal("FOO_READ_SUCCESS");
      actionTypes.READ.ERROR.should.equal("FOO_READ_ERROR");

      actionTypes.UPDATE.REQUEST.should.equal("FOO_UPDATE_REQUEST");
      actionTypes.UPDATE.SUCCESS.should.equal("FOO_UPDATE_SUCCESS");
      actionTypes.UPDATE.ERROR.should.equal("FOO_UPDATE_ERROR");

      actionTypes.DELETE.REQUEST.should.equal("FOO_DELETE_REQUEST");
      actionTypes.DELETE.SUCCESS.should.equal("FOO_DELETE_SUCCESS");
      actionTypes.DELETE.ERROR.should.equal("FOO_DELETE_ERROR");
    });

    it('should expose Defaults', function(){
      const defaultOperationNames = ["CREATE", "READ", "UPDATE", "DELETE"];
      const defaultActionNames = ["REQUEST", "SUCCESS", "ERROR"];

      should.exist(Defaults.operations);
      should.exist(Defaults.actions);

      Defaults.actions.should.deep.equal(defaultActionNames);
      Defaults.operations.should.deep.equal(defaultOperationNames);
    });

    it('should accept overriding defaults', function(){
      actionTypes = ActionTypes("Foo", [...Defaults.operations, "UPSERT"], ["REQUEST", "SUCCESS", "SORTA_WORKED"]);
    });

    it('should output a map of operations/actions based on overriden defaults', function(){
      should.exist(actionTypes.CREATE);
      should.exist(actionTypes.READ);
      should.exist(actionTypes.UPDATE);
      should.exist(actionTypes.DELETE);
      should.exist(actionTypes.UPSERT);

      actionTypes.CREATE.REQUEST.should.equal("FOO_CREATE_REQUEST");
      actionTypes.CREATE.SUCCESS.should.equal("FOO_CREATE_SUCCESS");
      actionTypes.CREATE.SORTA_WORKED.should.equal("FOO_CREATE_SORTA_WORKED");

      actionTypes.READ.REQUEST.should.equal("FOO_READ_REQUEST");
      actionTypes.READ.SUCCESS.should.equal("FOO_READ_SUCCESS");
      actionTypes.READ.SORTA_WORKED.should.equal("FOO_READ_SORTA_WORKED");

      actionTypes.UPDATE.REQUEST.should.equal("FOO_UPDATE_REQUEST");
      actionTypes.UPDATE.SUCCESS.should.equal("FOO_UPDATE_SUCCESS");
      actionTypes.UPDATE.SORTA_WORKED.should.equal("FOO_UPDATE_SORTA_WORKED");

      actionTypes.DELETE.REQUEST.should.equal("FOO_DELETE_REQUEST");
      actionTypes.DELETE.SUCCESS.should.equal("FOO_DELETE_SUCCESS");
      actionTypes.DELETE.SORTA_WORKED.should.equal("FOO_DELETE_SORTA_WORKED");

      actionTypes.UPSERT.REQUEST.should.equal("FOO_UPSERT_REQUEST");
      actionTypes.UPSERT.SUCCESS.should.equal("FOO_UPSERT_SUCCESS");
      actionTypes.UPSERT.SORTA_WORKED.should.equal("FOO_UPSERT_SORTA_WORKED");
    });
  });
});