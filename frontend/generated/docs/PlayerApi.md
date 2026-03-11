# PlayerApi

All URIs are relative to *http://localhost/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDataByTag**](#getdatabytag) | **GET** /player/{playerTag} | Retrieve all data by Tag|

# **getDataByTag**
> Array<PlayerDTO> getDataByTag()

Get all data by Tag

### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let playerTag: string; // (default to undefined)

const { status, data } = await apiInstance.getDataByTag(
    playerTag
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **playerTag** | [**string**] |  | defaults to undefined|


### Return type

**Array<PlayerDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Playerdata successfully retrieved |  -  |
|**404** | Player Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

