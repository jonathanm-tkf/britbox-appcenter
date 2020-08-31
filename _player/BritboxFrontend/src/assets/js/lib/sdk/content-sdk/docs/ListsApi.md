# BritboxContentApi10.ListsApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getList**](ListsApi.md#getList) | **GET** /v1/content/Lists/{id} | 
[**getLists**](ListsApi.md#getLists) | **GET** /v1/content/Lists | 


<a name="getList"></a>
# **getList**
> BritboxAPIContentModelsListsGetListResponse getList(id, opts)



### Example
```javascript
var BritboxContentApi10 = require('britbox_content_api___10');
var defaultClient = BritboxContentApi10.ApiClient.instance;

// Configure API key authorization: AWSApiKeyAuth
var AWSApiKeyAuth = defaultClient.authentications['AWSApiKeyAuth'];
AWSApiKeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AWSApiKeyAuth.apiKeyPrefix = 'Token';

var apiInstance = new BritboxContentApi10.ListsApi();

var id = "id_example"; // String | 

var opts = { 
  'page': 56, // Number | 
  'pageSize': 56, // Number | 
  'maxRating': "maxRating_example", // String | 
  'order': "order_example", // String | 
  'orderBy': "orderBy_example", // String | 
  'param': "param_example", // String | 
  'itemType': "itemType_example", // String | 
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
apiInstance.getList(id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **page** | **Number**|  | [optional] 
 **pageSize** | **Number**|  | [optional] 
 **maxRating** | **String**|  | [optional] 
 **order** | **String**|  | [optional] 
 **orderBy** | **String**|  | [optional] 
 **param** | **String**|  | [optional] 
 **itemType** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **useCustomId** | **Boolean**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIContentModelsListsGetListResponse**](BritboxAPIContentModelsListsGetListResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getLists"></a>
# **getLists**
> BritboxAPIContentModelsListsGetListsResponse getLists(opts)



### Example
```javascript
var BritboxContentApi10 = require('britbox_content_api___10');
var defaultClient = BritboxContentApi10.ApiClient.instance;

// Configure API key authorization: AWSApiKeyAuth
var AWSApiKeyAuth = defaultClient.authentications['AWSApiKeyAuth'];
AWSApiKeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AWSApiKeyAuth.apiKeyPrefix = 'Token';

var apiInstance = new BritboxContentApi10.ListsApi();

var opts = { 
  'ids': ["ids_example"], // [String] | 
  'pageSize': 56, // Number | 
  'maxRating': "maxRating_example", // String | 
  'order': "order_example", // String | 
  'orderBy': "orderBy_example", // String | 
  'itemType': "itemType_example", // String | 
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
apiInstance.getLists(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ids** | [**[String]**](String.md)|  | [optional] 
 **pageSize** | **Number**|  | [optional] 
 **maxRating** | **String**|  | [optional] 
 **order** | **String**|  | [optional] 
 **orderBy** | **String**|  | [optional] 
 **itemType** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIContentModelsListsGetListsResponse**](BritboxAPIContentModelsListsGetListsResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

