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
    instance = new BritboxContentApi10.MassiveSDKModelAppConfig();
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

  describe('MassiveSDKModelAppConfig', function() {
    it('should create an instance of MassiveSDKModelAppConfig', function() {
      // uncomment below and update the code to test MassiveSDKModelAppConfig
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be.a(BritboxContentApi10.MassiveSDKModelAppConfig);
    });

    it('should have the property classification (base name: "classification")', function() {
      // uncomment below and update the code to test the property classification
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be();
    });

    it('should have the property subscription (base name: "subscription")', function() {
      // uncomment below and update the code to test the property subscription
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be();
    });

    it('should have the property playback (base name: "playback")', function() {
      // uncomment below and update the code to test the property playback
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be();
    });

    it('should have the property general (base name: "general")', function() {
      // uncomment below and update the code to test the property general
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be();
    });

    it('should have the property navigation (base name: "navigation")', function() {
      // uncomment below and update the code to test the property navigation
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be();
    });

    it('should have the property sitemap (base name: "sitemap")', function() {
      // uncomment below and update the code to test the property sitemap
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be();
    });

    it('should have the property display (base name: "display")', function() {
      // uncomment below and update the code to test the property display
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be();
    });

    it('should have the property i18n (base name: "i18n")', function() {
      // uncomment below and update the code to test the property i18n
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be();
    });

    it('should have the property linear (base name: "linear")', function() {
      // uncomment below and update the code to test the property linear
      //var instane = new BritboxContentApi10.MassiveSDKModelAppConfig();
      //expect(instance).to.be();
    });

  });

}));
