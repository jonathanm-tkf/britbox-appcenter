/**
 * BRITBOX CONTENT API - 1.0
 * BRITBOX CONTENT API
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
    factory(root.expect, root.BritboxContentApi10);
  }
}(this, function(expect, BritboxContentApi10) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new BritboxContentApi10.MassiveSDKModelPageMetadata();
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

  describe('MassiveSDKModelPageMetadata', function() {
    it('should create an instance of MassiveSDKModelPageMetadata', function() {
      // uncomment below and update the code to test MassiveSDKModelPageMetadata
      //var instane = new BritboxContentApi10.MassiveSDKModelPageMetadata();
      //expect(instance).to.be.a(BritboxContentApi10.MassiveSDKModelPageMetadata);
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instane = new BritboxContentApi10.MassiveSDKModelPageMetadata();
      //expect(instance).to.be();
    });

    it('should have the property keywords (base name: "keywords")', function() {
      // uncomment below and update the code to test the property keywords
      //var instane = new BritboxContentApi10.MassiveSDKModelPageMetadata();
      //expect(instance).to.be();
    });

  });

}));
