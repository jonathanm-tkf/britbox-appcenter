/**
 * BRITBOX SEARCH API - 1.0
 * BRITBOX SEARCH API
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
    factory(root.expect, root.BritboxSearchApi10);
  }
}(this, function(expect, BritboxSearchApi10) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new BritboxSearchApi10.MassiveSDKModelContinueWatchingListData();
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

  describe('MassiveSDKModelContinueWatchingListData', function() {
    it('should create an instance of MassiveSDKModelContinueWatchingListData', function() {
      // uncomment below and update the code to test MassiveSDKModelContinueWatchingListData
      //var instane = new BritboxSearchApi10.MassiveSDKModelContinueWatchingListData();
      //expect(instance).to.be.a(BritboxSearchApi10.MassiveSDKModelContinueWatchingListData);
    });

    it('should have the property itemInclusions (base name: "itemInclusions")', function() {
      // uncomment below and update the code to test the property itemInclusions
      //var instane = new BritboxSearchApi10.MassiveSDKModelContinueWatchingListData();
      //expect(instance).to.be();
    });

  });

}));
