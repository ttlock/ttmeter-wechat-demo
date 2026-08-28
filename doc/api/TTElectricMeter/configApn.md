# 通通水电表接口说明-配置电表APN  

## 方法
```
    function configApn(option: TTElectricMeter.ConfigAPN): Promise<TTMeterError>;
```

### 功能描述   
 配置电表4G模块APN（适用于4G版本设备）   

### 版本支持   
 插件版本 **1.3.0** 开始支持  
 
### 特殊说明   
 1. 该接口仅4G版本智能电表支持  
 2. 调用时设备需处于**已连接状态**  
 3. 调用时设备需处于**强网络状态**  
 4. 批量接口调用结束后，请及时调用 [完成操作接口: finishOperations](../finishOperations.md) 释放蓝牙资源

### 参数说明  
##### option参数说明 TTElectricMeter.ConfigAPN 
 |PARAMS            |TYPE       |REQUIRED      |DESCRIPTION|
 |------------------|-----------|--------------|-----------|
 |apn               |string     |Y             |APN，4G模块网络接入点名称|
 |(自定义属性)       |any        |N             |自定义扩展属性|

### 返回值
 Promise<[TTMeterError](../../错误码说明.md)>  

## 相关链接  
 1. [常规调用方式说明](../../../README.md)  
 2. [错误码及常见问题处理方式](../../错误码说明.md)  
 3. [版本更新说明](../../版本更新说明.md)  
 4. [设备连接: connect](./connect.md)  
 5. [释放蓝牙资源: finishOperations](../finishOperations.md)  
 6. [配置远程服务器地址: configServer](./configServer.md)  

## 版本更新内容
#### **1.3.0**  
    1. 初始化版本  
