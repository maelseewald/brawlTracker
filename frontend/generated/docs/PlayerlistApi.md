# PlayerlistApi

All URIs are relative to *http://localhost/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addPlayerTag**](#addplayertag) | **POST** /playerlist/{playerTag} | Add playerTag to playerList|

# **addPlayerTag**
> addPlayerTag()


### Example

```typescript
import {
    PlayerlistApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerlistApi(configuration);

let playerTag: string; // (default to undefined)

const { status, data } = await apiInstance.addPlayerTag(
    playerTag
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **playerTag** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | PlayerTag successfully added |  -  |
|**400** | Playertag is invalid |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

