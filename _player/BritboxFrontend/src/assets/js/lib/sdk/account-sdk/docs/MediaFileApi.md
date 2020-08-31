# BritboxAccountApi10.MediaFileApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getItemMediaFiles**](MediaFileApi.md#getItemMediaFiles) | **GET** /v1/account/MediaFile/{id} | 


<a name="getItemMediaFiles"></a>
# **getItemMediaFiles**
> BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse getItemMediaFiles(id, opts)



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

var apiInstance = new BritboxAccountApi10.MediaFileApi();

var id = "id_example"; // String | 

var opts = { 
  'device': "device_example", // String | 
  'sub': "sub_example", // String | 
  'segments': ["segments_example"], // [String] | 
  'useCustomId': false, // Boolean | 
  'pcToken': "pcToken_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getItemMediaFiles(id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 
 **useCustomId** | **Boolean**|  | [optional] [default to false]
 **pcToken** | **String**|  | [optional] 

### Return type

[**BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse**](BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

