# 通通水电表接口说明-初始化蓝牙接口  

## 方法
```
    function init(option: TTMeter.Init): Promise<TTMeterError>
```

### 功能描述   
 初始化蓝牙接口，设置蓝牙监控回调方法  

### 版本支持   
 插件版本 **0.0.3** 开始支持  

### 参数说明 
##### option参数说明 TTMeter.Init 
 |PARAMS                            |TYPE                                                                       |REQUIRED      |DESCRIPTION|
 |----------------------------------|---------------------------------------------------------------------------|--------------|-----------|
 |onNetworkWeakChange               |(result?: TTMeter.OnNetworkWeakChangeListenerResult) => void               |N             |网络状态变化回调|
 |onBluetoothAdapterStateChange     |(result?: TTMeter.OnBluetoothAdapterStateChangeListenerResult) => void     |N             |蓝牙适配器状态变化回调|
 |onBLEDisconnect                   |(result?: TTMeter.OnBLEConnectionStateChangeListenerResult) => void        |N             |设备断连回调|

###### 网络状态变化回调参数  TTMeter.OnNetworkWeakChangeListenerResult
 参考 WechatMiniprogram.OnNetworkWeakChangeListenerResult
 |PARAMS        |TYPE       |DESCRIPTION|
 |--------------|-----------|-----------|
 |networkType   |string     |网络类型|
 |weakNet       |boolean    |是否处于弱网状态|  

###### 蓝牙适配器状态变化回调参数  TTMeter.OnBluetoothAdapterStateChangeListenerResult
 参考 WechatMiniprogram.OnBluetoothAdapterStateChangeListenerResult
 |PARAMS        |TYPE       |DESCRIPTION|
 |--------------|-----------|-----------|
 |available     |boolean    |蓝牙适配器是否可用|
 |discovering   |boolean    |蓝牙适配器是否处于搜索状态|  

###### 设备断连回调参数  TTMeter.OnBLEConnectionStateChangeListenerResult
 参考 WechatMiniprogram.OnBLEConnectionStateChangeListenerResult
 |PARAMS        |TYPE       |DESCRIPTION|
 |--------------|-----------|-----------|
 |connected     |boolean    |是否处于已连接状态|
 |deviceId      |string     |蓝牙设备 id|  

### 返回值
 Promise<[TTMeterError](../错误码说明.md)>  

## 相关链接  
 1. [常规调用方式说明](../../README.md)  
 2. [错误码及常见问题处理方式](../错误码说明.md)  
 3. [版本更新说明](../版本更新说明.md)  

## 版本更新内容
#### **0.0.3**  
    1. 初始化版本  