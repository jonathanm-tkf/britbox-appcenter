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
    instance = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
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

  describe('MassiveSDKModelSeasonsItem', function() {
    it('should create an instance of MassiveSDKModelSeasonsItem', function() {
      // uncomment below and update the code to test MassiveSDKModelSeasonsItem
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be.a(BritboxSearchApi10.MassiveSDKModelSeasonsItem);
    });

    it('should have the property images (base name: "images")', function() {
      // uncomment below and update the code to test the property images
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property releaseYear (base name: "releaseYear")', function() {
      // uncomment below and update the code to test the property releaseYear
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property availableEpisodeCount (base name: "availableEpisodeCount")', function() {
      // uncomment below and update the code to test the property availableEpisodeCount
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property seasonNumber (base name: "seasonNumber")', function() {
      // uncomment below and update the code to test the property seasonNumber
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property showId (base name: "showId")', function() {
      // uncomment below and update the code to test the property showId
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property episodeCount (base name: "episodeCount")', function() {
      // uncomment below and update the code to test the property episodeCount
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property offers (base name: "offers")', function() {
      // uncomment below and update the code to test the property offers
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property scopes (base name: "scopes")', function() {
      // uncomment below and update the code to test the property scopes
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property categories (base name: "categories")', function() {
      // uncomment below and update the code to test the property categories
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property customFields (base name: "customFields")', function() {
      // uncomment below and update the code to test the property customFields
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property customId (base name: "customId")', function() {
      // uncomment below and update the code to test the property customId
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property genres (base name: "genres")', function() {
      // uncomment below and update the code to test the property genres
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property maximumOfferEnd (base name: "maximumOfferEnd")', function() {
      // uncomment below and update the code to test the property maximumOfferEnd
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property media (base name: "media")', function() {
      // uncomment below and update the code to test the property media
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property shortDescription (base name: "shortDescription")', function() {
      // uncomment below and update the code to test the property shortDescription
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property contextualTitle (base name: "contextualTitle")', function() {
      // uncomment below and update the code to test the property contextualTitle
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property title (base name: "title")', function() {
      // uncomment below and update the code to test the property title
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property classification (base name: "classification")', function() {
      // uncomment below and update the code to test the property classification
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property totalUserRatings (base name: "totalUserRatings")', function() {
      // uncomment below and update the code to test the property totalUserRatings
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property path (base name: "path")', function() {
      // uncomment below and update the code to test the property path
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

    it('should have the property showTitle (base name: "showTitle")', function() {
      // uncomment below and update the code to test the property showTitle
      //var instane = new BritboxSearchApi10.MassiveSDKModelSeasonsItem();
      //expect(instance).to.be();
    });

  });

}));
