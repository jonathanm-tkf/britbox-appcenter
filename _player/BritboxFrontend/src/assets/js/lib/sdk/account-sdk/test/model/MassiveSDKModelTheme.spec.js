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
    instance = new BritboxAccountApi10.MassiveSDKModelTheme();
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

  describe('MassiveSDKModelTheme', function() {
    it('should create an instance of MassiveSDKModelTheme', function() {
      // uncomment below and update the code to test MassiveSDKModelTheme
      //var instane = new BritboxAccountApi10.MassiveSDKModelTheme();
      //expect(instance).to.be.a(BritboxAccountApi10.MassiveSDKModelTheme);
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new BritboxAccountApi10.MassiveSDKModelTheme();
      //expect(instance).to.be();
    });

    it('should have the property colors (base name: "colors")', function() {
      // uncomment below and update the code to test the property colors
      //var instane = new BritboxAccountApi10.MassiveSDKModelTheme();
      //expect(instance).to.be();
    });

  });

}));
