# 通通水电表接口说明-设置蓝牙智能电表剩余电量  

## 方法
```
    function setElecMeter(option: TTMeterSetElectric): TTMeterError;
```

### 功能描述   
 1. 设置蓝牙智能电表剩余电量  
 2. 插件版本：**1.0.0**开始支持  
 3. 该接口支持[requirePlugin模式](../../README.md)和[Component模式](../组件调用方式说明.md)  
 
### 特殊说明   
 1. 该接口不会同步操作成功后的设备数据，接口调用成功后，请主动调用[抄表接口：syncElecMeterState](./syncElecMeterState.md)以同步服务器数据  
 2. 调用时设备需处于**已连接状态**  
 3. 调用时设备需处于**强网络状态**  
 4. 批量接口调用结束后，请及时调用 [完成操作接口: handleFinishOperations](./handleFinishOperations.md) 释放蓝牙资源

### 参数说明  
##### option参数说明 TTMeterSetElectric 
 |PARAMS        |TYPE       |REQUIRED      |DESCRIPTION|
 |--------------|-----------|--------------|-----------|
 |remainderKwh  |string     |Y             |智能电表剩余电量|

### 返回值
 1. 该接口以异步回调TTMeterError形式返回
 2. 错误信息及部分常见错误处理方式请参考<a href="../错误码说明.md" target="_blank">TTMeterError</a>

## 相关链接  
 1. <a href="../版本更新说明.md" target="_blank">版本更新说明</a>  
 2. <a href="../错误码说明.md" target="_blank">错误码及部分常见错误返回处理说明</a>  
 3. [常规调用方式说明](../../README.md)  
 4. [组件调用方式说明](../组件调用方式说明.md)  

### 版本更新内容
#### **1.0.0**  
    1. 初始化版本  