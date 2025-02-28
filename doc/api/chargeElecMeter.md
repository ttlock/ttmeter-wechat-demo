# 通通水电表接口说明-蓝牙智能电表充值  

## 方法
```
    function chargeElecMeter(option: TTMeterElectricRecharge): Promise<TTMeterError>;
```

### 功能描述   
 1. 蓝牙智能电表充值  
 2. 插件版本：**1.0.0**开始支持  
 3. 该接口支持[requirePlugin模式](../../README.md)和[Component模式](../组件调用方式说明.md)  
 
### 特殊说明   
 1. 该接口调用前需先完成支付对接并获取到充值token  
 2. 该接口不会同步操作成功后的设备数据，接口调用成功后，请主动调用[抄表接口：syncElecMeterState](./syncElecMeterState.md)以同步服务器数据  
 3. 调用时设备需处于**已连接状态**  
 4. 调用时设备需处于**强网络状态**  
 5. 批量接口调用结束后，请及时调用 [完成操作接口: handleFinishOperations](./handleFinishOperations.md) 释放蓝牙资源

### 参数说明  
##### option参数说明 TTMeterElectricRecharge 
 |PARAMS        |TYPE       |REQUIRED      |DESCRIPTION|
 |--------------|-----------|--------------|-----------|
 |executeToken  |string     |Y             |充值后获取到的支付token值，使用一次后失效          |

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