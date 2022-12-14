import ALY from 'aliyun-sdk';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import SlsLogger from 'ali-sls';


dotenv.config()
// console.log('ALY.SLS', ALY.default.SLS)

var sls = new ALY.SLS({
    accessKeyId: process.env.ALI_KEY,                         // The AccessKey ID of your Alibaba Cloud account. For more information, see AccessKey pair. An Alibaba Cloud account has permissions to call all API operations. If you use the AccessKey pair of an Alibaba Cloud account, security risks may occur. We recommend that you create and use a RAM user to call API operations or perform routine O&M.
    secretAccessKey: process.env.ALI_SECRET,                     // The AccessKey secret of your Alibaba Cloud account.
    endpoint: 'http://cn-shanghai.log.aliyuncs.com', // The Log Service endpoint. For more information, see Endpoints. In this example, the Log Service endpoint for the China (Hangzhou) region is used. Replace the parameter value with the actual endpoint.
    apiVersion: '2015-06-01'                         // The version of the SDK. The value is fixed as 2015-06-01.
  })

var projectName = "k8s-log-ce1d89e1ffb644a42ad94a226e5e8aa52";
var logStoreName = "aws";

const slsLogger = new SlsLogger({
  endpoint: "k8s-log-ce1d89e1ffb644a42ad94a226e5e8aa52.cn-shanghai.log.aliyuncs.com",
  accessKey: process.env.ALI_KEY,
  accessSecret: process.env.ALI_SECRET,
  logstore: logStoreName,
  source: "test",
  topic: "test",
  compress: false,
  level: "INFO",
  disabled: false,
})

slsLogger.info("hello")

// var logGroup = {
//   logs : [{
//       time:  Math.floor(new Date().getTime()/1000),
//       contents: [{
//           key: 'a',
//           value: '1'
//       },{
//           key: 'b',
//           value: '2'
//       },{
//           key: 'c',
//           value: '3'
//       }]
//   }]
// };

const ass = {
  fn1: (level, msg) => {
  console.log(`level ${level}, msg: ${msg}`)}
}

const base = ass.fn1;
ass.fn1 = function() {
  base.apply(this,arguments)
  console.log(`to ali ${arguments[0]} and ${arguments[1]}`)
}

ass.fn1('info', 'fakku')

function custom_log(msg) {
  console.log(msg)
  const logGroup = {
    logs : [{
        time:  Math.floor(new Date().getTime()/1000),
        contents: [{
            key: 'content',
            value: msg
        }]
    }]
  }
  sls.putLogs({
    //????????????
    projectName,
    logStoreName,
    logGroup
  }, function (err, data) {

    if (err) {
        console.log('error:', err);
        return;
    }

    console.log('success:', data);

  });
}

custom_log("helloworld")