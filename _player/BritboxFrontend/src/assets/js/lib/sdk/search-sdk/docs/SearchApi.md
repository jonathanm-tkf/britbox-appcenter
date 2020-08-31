# BritboxSearchApi10.SearchApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get**](SearchApi.md#get) | **GET** /v1/search | 


<a name="get"></a>
# **get**
> BritboxAPISearchModelsSearchGetResponse get(opts)



### Example
```javascript
var BritboxSearchApi10 = require('britbox_search_api___10');
var defaultClient = BritboxSearchApi10.ApiClient.instance;

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

var apiInstance = new BritboxSearchApi10.SearchApi();

var opts = { 
  'term': "term_example", // String | 
  'include': ["include_example"], // [String] | 
  'group': true, // Boolean | 
  'maxResults': 56, // Number | 
  'maxRating': "maxRating_example", // String | 
  'device': "device_example", // String | 
  'sub': "sub_example", // String | 
  'useCustomId': true, // Boolean | 
  'segments': ["segments_example"] // [String] | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.get(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **term** | **String**|  | [optional] 
 **include** | [**[String]**](String.md)|  | [optional] 
 **group** | **Boolean**|  | [optional] 
 **maxResults** | **Number**|  | [optional] 
 **maxRating** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **useCustomId** | **Boolean**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPISearchModelsSearchGetResponse**](BritboxAPISearchModelsSearchGetResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

