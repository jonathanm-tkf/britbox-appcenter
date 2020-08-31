# BritboxAccountApi10.AuthorizationApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authenticateCustomer**](AuthorizationApi.md#authenticateCustomer) | **POST** /v1/account/Authorization/authenticateCustomer | 
[**forgotContactPassword**](AuthorizationApi.md#forgotContactPassword) | **POST** /v1/account/Authorization/forgotContactPassword | 
[**getOAuthAccessToken**](AuthorizationApi.md#getOAuthAccessToken) | **POST** /v1/account/Authorization/getOAuthAccessToken | 
[**logoutCustomer**](AuthorizationApi.md#logoutCustomer) | **POST** /v1/account/Authorization/logout | 
[**refreshToken**](AuthorizationApi.md#refreshToken) | **POST** /v1/account/Authorization/refreshToken | 
[**refreshTokenD3**](AuthorizationApi.md#refreshTokenD3) | **POST** /v1/account/Authorization/refreshTokenD3 | 
[**validateContactPassword**](AuthorizationApi.md#validateContactPassword) | **POST** /v1/account/Authorization/validateContactPassword | 


<a name="authenticateCustomer"></a>
# **authenticateCustomer**
> BritboxAPIAccountModelsAuthorizationAuthenticateCustomerResponse authenticateCustomer(opts)



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

var apiInstance = new BritboxAccountApi10.AuthorizationApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsAuthorizationAuthenticateCustomerRequest() // BritboxAPIAccountModelsAuthorizationAuthenticateCustomerRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.authenticateCustomer(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsAuthorizationAuthenticateCustomerRequest**](BritboxAPIAccountModelsAuthorizationAuthenticateCustomerRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsAuthorizationAuthenticateCustomerResponse**](BritboxAPIAccountModelsAuthorizationAuthenticateCustomerResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="forgotContactPassword"></a>
# **forgotContactPassword**
> BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse forgotContactPassword(opts)



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

var apiInstance = new BritboxAccountApi10.AuthorizationApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest() // BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.forgotContactPassword(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest**](BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse**](BritboxAPIAccountModelsAuthorizationForgotContactPasswordResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="getOAuthAccessToken"></a>
# **getOAuthAccessToken**
> BritboxAPIAccountModelsAuthorizationGetOAuthAccessTokenResponse getOAuthAccessToken(opts)



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

var apiInstance = new BritboxAccountApi10.AuthorizationApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsAuthorizationGetOAuthAccessTokenRequest() // BritboxAPIAccountModelsAuthorizationGetOAuthAccessTokenRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getOAuthAccessToken(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsAuthorizationGetOAuthAccessTokenRequest**](BritboxAPIAccountModelsAuthorizationGetOAuthAccessTokenRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsAuthorizationGetOAuthAccessTokenResponse**](BritboxAPIAccountModelsAuthorizationGetOAuthAccessTokenResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="logoutCustomer"></a>
# **logoutCustomer**
> logoutCustomer()



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

var apiInstance = new BritboxAccountApi10.AuthorizationApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.logoutCustomer(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="refreshToken"></a>
# **refreshToken**
> BritboxAPIAccountModelsAuthorizationRefreshTokenResponse refreshToken(opts)



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

var apiInstance = new BritboxAccountApi10.AuthorizationApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsAuthorizationRefreshTokenRequest() // BritboxAPIAccountModelsAuthorizationRefreshTokenRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.refreshToken(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsAuthorizationRefreshTokenRequest**](BritboxAPIAccountModelsAuthorizationRefreshTokenRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsAuthorizationRefreshTokenResponse**](BritboxAPIAccountModelsAuthorizationRefreshTokenResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="refreshTokenD3"></a>
# **refreshTokenD3**
> BritboxAPIAccountModelsAuthorizationRefreshTokenResponse refreshTokenD3(opts)



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

var apiInstance = new BritboxAccountApi10.AuthorizationApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsAuthorizationRefreshTokenRequestD3() // BritboxAPIAccountModelsAuthorizationRefreshTokenRequestD3 | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.refreshTokenD3(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsAuthorizationRefreshTokenRequestD3**](BritboxAPIAccountModelsAuthorizationRefreshTokenRequestD3.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsAuthorizationRefreshTokenResponse**](BritboxAPIAccountModelsAuthorizationRefreshTokenResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="validateContactPassword"></a>
# **validateContactPassword**
> BritboxAPIAccountModelsAuthorizationValidateContactPasswordResponse validateContactPassword(opts)



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

var apiInstance = new BritboxAccountApi10.AuthorizationApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsAuthorizationValidateContactPasswordRequest() // BritboxAPIAccountModelsAuthorizationValidateContactPasswordRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.validateContactPassword(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsAuthorizationValidateContactPasswordRequest**](BritboxAPIAccountModelsAuthorizationValidateContactPasswordRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsAuthorizationValidateContactPasswordResponse**](BritboxAPIAccountModelsAuthorizationValidateContactPasswordResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

