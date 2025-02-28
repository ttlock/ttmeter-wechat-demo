# 通通水电表接口说明-初始化蓝牙接口及服务器参数  

## 方法
```
    function init(params: TTMeterInit): Promise<TTMeterError>;
```

### 功能描述   
 1. 初始化蓝牙接口，并设置远程服务器地址及相关应用参数  
 2. 插件版本：**1.0.0**开始支持  
 3. 该接口仅支持[requirePlugin模式](../../README.md)调用，组件化调用请参考[设置服务器参数：setServerInfo](setServerInfo.md)  

### 特殊说明   
 1. **该接口不判断服务器数据是否真实可用**  

### 参数说明 
##### option参数说明 TTMeterInit 
 |PARAMS                            |TYPE                                                               |REQUIRED      |DESCRIPTION|
 |----------------------------------|-------------------------------------------------------------------|--------------|-----------|
 |host                              |string                                                             |N             |服务器域名或前置接口段, 默认 "https://mini.sciener.cn", 本地化对接需额外配置 |
 |clientId                          |string                                                             |Y             |应用对应的clientId, 请从开放平台获取|
 |clientSecret                      |string                                                             |Y             |应用对应的clientSecret, 请从开放平台获取|
 |packageName                       |string                                                             |Y             |应用包名, 请从开放平台获取|  
 |onNetworkWeakChange               |WechatMiniprogram.OnNetworkWeakChangeCallback                      |N             |网络状态变化回调|
 |onBluetoothAdapterStateChange     |WechatMiniprogram.OnBluetoothAdapterStateChangeCallback            |N             |蓝牙适配器状态变化回调|
 |onBLEDisconnectStateChange        |WechatMiniprogram.OnBLEConnectionStateChangeCallback               |N             |设备断连回调|

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