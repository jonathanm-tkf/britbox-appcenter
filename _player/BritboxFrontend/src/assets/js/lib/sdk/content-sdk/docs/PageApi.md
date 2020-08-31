# BritboxContentApi10.PageApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getPage**](PageApi.md#getPage) | **GET** /v1/content/Page | 


<a name="getPage"></a>
# **getPage**
> BritboxAPIContentModelsPageGetPageResponse getPage(opts)



### Example
```javascript
var BritboxContentApi10 = require('britbox_content_api___10');
var defaultClient = BritboxContentApi10.ApiClient.instance;

// Configure API key authorization: AWSApiKeyAuth
var AWSApiKeyAuth = defaultClient.authentications['AWSApiKeyAuth'];
AWSApiKeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AWSApiKeyAuth.apiKeyPrefix = 'Token';

var apiInstance = new BritboxContentApi10.PageApi();

var opts = { 
  'path': "path_example", // String | 
  'useCustomId': true, // Boolean | 
  'listPageSize': 56, // Number | 
  'listPageSizeLarge': 56, // Number | 
  'maxListPrefetch': 56, // Number | 
  'itemDetailExpand': "itemDetailExpand_example", // String | 
  'itemDetailSelectSeason': "itemDetailSelectSeason_example", // String | 
  'textEntryFormat': "textEntryFormat_example", // String | 
  'maxRating': "maxRating_example", // String | 
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
apiInstance.getPage(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **String**|  | [optional] 
 **useCustomId** | **Boolean**|  | [optional] 
 **listPageSize** | **Number**|  | [optional] 
 **listPageSizeLarge** | **Number**|  | [optional] 
 **maxListPrefetch** | **Number**|  | [optional] 
 **itemDetailExpand** | **String**|  | [optional] 
 **itemDetailSelectSeason** | **String**|  | [optional] 
 **textEntryFormat** | **String**|  | [optional] 
 **maxRating** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIContentModelsPageGetPageResponse**](BritboxAPIContentModelsPageGetPageResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

