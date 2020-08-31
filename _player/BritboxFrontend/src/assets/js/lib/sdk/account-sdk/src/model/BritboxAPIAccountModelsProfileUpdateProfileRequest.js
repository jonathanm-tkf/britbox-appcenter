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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxAccountApi10) {
      root.BritboxAccountApi10 = {};
    }
    root.BritboxAccountApi10.BritboxAPIAccountModelsProfileUpdateProfileRequest = factory(root.BritboxAccountApi10.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The BritboxAPIAccountModelsProfileUpdateProfileRequest model module.
   * @module model/BritboxAPIAccountModelsProfileUpdateProfileRequest
   * @version 1.0
   */

  /**
   * Constructs a new <code>BritboxAPIAccountModelsProfileUpdateProfileRequest</code>.
   * @alias module:model/BritboxAPIAccountModelsProfileUpdateProfileRequest
   * @class
   * @param firstName {String} 
   * @param lastName {String} 
   * @param mobileNumber {String} 
   * @param alertNotificationEmail {Boolean} 
   */
  var exports = function(firstName, lastName, mobileNumber, alertNotificationEmail) {
    var _this = this;

    _this['firstName'] = firstName;
    _this['lastName'] = lastName;
    _this['mobileNumber'] = mobileNumber;
    _this['alertNotificationEmail'] = alertNotificationEmail;
  };

  /**
   * Constructs a <code>BritboxAPIAccountModelsProfileUpdateProfileRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BritboxAPIAccountModelsProfileUpdateProfileRequest} obj Optional instance to populate.
   * @return {module:model/BritboxAPIAccountModelsProfileUpdateProfileRequest} The populated <code>BritboxAPIAccountModelsProfileUpdateProfileRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('firstName')) {
        obj['firstName'] = ApiClient.convertToType(data['firstName'], 'String');
      }
      if (data.hasOwnProperty('lastName')) {
        obj['lastName'] = ApiClient.convertToType(data['lastName'], 'String');
      }
      if (data.hasOwnProperty('mobileNumber')) {
        obj['mobileNumber'] = ApiClient.convertToType(data['mobileNumber'], 'String');
      }
      if (data.hasOwnProperty('alertNotificationEmail')) {
        obj['alertNotificationEmail'] = ApiClient.convertToType(data['alertNotificationEmail'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {String} firstName
   */
  exports.prototype['firstName'] = undefined;
  /**
   * @member {String} lastName
   */
  exports.prototype['lastName'] = undefined;
  /**
   * @member {String} mobileNumber
   */
  exports.prototype['mobileNumber'] = undefined;
  /**
   * @member {Boolean} alertNotificationEmail
   */
  exports.prototype['alertNotificationEmail'] = undefined;



  return exports;
}));


