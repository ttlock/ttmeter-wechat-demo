# 通通水电表接口说明-获取电表设备信息  

## 方法
```
    function getDeviceInfo(option?: TTElectricMeter.GetDeviceInfo): Promise<TTMeterError<TTMeter.DeviceInfoData>>;
```

### 功能描述   
 获取电表设备信息（适用于4G版本设备）   

### 版本支持   
 插件版本 **1.3.0** 开始支持  
 
### 特殊说明   
 1. 操作成功后，设备信息将通过返回值data域返回  
 2. 该接口仅4G版本智能电表支持  
 3. 调用时设备需处于**已连接状态**  
 4. 调用时设备需处于**强网络状态**  
 5. 批量接口调用结束后，请及时调用 [完成操作接口: finishOperations](../finishOperations.md) 释放蓝牙资源

### 参数说明  
##### option参数说明 TTElectricMeter.GetDeviceInfo 
 |PARAMS            |TYPE       |REQUIRED      |DESCRIPTION|
 |------------------|-----------|--------------|-----------|
 |(自定义属性)       |any        |N             |自定义扩展属性|

### 返回值
 Promise<[TTMeterError](../../错误码说明.md)>  
 
##### data参数说明  
 |NAME              |TYPE       |VERSION    |DESCRIPTION|
 |------------------|-----------|-----------|-----------|
 |catOneCardNumber  |string     |1.3.0      |Cat.1卡号|
 |catOneImsi        |string     |1.3.0      |Cat.1手机号|
 |catOneNodeId      |string     |1.3.0      |Cat.1模块号|
 |catOneOperator    |string     |1.3.0      |Cat.1运营商|
 |catOneRssi        |number     |1.3.0      |Cat.1信号值|

## 相关链接  
 1. [常规调用方式说明](../../../README.md)  
 2. [错误码及常见问题处理方式](../../错误码说明.md)  
 3. [版本更新说明](../../版本更新说明.md)  
 4. [设备连接: connect](./connect.md)  
 5. [释放蓝牙资源: finishOperations](../finishOperations.md)  

## 版本更新内容
#### **1.3.0**  
    1. 初始化版本  
