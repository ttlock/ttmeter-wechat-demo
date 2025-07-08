# 通通水电表小程序插件接口说明文档（version: 1.0.0)  

## 说明
 **当前版本仅支持内部使用**
 **当前版本不支持企业微信调用**
 通通水电表小程序插件是基于微信小程序接口开发的蓝牙模块插件，使用时需配合通通锁开放平台接口或相关本地开发包使用。  
 小程序后台可通过搜索“**通通水电表**”或小程序appid进行搜索  
 该小程序接口为蓝牙通信接口，操作时需通过蓝牙进行设备交互，操作中将向用户请求蓝牙权限、设备定位权限及附近设备权限等  
 该接口需要在**强网络状态**下使用  


 APPID: **wxeb890b790ae1ab8f**   
 当前版本：**1.0.0**  
 开放平台最低可用版本：**1.0.0**  
 微信版本号：**8.0.5**以上  
 微信基础库版本号：**3.5.7**以上  
 **该插件仅支持企业账号添加** 

## 相关链接  
 1. <a href="doc/版本更新说明.md" target="_blank">版本更新说明</a>  
 2. <a href="doc/错误码说明.md" target="_blank">错误码及部分常见错误返回处理说明</a>  

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
    const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // ts
```  
> 2. 使用 plugin.x 调用插件方法  
```
    plugin.setShowLog(true, (...args) => {
        ...
    })
```  

## 插件导出方法内容 (可通过requirePlugin调用)  
```
    const VERSION: string // 当前插件版本号, since: 0.0.1
    function setShowLog(open: boolean, callback: (...args: any | void) => void): void // since: 0.0.3
    function setClientParam(clientInfo: TTMeter.ClientInfo): boolean // since: 0.0.3
    function init(option: TTMeter.Init): Promise<TTMeterError> // since: 0.0.3
    function stopScan(): Promise<TTMeterError> // since: 0.0.3
    function finishOperations(): Promise<TTMeterError> // since: 0.0.3
    function stopAllOperations(): Promise<TTMeterError> // since: 0.0.4
    const TTElectricMeter: TTMeter.ElectricMeter // 蓝牙智能电表相关接口, since: 0.0.3
    const TTWaterMeter: TTMeter.WaterMeter // 蓝牙智能水表相关接口, since: 0.0.4
```  
 1. [设置日志输出开关及回调方法：setShowLog](./doc/api/setShowLog.md)  
 2. [配置远程服务器请求信息: setClientParam](./doc/api/setClientParam.md)  
 3. [初始化蓝牙接口：init](./doc/api/init.md)  
 4. [停止蓝牙扫描：stopScan](./doc/api/stopScan.md)  
 6. [批量操作结束，断开设备连接并释放资源：finishOperations](./doc/api/finishOperations.md)  
 7. [停止所有蓝牙操作：stopAllOperations](./doc/api/stopAllOperations.md)  
 8. [蓝牙智能电表相关接口：TTElectricMeter](#蓝牙智能电表相关接口)  
 9. [蓝牙智能水表相关接口：TTWaterMeter](#蓝牙智能水表相关接口)  

### 蓝牙智能电表相关接口
```
    const { TTElectricMeter } = requirePlugin("ttmeter-plugin")
    function startScan(callbacks: TTElectricMeter.Scan): Promise<TTMeterError> // since: 0.0.3
    function locate(mac: string): Promise<TTMeterError> // since: 0.0.3
    function connect(MAC: string): Promise<TTMeterError> // since: 0.0.3
    function add(option: TTElectricMeter.Add): Promise<TTMeterError> // since: 0.0.3
    function delete(option: TTElectricMeter.Delete): Promise<TTMeterError> // since: 0.0.3
    function setPowerOnOff(option: TTElectricMeter.SetPowerOnOff): Promise<TTMeterError> // since: 0.0.3
    function setRemainingElectricity(option: TTElectricMeter.SetRemainingElectricity): Promise<TTMeterError> // since: 0.0.3
    function clearRemainingElectricity(option: TTElectricMeter.ClearRemainingElectricity): Promise<TTMeterError> // since: 0.0.3
    function readData(option?: TTElectricMeter.ReadData): Promise<TTMeterError> // since: 0.0.3
    function setPayMode(option?: TTElectricMeter.SetPayMode): Promise<TTMeterError> // since: 0.0.3
    function recharge(option: TTElectricMeter.Recharge): Promise<TTMeterError> // since: 0.0.3
    function setMaxPower(option: TTElectricMeter.SetMaxPower): Promise<TTMeterError> // since: 0.0.3
    function getFeatureValue(option: TTElectricMeter.GetFeatureValue): Promise<TTMeterError> // since: 0.0.3
