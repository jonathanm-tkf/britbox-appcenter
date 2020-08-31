# BritboxContentApi10.ItemsApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getItem**](ItemsApi.md#getItem) | **GET** /v1/content/Items/{id} | 
[**getItemChildrenList**](ItemsApi.md#getItemChildrenList) | **GET** /v1/content/Items/{id}/children | 
[**getItemRelatedList**](ItemsApi.md#getItemRelatedList) | **GET** /v1/content/Items/{id}/related | 


<a name="getItem"></a>
# **getItem**
> BritboxAPIContentModelsItemsGetItemResponse getItem(id, opts)



### Example
```javascript
var BritboxContentApi10 = require('britbox_content_api___10');
var defaultClient = BritboxContentApi10.ApiClient.instance;

// Configure API key authorization: AWSApiKeyAuth
var AWSApiKeyAuth = defaultClient.authentications['AWSApiKeyAuth'];
AWSApiKeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AWSApiKeyAuth.apiKeyPrefix = 'Token';

var apiInstance = new BritboxContentApi10.ItemsApi();

var id = "id_example"; // String | 

var opts = { 
  'maxRating': "maxRating_example", // String | 
  'expand': "expand_example", // String | 
  'selectSeason': "selectSeason_example", // String | 
  'useCustomId': true, // Boolean | 
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
apiInstance.getItem(id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **maxRating** | **String**|  | [optional] 
 **expand** | **String**|  | [optional] 
 **selectSeason** | **String**|  | [optional] 
 **useCustomId** | **Boolean**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIContentModelsItemsGetItemResponse**](BritboxAPIContentModelsItemsGetItemResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getItemChildrenList"></a>
# **getItemChildrenList**
> BritboxAPIContentModelsItemsGetItemChildrenListResponse getItemChildrenList(id, opts)



### Example
```javascript
var BritboxContentApi10 = require('britbox_content_api___10');
var defaultClient = BritboxContentApi10.ApiClient.instance;

// Configure API key authorization: AWSApiKeyAuth
var AWSApiKeyAuth = defaultClient.authentications['AWSApiKeyAuth'];
AWSApiKeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AWSApiKeyAuth.apiKeyPrefix = 'Token';

var apiInstance = new BritboxContentApi10.ItemsApi();

var id = "id_example"; // String | 

var opts = { 
  'page': 56, // Number | 
  'pageSize': 56, // Number | 
  'maxRating': "maxRating_example", // String | 
  'order': "order_example", // String | 
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
apiInstance.getItemChildrenList(id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **page** | **Number**|  | [optional] 
 **pageSize** | **Number**|  | [optional] 
 **maxRating** | **String**|  | [optional] 
 **order** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIContentModelsItemsGetItemChildrenListResponse**](BritboxAPIContentModelsItemsGetItemChildrenListResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getItemRelatedList"></a>
# **getItemRelatedList**
> BritboxAPIContentModelsItemsGetItemRelatedListResponse getItemRelatedList(id, opts)



### Example
```javascript
var BritboxContentApi10 = require('britbox_content_api___10');
var defaultClient = BritboxContentApi10.ApiClient.instance;

// Configure API key authorization: AWSApiKeyAuth
var AWSApiKeyAuth = defaultClient.authentications['AWSApiKeyAuth'];
AWSApiKeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AWSApiKeyAuth.apiKeyPrefix = 'Token';

var apiInstance = new BritboxContentApi10.ItemsApi();

var id = "id_example"; // String | 

var opts = { 
  'page': 56, // Number | 
  'pageSize': 56, // Number | 
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
apiInstance.getItemRelatedList(id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **page** | **Number**|  | [optional] 
 **pageSize** | **Number**|  | [optional] 
 **maxRating** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **useCustomId** | **Boolean**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIContentModelsItemsGetItemRelatedListResponse**](BritboxAPIContentModelsItemsGetItemRelatedListResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

