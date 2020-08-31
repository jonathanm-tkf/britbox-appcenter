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
    define(['ApiClient', 'model/MassiveSDKModelOptions'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./MassiveSDKModelOptions'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxAccountApi10) {
      root.BritboxAccountApi10 = {};
    }
    root.BritboxAccountApi10.MassiveSDKModelPaging = factory(root.BritboxAccountApi10.ApiClient, root.BritboxAccountApi10.MassiveSDKModelOptions);
  }
}(this, function(ApiClient, MassiveSDKModelOptions) {
  'use strict';




  /**
   * The MassiveSDKModelPaging model module.
   * @module model/MassiveSDKModelPaging
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelPaging</code>.
   * @alias module:model/MassiveSDKModelPaging
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>MassiveSDKModelPaging</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelPaging} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelPaging} The populated <code>MassiveSDKModelPaging</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
      if (data.hasOwnProperty('page')) {
        obj['page'] = ApiClient.convertToType(data['page'], 'Number');
      }
      if (data.hasOwnProperty('size')) {
        obj['size'] = ApiClient.convertToType(data['size'], 'Number');
      }
      if (data.hasOwnProperty('options')) {
        obj['options'] = MassiveSDKModelOptions.constructFromObject(data['options']);
      }
    }
    return obj;
  }

  /**
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;
  /**
   * @member {Number} page
   */
  exports.prototype['page'] = undefined;
  /**
   * @member {Number} size
   */
  exports.prototype['size'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelOptions} options
   */
  exports.prototype['options'] = undefined;



  return exports;
}));


