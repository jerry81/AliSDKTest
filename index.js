const ALY = require('aliyun-sdk')
var sls = new ALY.SLS({
    accessKeyId: "11****ut",                         // The AccessKey ID of your Alibaba Cloud account. For more information, see AccessKey pair. An Alibaba Cloud account has permissions to call all API operations. If you use the AccessKey pair of an Alibaba Cloud account, security risks may occur. We recommend that you create and use a RAM user to call API operations or perform routine O&M.
    secretAccessKey: "TS****7Y",                     // The AccessKey secret of your Alibaba Cloud account.
    endpoint: 'http://cn-hangzhou.log.aliyuncs.com', // The Log Service endpoint. For more information, see Endpoints. In this example, the Log Service endpoint for the China (Hangzhou) region is used. Replace the parameter value with the actual endpoint.
    apiVersion: '2015-06-01'                         // The version of the SDK. The value is fixed as 2015-06-01.
  })