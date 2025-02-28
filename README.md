# 通通水电表小程序插件接口说明文档（version: 1.0.0)  

## 说明
 **当前版本仅支持内部使用**
 通通水电表小程序插件是基于微信小程序接口开发的蓝牙模块插件，使用时需配合通通锁开放平台接口或相关本地开发包使用。  
 小程序后台可通过搜索“**通通水电表**”或小程序appid进行搜索  
 该小程序接口为蓝牙通信接口，操作时需通过蓝牙进行设备交互，操作中将向用户请求蓝牙权限、设备定位权限及附近设备权限等  
 该接口需要在**强网络状态**下使用  

 APPID: **wxeb890b790ae1ab8f**   
 当前版本：**1.0.0**  
 微信版本号：**8.0.5**以上  
 微信基础库版本号：**3.5.7**以上  
 **该插件仅支持企业账号添加** 

## 相关链接  
 1. <a href="doc/版本更新说明.md" target="_blank">版本更新说明</a>  
 2. <a href="doc/错误码说明.md" target="_blank">错误码及部分常见错误返回处理说明</a>  
 3. [组件调用方式说明](doc/组件调用方式说明.md)  

## 引用方式  
##### Ⅰ. 第一步 申请小程序使用权限  
> 1. 登录小程序后台
> 2. 点击左下角小程序头像，选择“账号设置” -> “第三方设置” -> “插件管理”
> 3. 点击“添加插件” -> 搜索通通水电表插件APPID -> 添加插件  
    APPID: **wxeb890b790ae1ab8f**   
> 4. 等待审核通过

##### Ⅱ. 第二步 在小程序中引入插件
> 1. 审核通过后，在app.json中添加相关代码  
```
    "plugins": {
        ...
        "ttmeter-plugin": {
            "version": "{插件版本号}",
            "provider": "{APPID}"
        }
    }
```

##### Ⅲ. 第三步 使用插件  
> 1. 在页面 x.js 中引入插件  
```
    const plugin = requirePlugin("ttmeter-plugin");
```  
> 2. 使用 plugin.x 调用插件方法  
```
    plugin.setShowLog(true, (...args) => {
        ...
    })
```  

## 插件导出方法列表 (可通过requirePlugin调用)  
```
    const VERSION: string; // 当前插件版本号(1.0.0)
    function setShowLog(open: boolean, callback: (...args: any | void) => void): void; // 设置输出日志(1.0.0)
    function init(params: TTMeterInit): Promise<TTMeterError>; // 初始化蓝牙接口(1.0.0)
    function scanBLEElecMeter(MAC: string): Promise<TTMeterError>; // 扫描蓝牙智能电表(1.0.0)
    function connectBLEElecMeter(MAC: string): Promise<TTMeterError>; // 连接蓝牙智能电表(1.0.0)
    function handleFinishOperations(): Promise<TTMeterError>; // 操作结束断连设备连接并释放资源(1.0.0)
    function syncElecMeterState(option?: TTMeterSyncElectricState): Promise<TTMeterError>; // 智能电表抄表(1.0.0)
    function chargeElecMeter(option: TTMeterElectricRecharge): Promise<TTMeterError>; // 智能电表充值(1.0.0)
    function setElecMeter(option: TTMeterSetElectric): Promise<TTMeterError>; // 设置电表电量(1.0.0)
```  

 1. [设置输出日志：setShowLog](./doc/api/setShowLog.md)  
 2. [初始化蓝牙接口：init](./doc/api/init.md)  
 3. [扫描定位蓝牙智能电表：scanBLEElecMeter](./doc/api/scanBLEElecMeter.md)  
 4. [连接蓝牙智能电表：connectBLEElecMeter](./doc/api/connectBLEElecMeter.md)  
 5. [操作结束断连设备连接并释放资源：handleFinishOperations](./doc/api/handleFinishOperations.md)  
 6. [智能电表抄表：syncElecMeterState](./doc/api/syncElecMeterState.md)  
 7. [智能电表充值：chargeElecMeter](./doc/api/chargeElecMeter.md)  
 8. [设置电表电量：setElecMeter](./doc/api/setElecMeter.md)  