```  
 1. [扫描附近的蓝牙电表：startScan](./doc/api/TTElectricMeter/startScan.md)  
 2. [扫描定位蓝牙电表，确定电表是否在附近：locate](./doc/api/TTElectricMeter/locate.md)  
 3. [连接蓝牙智能电表：connect](./doc/api/TTElectricMeter/connect.md)  
 4. [添加蓝牙智能电表：add](./doc/api/TTElectricMeter/add.md)  
 5. [删除蓝牙智能电表：delete](./doc/api/TTElectricMeter/delete.md)  
 6. [设置智能电表通断电状态：setPowerOnOff](./doc/api/TTElectricMeter/setPowerOnOff.md)  
 7. [设置智能电表剩余电量：setRemainingElectricity](./doc/api/TTElectricMeter/setRemainingElectricity.md)  
 8. [清空智能电表剩余电量：clearRemainingElectricity](./doc/api/TTElectricMeter/clearRemainingElectricity.md)  
 9. [智能电表抄表：readData](./doc/api/TTElectricMeter/readData.md)  
 10. [设置智能电表付费模式：setPayMode](./doc/api/TTElectricMeter/setPayMode.md)  
 11. [智能电表充值：recharge](./doc/api/TTElectricMeter/recharge.md)  
 12. [设置电表最大功率：setMaxPower](./doc/api/TTElectricMeter/setMaxPower.md)  
 13. [获取智能电表特征值：getFeatureValue](./doc/api/TTElectricMeter/getFeatureValue.md)  

 ### 蓝牙智能水表相关接口
```
    const { TTWaterMeter } = requirePlugin("ttmeter-plugin")
    function startScan(callbacks: TTWaterMeter.Scan): Promise<TTMeterError> // since: 0.0.4
    function locate(mac: string): Promise<TTMeterError> // since: 0.0.4
    function connect(MAC: string): Promise<TTMeterError> // since: 0.0.4
    function add(option: TTWaterMeter.Add): Promise<TTMeterError> // since: 0.0.4
    function delete(option: TTWaterMeter.Delete): Promise<TTMeterError> // since: 0.0.4
    function setWaterOnOff(option: TTWaterMeter.SetWaterOnOff): Promise<TTMeterError> // since: 0.0.4
    function setRemainingWater(option: TTWaterMeter.SetRemainingWater): Promise<TTMeterError> // since: 0.0.4
    function clearRemainingWater(option: TTWaterMeter.ClearRemainingWater): Promise<TTMeterError> // since: 0.0.4
    function readData(option?: TTWaterMeter.ReadData): Promise<TTMeterError> // since: 0.0.4
    function setPayMode(option?: TTWaterMeter.SetPayMode): Promise<TTMeterError> // since: 0.0.4
    function recharge(option: TTWaterMeter.Recharge): Promise<TTMeterError> // since: 0.0.4
    function setTotalUsage(option: TTWaterMeter.SetTotalUsage): Promise<TTMeterError> // since: 0.0.4
    function getFeatureValue(option: TTWaterMeter.GetFeatureValue): Promise<TTMeterError> // since: 0.0.4
```  
 1. [扫描附近的蓝牙水表：startScan](./doc/api/TTWaterMeter/startScan.md)  
 2. [扫描定位蓝牙水表，确定电表是否在附近：locate](./doc/api/TTWaterMeter/locate.md)  
 3. [连接蓝牙智能水表：connect](./doc/api/TTWaterMeter/connect.md)  
 4. [添加蓝牙智能水表：add](./doc/api/TTWaterMeter/add.md)  
 5. [删除蓝牙智能水表：delete](./doc/api/TTWaterMeter/delete.md)  
 6. [设置智能电水通断水状态：setWaterOnOff](./doc/api/TTWaterMeter/setWaterOnOff.md)  
 7. [设置智能水表剩余水量：setRemainingWater](./doc/api/TTWaterMeter/setRemainingWater.md)  
 8. [清空智能水表剩余水量：clearRemainingWater](./doc/api/TTWaterMeter/clearRemainingWater.md)  
 9. [智能水表抄表：readData](./doc/api/TTWaterMeter/readData.md)  
 10. [设置智能水表付费模式：setPayMode](./doc/api/TTWaterMeter/setPayMode.md)  
 11. [智能水表充值：recharge](./doc/api/TTWaterMeter/recharge.md)  
 12. [设置水表底数：setTotalUsage](./doc/api/TTWaterMeter/setTotalUsage.md)  
 13. [获取智能水表特征值：getFeatureValue](./doc/api/TTWaterMeter/getFeatureValue.md)  