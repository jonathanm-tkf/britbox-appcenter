# BritboxAccountApi10.CustomerApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addSubscription**](CustomerApi.md#addSubscription) | **POST** /v1/account/Customer/subscription | 
[**getProducts**](CustomerApi.md#getProducts) | **GET** /v1/account/Customer/products | 
[**register**](CustomerApi.md#register) | **POST** /v1/account/Customer/register | 


<a name="addSubscription"></a>
# **addSubscription**
> BritboxAPIAccountModelsCustomerAddSubscriptionResponse addSubscription(opts)



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

var apiInstance = new BritboxAccountApi10.CustomerApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsCustomerAddSubscriptionRequest() // BritboxAPIAccountModelsCustomerAddSubscriptionRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.addSubscription(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsCustomerAddSubscriptionRequest**](BritboxAPIAccountModelsCustomerAddSubscriptionRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsCustomerAddSubscriptionResponse**](BritboxAPIAccountModelsCustomerAddSubscriptionResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="getProducts"></a>
# **getProducts**
> BritboxAPIAccountModelsCustomerGetProductsResponse getProducts(opts)



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

var apiInstance = new BritboxAccountApi10.CustomerApi();

var opts = { 
  'dmaID': "dmaID_example", // String | 
  'countryCode': "countryCode_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProducts(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dmaID** | **String**|  | [optional] 
 **countryCode** | **String**|  | [optional] 

### Return type

[**BritboxAPIAccountModelsCustomerGetProductsResponse**](BritboxAPIAccountModelsCustomerGetProductsResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="register"></a>
# **register**
> BritboxAPIAccountModelsCustomerAddSubscriptionResponse register(opts)



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

var apiInstance = new BritboxAccountApi10.CustomerApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsCustomerCreateUserV2Request() // BritboxAPIAccountModelsCustomerCreateUserV2Request | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.register(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsCustomerCreateUserV2Request**](BritboxAPIAccountModelsCustomerCreateUserV2Request.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsCustomerAddSubscriptionResponse**](BritboxAPIAccountModelsCustomerAddSubscriptionResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

