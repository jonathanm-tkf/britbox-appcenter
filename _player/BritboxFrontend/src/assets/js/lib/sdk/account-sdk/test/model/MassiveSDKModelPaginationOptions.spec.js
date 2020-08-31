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
    instance = new BritboxAccountApi10.MassiveSDKModelPaginationOptions();
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

  describe('MassiveSDKModelPaginationOptions', function() {
    it('should create an instance of MassiveSDKModelPaginationOptions', function() {
      // uncomment below and update the code to test MassiveSDKModelPaginationOptions
      //var instane = new BritboxAccountApi10.MassiveSDKModelPaginationOptions();
      //expect(instance).to.be.a(BritboxAccountApi10.MassiveSDKModelPaginationOptions);
    });

    it('should have the property order (base name: "order")', function() {
      // uncomment below and update the code to test the property order
      //var instane = new BritboxAccountApi10.MassiveSDKModelPaginationOptions();
      //expect(instance).to.be();
    });

    it('should have the property orderBy (base name: "orderBy")', function() {
      // uncomment below and update the code to test the property orderBy
      //var instane = new BritboxAccountApi10.MassiveSDKModelPaginationOptions();
      //expect(instance).to.be();
    });

    it('should have the property itemType (base name: "itemType")', function() {
      // uncomment below and update the code to test the property itemType
      //var instane = new BritboxAccountApi10.MassiveSDKModelPaginationOptions();
      //expect(instance).to.be();
    });

    it('should have the property pageSize (base name: "pageSize")', function() {
      // uncomment below and update the code to test the property pageSize
      //var instane = new BritboxAccountApi10.MassiveSDKModelPaginationOptions();
      //expect(instance).to.be();
    });

    it('should have the property maxRating (base name: "maxRating")', function() {
      // uncomment below and update the code to test the property maxRating
      //var instane = new BritboxAccountApi10.MassiveSDKModelPaginationOptions();
      //expect(instance).to.be();
    });

    it('should have the property completed (base name: "completed")', function() {
      // uncomment below and update the code to test the property completed
      //var instane = new BritboxAccountApi10.MassiveSDKModelPaginationOptions();
      //expect(instance).to.be();
    });

  });

}));
