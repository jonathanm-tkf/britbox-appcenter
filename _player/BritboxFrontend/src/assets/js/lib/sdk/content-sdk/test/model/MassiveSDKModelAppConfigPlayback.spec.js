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
    instance = new BritboxContentApi10.MassiveSDKModelAppConfigPlayback();
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

  describe('MassiveSDKModelAppConfigPlayback', function() {
    it('should create an instance of MassiveSDKModelAppConfigPlayback', function() {
      // uncomment below and update the code to test MassiveSDKModelAppConfigPlayback
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfigPlayback();
      //expect(instance).to.be.a(BritboxContentApi10.MassiveSDKModelAppConfigPlayback);
    });

    it('should have the property heartbeatFrequency (base name: "heartbeatFrequency")', function() {
      // uncomment below and update the code to test the property heartbeatFrequency
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfigPlayback();
      //expect(instance).to.be();
    });

    it('should have the property viewEventPoints (base name: "viewEventPoints")', function() {
      // uncomment below and update the code to test the property viewEventPoints
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfigPlayback();
      //expect(instance).to.be();
    });

    it('should have the property chainPlaySqueezeback (base name: "chainPlaySqueezeback")', function() {
      // uncomment below and update the code to test the property chainPlaySqueezeback
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfigPlayback();
      //expect(instance).to.be();
    });

    it('should have the property chainPlayTimeout (base name: "chainPlayTimeout")', function() {
      // uncomment below and update the code to test the property chainPlayTimeout
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfigPlayback();
      //expect(instance).to.be();
    });

    it('should have the property chainPlayCountdown (base name: "chainPlayCountdown")', function() {
      // uncomment below and update the code to test the property chainPlayCountdown
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfigPlayback();
      //expect(instance).to.be();
    });

  });

}));
