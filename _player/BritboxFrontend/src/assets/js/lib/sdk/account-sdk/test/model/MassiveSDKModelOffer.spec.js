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
    instance = new BritboxAccountApi10.MassiveSDKModelOffer();
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

  describe('MassiveSDKModelOffer', function() {
    it('should create an instance of MassiveSDKModelOffer', function() {
      // uncomment below and update the code to test MassiveSDKModelOffer
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be.a(BritboxAccountApi10.MassiveSDKModelOffer);
    });

    it('should have the property deliveryType (base name: "deliveryType")', function() {
      // uncomment below and update the code to test the property deliveryType
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property resolution (base name: "resolution")', function() {
      // uncomment below and update the code to test the property resolution
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property ownership (base name: "ownership")', function() {
      // uncomment below and update the code to test the property ownership
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property availability (base name: "availability")', function() {
      // uncomment below and update the code to test the property availability
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property scopes (base name: "scopes")', function() {
      // uncomment below and update the code to test the property scopes
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property maxPlays (base name: "maxPlays")', function() {
      // uncomment below and update the code to test the property maxPlays
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property maxDownloads (base name: "maxDownloads")', function() {
      // uncomment below and update the code to test the property maxDownloads
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property rentalPeriod (base name: "rentalPeriod")', function() {
      // uncomment below and update the code to test the property rentalPeriod
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property playPeriod (base name: "playPeriod")', function() {
      // uncomment below and update the code to test the property playPeriod
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property exclusionRules (base name: "exclusionRules")', function() {
      // uncomment below and update the code to test the property exclusionRules
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property price (base name: "price")', function() {
      // uncomment below and update the code to test the property price
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property startDate (base name: "startDate")', function() {
      // uncomment below and update the code to test the property startDate
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property endDate (base name: "endDate")', function() {
      // uncomment below and update the code to test the property endDate
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property subscriptionCode (base name: "subscriptionCode")', function() {
      // uncomment below and update the code to test the property subscriptionCode
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

    it('should have the property customFields (base name: "customFields")', function() {
      // uncomment below and update the code to test the property customFields
      //var instane = new BritboxAccountApi10.MassiveSDKModelOffer();
      //expect(instance).to.be();
    });

  });

}));
