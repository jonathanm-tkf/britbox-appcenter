# BritboxContentApi10.ConfigApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getConfig**](ConfigApi.md#getConfig) | **GET** /v1/content/Config | 


<a name="getConfig"></a>
# **getConfig**
> BritboxAPIContentModelsConfigGetConfigResponse getConfig(opts)



### Example
```javascript
var BritboxContentApi10 = require('britbox_content_api___10');
var defaultClient = BritboxContentApi10.ApiClient.instance;

// Configure API key authorization: AWSApiKeyAuth
var AWSApiKeyAuth = defaultClient.authentications['AWSApiKeyAuth'];
AWSApiKeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AWSApiKeyAuth.apiKeyPrefix = 'Token';

var apiInstance = new BritboxContentApi10.ConfigApi();

var opts = { 
  'include': ["include_example"], // [String] | 
  'device': "device_example", // String | 
  'sub': "sub_example", // String | 
  'segments': ["segments_example"] // [String] | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getConfig(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **include** | [**[String]**](String.md)|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIContentModelsConfigGetConfigResponse**](BritboxAPIContentModelsConfigGetConfigResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

