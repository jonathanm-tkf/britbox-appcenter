# BritboxAccountApi10.ProfileApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**bookmarkItem**](ProfileApi.md#bookmarkItem) | **PUT** /v1/account/Profile/bookmarks/{itemId} | 
[**checkParentalControl**](ProfileApi.md#checkParentalControl) | **GET** /v1/account/Profile/parentalcontrol/canstream | 
[**deleteItemBookmark**](ProfileApi.md#deleteItemBookmark) | **DELETE** /v1/account/Profile/bookmarks/{itemId} | 
[**deleteWatched**](ProfileApi.md#deleteWatched) | **DELETE** /v1/account/Profile/watched | 
[**getBookmarkList**](ProfileApi.md#getBookmarkList) | **GET** /v1/account/Profile/bookmarks/list | 
[**getBookmarks**](ProfileApi.md#getBookmarks) | **GET** /v1/account/Profile/bookmarks | 
[**getContinueWatchingList**](ProfileApi.md#getContinueWatchingList) | **GET** /v1/account/Profile/watched/show/{itemId} | 
[**getContinueWatchingList_0**](ProfileApi.md#getContinueWatchingList_0) | **GET** /v1/account/Profile/continue-watching/list | 
[**getItemBookmark**](ProfileApi.md#getItemBookmark) | **GET** /v1/account/Profile/bookmarks/{itemId} | 
[**getItemWatchedStatus**](ProfileApi.md#getItemWatchedStatus) | **GET** /v1/account/Profile/watched/{itemId} | 
[**getNextPlaybackItem**](ProfileApi.md#getNextPlaybackItem) | **GET** /v1/account/Profile/items/{itemId}/next | 
[**getParentalControlDetails**](ProfileApi.md#getParentalControlDetails) | **GET** /v1/account/Profile/parentalcontrol | 
[**getProfile**](ProfileApi.md#getProfile) | **GET** /v1/account/Profile | 
[**getWatched**](ProfileApi.md#getWatched) | **GET** /v1/account/Profile/watched | 
[**getWatchedList**](ProfileApi.md#getWatchedList) | **GET** /v1/account/Profile/watched/list | 
[**resetPassword**](ProfileApi.md#resetPassword) | **POST** /v1/account/Profile/resetPassword | 
[**setItemWatchedStatus**](ProfileApi.md#setItemWatchedStatus) | **PUT** /v1/account/Profile/watched/{itemId} | 
[**updateParentalControlDetails**](ProfileApi.md#updateParentalControlDetails) | **POST** /v1/account/Profile/parentalcontrol | 
[**updateProfile**](ProfileApi.md#updateProfile) | **PUT** /v1/account/Profile | 
[**validateParentalControlPIN**](ProfileApi.md#validateParentalControlPIN) | **POST** /v1/account/Profile/parentalcontrol/validate | 


<a name="bookmarkItem"></a>
# **bookmarkItem**
> BritboxAPIAccountModelsProfileBookmarkItemResponse bookmarkItem(itemId, opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var itemId = "itemId_example"; // String | 

var opts = { 
  'segments': ["segments_example"] // [String] | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.bookmarkItem(itemId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **itemId** | **String**|  | 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileBookmarkItemResponse**](BritboxAPIAccountModelsProfileBookmarkItemResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="checkParentalControl"></a>
# **checkParentalControl**
> BritboxAPIAccountModelsProfileCheckParentalControlResponse checkParentalControl(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'classificationName': "classificationName_example", // String | 
  'segment': "segment_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.checkParentalControl(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **classificationName** | **String**|  | [optional] 
 **segment** | **String**|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileCheckParentalControlResponse**](BritboxAPIAccountModelsProfileCheckParentalControlResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="deleteItemBookmark"></a>
# **deleteItemBookmark**
> deleteItemBookmark(itemId, opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var itemId = "itemId_example"; // String | 

var opts = { 
  'segments': ["segments_example"] // [String] | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteItemBookmark(itemId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **itemId** | **String**|  | 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deleteWatched"></a>
# **deleteWatched**
> deleteWatched(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsProfileDeleteWatchedRequest(), // BritboxAPIAccountModelsProfileDeleteWatchedRequest | 
  'segments': ["segments_example"] // [String] | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteWatched(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsProfileDeleteWatchedRequest**](BritboxAPIAccountModelsProfileDeleteWatchedRequest.md)|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: Not defined

<a name="getBookmarkList"></a>
# **getBookmarkList**
> BritboxAPIAccountModelsProfileGetBookmarkListResponse getBookmarkList(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'page': 56, // Number | 
  'pageSize': 56, // Number | 
  'order': "order_example", // String | 
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
apiInstance.getBookmarkList(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] 
 **pageSize** | **Number**|  | [optional] 
 **order** | **String**|  | [optional] 
 **itemType** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **useCustomId** | **Boolean**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileGetBookmarkListResponse**](BritboxAPIAccountModelsProfileGetBookmarkListResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getBookmarks"></a>
# **getBookmarks**
> BritboxAPIAccountModelsProfileGetBookmarksResponse getBookmarks()



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getBookmarks(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**BritboxAPIAccountModelsProfileGetBookmarksResponse**](BritboxAPIAccountModelsProfileGetBookmarksResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getContinueWatchingList"></a>
# **getContinueWatchingList**
> BritboxAPIAccountModelsProfileGetItemWatchedStatusResponse getContinueWatchingList(itemId)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var itemId = "itemId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getContinueWatchingList(itemId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **itemId** | **String**|  | 

### Return type

[**BritboxAPIAccountModelsProfileGetItemWatchedStatusResponse**](BritboxAPIAccountModelsProfileGetItemWatchedStatusResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getContinueWatchingList_0"></a>
# **getContinueWatchingList_0**
> BritboxAPIAccountModelsProfileGetContinueWatchingListResponse getContinueWatchingList_0(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'showItemType': "showItemType_example", // String | 
  'include': ["include_example"], // [String] | 
  'page': 56, // Number | 
  'pageSize': 56, // Number | 
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
apiInstance.getContinueWatchingList_0(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **showItemType** | **String**|  | [optional] 
 **include** | [**[String]**](String.md)|  | [optional] 
 **page** | **Number**|  | [optional] 
 **pageSize** | **Number**|  | [optional] 
 **maxRating** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileGetContinueWatchingListResponse**](BritboxAPIAccountModelsProfileGetContinueWatchingListResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getItemBookmark"></a>
# **getItemBookmark**
> BritboxAPIAccountModelsProfileGetItemBookmarkResponse getItemBookmark(itemId)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var itemId = "itemId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getItemBookmark(itemId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **itemId** | **String**|  | 

### Return type

[**BritboxAPIAccountModelsProfileGetItemBookmarkResponse**](BritboxAPIAccountModelsProfileGetItemBookmarkResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getItemWatchedStatus"></a>
# **getItemWatchedStatus**
> BritboxAPIAccountModelsProfileGetItemWatchedStatusResponse getItemWatchedStatus(itemId)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var itemId = "itemId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getItemWatchedStatus(itemId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **itemId** | **String**|  | 

### Return type

[**BritboxAPIAccountModelsProfileGetItemWatchedStatusResponse**](BritboxAPIAccountModelsProfileGetItemWatchedStatusResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getNextPlaybackItem"></a>
# **getNextPlaybackItem**
> BritboxAPIAccountModelsProfileGetNextPlaybackItemResponse getNextPlaybackItem(itemId, opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var itemId = "itemId_example"; // String | 

var opts = { 
  'maxRating': "maxRating_example", // String | 
  'expand': "expand_example", // String | 
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
apiInstance.getNextPlaybackItem(itemId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **itemId** | **String**|  | 
 **maxRating** | **String**|  | [optional] 
 **expand** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileGetNextPlaybackItemResponse**](BritboxAPIAccountModelsProfileGetNextPlaybackItemResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getParentalControlDetails"></a>
# **getParentalControlDetails**
> BritboxAPIAccountModelsProfileGetParentalControlDetailsResponse getParentalControlDetails()



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getParentalControlDetails(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**BritboxAPIAccountModelsProfileGetParentalControlDetailsResponse**](BritboxAPIAccountModelsProfileGetParentalControlDetailsResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getProfile"></a>
# **getProfile**
> BritboxAPIAccountModelsProfileGetProfileResponse getProfile(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'useCustomId': true, // Boolean | Show content item ids with BBC ids
  'segments': ["segments_example"] // [String] | US, CA or AU
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProfile(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **useCustomId** | **Boolean**| Show content item ids with BBC ids | [optional] 
 **segments** | [**[String]**](String.md)| US, CA or AU | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileGetProfileResponse**](BritboxAPIAccountModelsProfileGetProfileResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getWatched"></a>
# **getWatched**
> BritboxAPIAccountModelsProfileGetWatchedResponse getWatched()



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getWatched(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**BritboxAPIAccountModelsProfileGetWatchedResponse**](BritboxAPIAccountModelsProfileGetWatchedResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="getWatchedList"></a>
# **getWatchedList**
> BritboxAPIAccountModelsProfileGetWatchedListResponse getWatchedList(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'page': 56, // Number | 
  'pageSize': 56, // Number | 
  'completed': true, // Boolean | 
  'order': "order_example", // String | 
  'orderBy': "orderBy_example", // String | 
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
apiInstance.getWatchedList(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] 
 **pageSize** | **Number**|  | [optional] 
 **completed** | **Boolean**|  | [optional] 
 **order** | **String**|  | [optional] 
 **orderBy** | **String**|  | [optional] 
 **itemType** | **String**|  | [optional] 
 **device** | **String**|  | [optional] 
 **sub** | **String**|  | [optional] 
 **useCustomId** | **Boolean**|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileGetWatchedListResponse**](BritboxAPIAccountModelsProfileGetWatchedListResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="resetPassword"></a>
# **resetPassword**
> BritboxAPIAccountModelsProfileResetPasswordResponse resetPassword(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsProfileResetPasswordRequest() // BritboxAPIAccountModelsProfileResetPasswordRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.resetPassword(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsProfileResetPasswordRequest**](BritboxAPIAccountModelsProfileResetPasswordRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileResetPasswordResponse**](BritboxAPIAccountModelsProfileResetPasswordResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="setItemWatchedStatus"></a>
# **setItemWatchedStatus**
> BritboxAPIAccountModelsProfileSetItemWatchedStatusResponse setItemWatchedStatus(itemId, opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var itemId = "itemId_example"; // String | 

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsProfileSetItemWatchedStatusRequest(), // BritboxAPIAccountModelsProfileSetItemWatchedStatusRequest | 
  'segments': ["segments_example"] // [String] | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.setItemWatchedStatus(itemId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **itemId** | **String**|  | 
 **request** | [**BritboxAPIAccountModelsProfileSetItemWatchedStatusRequest**](BritboxAPIAccountModelsProfileSetItemWatchedStatusRequest.md)|  | [optional] 
 **segments** | [**[String]**](String.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileSetItemWatchedStatusResponse**](BritboxAPIAccountModelsProfileSetItemWatchedStatusResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="updateParentalControlDetails"></a>
# **updateParentalControlDetails**
> BritboxAPIAccountModelsProfileUpdateParentalControlDetailsResponse updateParentalControlDetails(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsProfileUpdateParentalControlDetailsRequest() // BritboxAPIAccountModelsProfileUpdateParentalControlDetailsRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateParentalControlDetails(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsProfileUpdateParentalControlDetailsRequest**](BritboxAPIAccountModelsProfileUpdateParentalControlDetailsRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileUpdateParentalControlDetailsResponse**](BritboxAPIAccountModelsProfileUpdateParentalControlDetailsResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="updateProfile"></a>
# **updateProfile**
> BritboxAPIAccountModelsProfileUpdateProfileResponse updateProfile(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsProfileUpdateProfileRequest() // BritboxAPIAccountModelsProfileUpdateProfileRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateProfile(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsProfileUpdateProfileRequest**](BritboxAPIAccountModelsProfileUpdateProfileRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileUpdateProfileResponse**](BritboxAPIAccountModelsProfileUpdateProfileResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="validateParentalControlPIN"></a>
# **validateParentalControlPIN**
> BritboxAPIAccountModelsProfileValidateParentalControlPINResponse validateParentalControlPIN(opts)



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

var apiInstance = new BritboxAccountApi10.ProfileApi();

var opts = { 
  'request': new BritboxAccountApi10.BritboxAPIAccountModelsProfileValidateParentalControlPINRequest() // BritboxAPIAccountModelsProfileValidateParentalControlPINRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.validateParentalControlPIN(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**BritboxAPIAccountModelsProfileValidateParentalControlPINRequest**](BritboxAPIAccountModelsProfileValidateParentalControlPINRequest.md)|  | [optional] 

### Return type

[**BritboxAPIAccountModelsProfileValidateParentalControlPINResponse**](BritboxAPIAccountModelsProfileValidateParentalControlPINResponse.md)

### Authorization

[AWSApiKeyAuth](../README.md#AWSApiKeyAuth), [JWToken](../README.md#JWToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

