# 通通水电表接口说明-获取特征值  

## 方法
```
    function getFeatureValue(option?: TTWaterMeter.GetFeatureValue): Promise<TTMeterError<TTMeter.FeatureValueData>>;
```

### 功能描述   
 获取智能水表特征值   

### 版本支持   
 插件版本 **0.0.4** 开始支持  
 
### 特殊说明   
 1. 操作成功后，当前特征值将通过返回值data域返回（插件版本1.3.0开始支持）  
 2. 调用时设备需处于**已连接状态**  
 3. 调用时设备需处于**强网络状态**  
 4. 批量接口调用结束后，请及时调用 [完成操作接口: finishOperations](../finishOperations.md) 释放蓝牙资源

### 参数说明  
##### option参数说明 TTWaterMeter.GetFeatureValue 
 |PARAMS            |TYPE       |REQUIRED      |DESCRIPTION|
 |------------------|-----------|--------------|-----------|
 |(自定义属性)       |any        |N             |自定义扩展属性|

### 返回值
 Promise<[TTMeterError](../../错误码说明.md)>  
 
##### data参数说明  
 |NAME              |TYPE       |VERSION    |DESCRIPTION|
 |------------------|-----------|-----------|-----------|
 |featureValue      |string     |1.3.0      |特征值|

## 相关链接  
 1. [常规调用方式说明](../../../README.md)  
 2. [错误码及常见问题处理方式](../../错误码说明.md)  
 3. [版本更新说明](../../版本更新说明.md)  
 4. [设备连接: connect](./connect.md)  
 5. [释放蓝牙资源: finishOperations](../finishOperations.md)  

## 版本更新内容
#### **1.3.0**  
    1. 增加返回值data域，操作成功后返回当前特征值  

#### **0.0.4**  
    1. 初始化版本  