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
    instance = new BritboxSearchApi10.MassiveSDKModelClassification();
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

  describe('MassiveSDKModelClassification', function() {
    it('should create an instance of MassiveSDKModelClassification', function() {
      // uncomment below and update the code to test MassiveSDKModelClassification
      //var instane = new BritboxSearchApi10.MassiveSDKModelClassification();
      //expect(instance).to.be.a(BritboxSearchApi10.MassiveSDKModelClassification);
    });

    it('should have the property code (base name: "code")', function() {
      // uncomment below and update the code to test the property code
      //var instane = new BritboxSearchApi10.MassiveSDKModelClassification();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new BritboxSearchApi10.MassiveSDKModelClassification();
      //expect(instance).to.be();
    });

    it('should have the property advisoryText (base name: "advisoryText")', function() {
      // uncomment below and update the code to test the property advisoryText
      //var instane = new BritboxSearchApi10.MassiveSDKModelClassification();
      //expect(instance).to.be();
    });

    it('should have the property level (base name: "level")', function() {
      // uncomment below and update the code to test the property level
      //var instane = new BritboxSearchApi10.MassiveSDKModelClassification();
      //expect(instance).to.be();
    });

    it('should have the property system (base name: "system")', function() {
      // uncomment below and update the code to test the property system
      //var instane = new BritboxSearchApi10.MassiveSDKModelClassification();
      //expect(instance).to.be();
    });

    it('should have the property images (base name: "images")', function() {
      // uncomment below and update the code to test the property images
      //var instane = new BritboxSearchApi10.MassiveSDKModelClassification();
      //expect(instance).to.be();
    });

  });

}));
