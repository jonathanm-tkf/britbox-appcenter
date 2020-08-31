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
    define(['ApiClient', 'model/BritboxDataEvergentModelsForgotContactPasswordResponseMessageBaseResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./BritboxDataEvergentModelsForgotContactPasswordResponseMessageBaseResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxAccountApi10) {
      root.BritboxAccountApi10 = {};
    }
    root.BritboxAccountApi10.BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse = factory(root.BritboxAccountApi10.ApiClient, root.BritboxAccountApi10.BritboxDataEvergentModelsForgotContactPasswordResponseMessageBaseResponse);
  }
}(this, function(ApiClient, BritboxDataEvergentModelsForgotContactPasswordResponseMessageBaseResponse) {
  'use strict';




  /**
   * The BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse model module.
   * @module model/BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse
   * @version 1.0
   */

  /**
   * Constructs a new <code>BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse</code>.
   * @alias module:model/BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse} obj Optional instance to populate.
   * @return {module:model/BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse} The populated <code>BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('response')) {
        obj['response'] = BritboxDataEvergentModelsForgotContactPasswordResponseMessageBaseResponse.constructFromObject(data['response']);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/BritboxDataEvergentModelsForgotContactPasswordResponseMessageBaseResponse} response
   */
  exports.prototype['response'] = undefined;



  return exports;
}));


