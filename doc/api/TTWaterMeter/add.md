# 通通水电表接口说明-添加蓝牙水表  

## 方法
```
    function add(option: TTWaterMeter.Add): Promise<TTMeterError>;
```

### 功能描述   
 添加蓝牙水表  

### 版本支持   
 插件版本 **0.0.4** 开始支持  

### 特殊说明   
 1. 调用时设备需处于**已连接状态**  
 2. 调用时设备需处于**强网络状态**  
 3. 批量接口调用结束后，请及时调用 [完成操作接口: finishOperations](../finishOperations.md) 释放蓝牙资源  

### 参数说明 
##### option参数说明 TTWaterMeter.Add 
 |PARAMS        |TYPE       |REQUIRED      |DESCRIPTION|
 |--------------|-----------|--------------|-----------|
 |name          |string     |Y             |蓝牙名称|
 |payMode       |number     |Y             |水表付费模式：0 -计能, 1 -预付费|
 |price         |number     |Y             |水费单价，单位：元/t|
 |(自定义属性)   |any        |N             |自定义扩展属性|

### 返回值
 Promise<[TTMeterError](../../错误码说明.md)>  

## 相关链接  
 1. [常规调用方式说明](../../../README.md)  
 2. [错误码及常见问题处理方式](../../错误码说明.md)  
 3. [版本更新说明](../../版本更新说明.md)  
 4. [设备连接: connect](./connect.md)  
 5. [释放蓝牙资源: finishOperations](../finishOperations.md)  

## 版本更新内容
#### **0.0.4**  
    1. 初始化版本  