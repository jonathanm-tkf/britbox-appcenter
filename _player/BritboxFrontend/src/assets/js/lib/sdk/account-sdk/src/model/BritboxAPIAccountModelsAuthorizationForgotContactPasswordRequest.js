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
    root.BritboxAccountApi10.BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest = factory(root.BritboxAccountApi10.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest model module.
   * @module model/BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest
   * @version 1.0
   */

  /**
   * Constructs a new <code>BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest</code>.
   * @alias module:model/BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest
   * @class
   * @param email {String} 
   */
  var exports = function(email) {
    var _this = this;

    _this['email'] = email;
  };

  /**
   * Constructs a <code>BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest} obj Optional instance to populate.
   * @return {module:model/BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest} The populated <code>BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} email
   */
  exports.prototype['email'] = undefined;



  return exports;
}));


