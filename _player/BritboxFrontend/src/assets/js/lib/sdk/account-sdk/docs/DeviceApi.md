# BritboxAccountApi10.DeviceApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**generateDeviceActivationCode**](DeviceApi.md#generateDeviceActivationCode) | **POST** /v1/account/Device/generateDeviceActivationCode | 
[**registerDevice**](DeviceApi.md#registerDevice) | **POST** /v1/account/Device/registerDevice | 


<a name="generateDeviceActivationCode"></a>
# **generateDeviceActivationCode**
> BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse generateDeviceActivationCode(opts)



### Example
```javascript
var BritboxAccountApi10 = require('britbox_account_api___10');
var defaultClient = BritboxAccountApi10.ApiClient.instance;

// Configure API key authorization: AWSApiKeyAuth
var AWSApiKeyAuth = defaultClient.authentications['AWSApiKeyAuth'];
AWSApiKeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AWSApiKeyAuth.apiKeyPrefix = 'Token';

// Configure API key authorization: JWToken
var JWToken = defaultClient.authentications['JWToken'];
JWToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWToken.apiKeyPrefix = 'Token';

var apiInstance = new BritboxAccountApi10.DeviceApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeRequest() // BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.generateDeviceActivationCode(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeRequest**](BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse**](BritboxAPIAccountModelsDeviceGenerateDeviceActivationCodeResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="registerDevice"></a>
# **registerDevice**
> BritboxAPIAccountModelsDeviceRegisterDeviceResponse registerDevice(opts)



### Example
```javascript
var BritboxAccountApi10 = require('britbox_account_api___10');
var defaultClient = BritboxAccountApi10.ApiClient.instance;

// Configure API key authorization: AWSApiKeyAuth
var AWSApiKeyAuth = defaultClient.authentications['AWSApiKeyAuth'];
AWSApiKeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AWSApiKeyAuth.apiKeyPrefix = 'Token';

// Configure API key authorization: JWToken
var JWToken = defaultClient.authentications['JWToken'];
JWToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWToken.apiKeyPrefix = 'Token';

var apiInstance = new BritboxAccountApi10.DeviceApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsDeviceRegisterDeviceRequest() // BritboxAPIAccountModelsDeviceRegisterDeviceRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.registerDevice(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsDeviceRegisterDeviceRequest**](BritboxAPIAccountModelsDeviceRegisterDeviceRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsDeviceRegisterDeviceResponse**](BritboxAPIAccountModelsDeviceRegisterDeviceResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

