/**
 * BRITBOX ACCOUNT API - 1.0
 * BRITBOX ACCOUNT API
 *
 * OpenAPI spec version: 1.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.BritboxAccountApi10);
  }
}(this, function(expect, BritboxAccountApi10) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new BritboxAccountApi10.BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse', function() {
    it('should create an instance of BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse', function() {
      // uncomment below and update the code to test BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse
      //var instane = new BritboxAccountApi10.BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse();
      //expect(instance).to.be.a(BritboxAccountApi10.BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse);
    });

    it('should have the property externalResponse (base name: "externalResponse")', function() {
      // uncomment below and update the code to test the property externalResponse
      //var instane = new BritboxAccountApi10.BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse();
      //expect(instance).to.be();
    });

    it('should have the property errors (base name: "errors")', function() {
      // uncomment below and update the code to test the property errors
      //var instane = new BritboxAccountApi10.BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse();
      //expect(instance).to.be();
    });

    it('should have the property messages (base name: "messages")', function() {
      // uncomment below and update the code to test the property messages
      //var instane = new BritboxAccountApi10.BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse();
      //expect(instance).to.be();
    });

  });

}));
