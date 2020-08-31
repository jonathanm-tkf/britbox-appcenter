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
    define(['ApiClient', 'model/BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeRequest', 'model/BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse', 'model/BritboxAPIAccountModelsDeviceRegisterDeviceRequest', 'model/BritboxAPIAccountModelsDeviceRegisterDeviceResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeRequest'), require('../model/BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse'), require('../model/BritboxAPIAccountModelsDeviceRegisterDeviceRequest'), require('../model/BritboxAPIAccountModelsDeviceRegisterDeviceResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxAccountApi10) {
      root.BritboxAccountApi10 = {};
    }
    root.BritboxAccountApi10.DeviceApi = factory(root.BritboxAccountApi10.ApiClient, root.BritboxAccountApi10.BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeRequest, root.BritboxAccountApi10.BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse, root.BritboxAccountApi10.BritboxAPIAccountModelsDeviceRegisterDeviceRequest, root.BritboxAccountApi10.BritboxAPIAccountModelsDeviceRegisterDeviceResponse);
  }
}(this, function(ApiClient, BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeRequest, BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse, BritboxAPIAccountModelsDeviceRegisterDeviceRequest, BritboxAPIAccountModelsDeviceRegisterDeviceResponse) {
  'use strict';

  /**
   * Device service.
   * @module api/DeviceApi
   * @version 1.0
   */

  /**
   * Constructs a new DeviceApi. 
   * @alias module:api/DeviceApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the generateDeviceActivationCode operation.
     * @callback module:api/DeviceApi~generateDeviceActivationCodeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeRequest} opts.request 
     * @param {module:api/DeviceApi~generateDeviceActivationCodeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse}
     */
    this.generateDeviceActivationCode = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['request'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['AWSApiKeyAuth', 'JWToken'];
      var contentTypes = ['application/json-patch+json', 'application/json', 'text/json', 'application/_*+json'];
      var accepts = ['text/plain', 'application/json', 'text/json'];
      var returnType = BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse;

      return this.apiClient.callApi(
        '/v1/account/Device/generateDeviceActivationCode', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the registerDevice operation.
     * @callback module:api/DeviceApi~registerDeviceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BritboxAPIAccountModelsDeviceRegisterDeviceResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/BritboxAPIAccountModelsDeviceRegisterDeviceRequest} opts.request 
     * @param {module:api/DeviceApi~registerDeviceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BritboxAPIAccountModelsDeviceRegisterDeviceResponse}
     */
    this.registerDevice = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['request'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['AWSApiKeyAuth', 'JWToken'];
      var contentTypes = ['application/json-patch+json', 'application/json', 'text/json', 'application/_*+json'];
      var accepts = ['text/plain', 'application/json', 'text/json'];
      var returnType = BritboxAPIAccountModelsDeviceRegisterDeviceResponse;

      return this.apiClient.callApi(
        '/v1/account/Device/registerDevice', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
