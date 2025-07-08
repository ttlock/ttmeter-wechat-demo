# 通通水电表接口说明-扫描附近的蓝牙水表  

## 方法
```
    function startScan(callbacks: TTWaterMeter.Scan): Promise<TTMeterError>
```

### 功能描述   
 开启附近的蓝牙水表扫描  

### 版本支持   
 插件版本 **0.0.4** 开始支持  

### 权限说明   
 1. 需开启小程序【蓝牙】授权
 2. 需开启系统【蓝牙】开关  
 3. 需开启系统【位置信息】开关（安卓）
 4. 需授权微信【蓝牙】权限  
 5. 需授权微信【附近设备】权限（安卓）
 6. 需授权微信【精确位置】权限（安卓），并设置为 **始终允许** 。若设置为 “每次使用中询问”可能导致操作失败

### 参数说明 
##### callbacks参数说明 TTWaterMeter.Scan 
 |PARAMS                |TYPE                                               |REQUIRED      |DESCRIPTION|
 |----------------------|---------------------------------------------------|--------------|-----------|
 |onFoundDevice         |(result: TTWaterMeter.DeviceModel) => void         |Y             |设备扫描回调|
 |onNoDeviceFound       |(result: TTMeterError) => void                     |Y             |【安卓设备】10秒内未扫描到任意设备回调，回调时不关闭蓝牙扫描|

###### 扫描到的智能水表设备 TTWaterMeter.DeviceModel
 |PARAMS                |TYPE       |DESCRIPTION|
 |----------------------|-----------|-----------|
 |name                  |string     |蓝牙名称|
 |mac                   |string     |设备MAC地址|  
 |RSSI                  |number     |蓝牙信号值|  
 |isInited              |boolean    |设备是否已添加|  
 |scanTime              |number     |蓝牙扫描时间|  
 |onOff                 |number     |通断水状态：0 -断水, 1 -通水|  
 |payMode               |number     |水表付费模式：0 -计能, 1 -预付费|  
 |totalM3               |string     |总用水量，单位：t|  
 |remainderM3           |string     |剩余水量，单位：t|  
 |electricQuantity      |number     |电量, 1~100|  
 |magneticInterference  |number     |磁干扰状态: 0-正常, 1-磁干扰|  
 |waterValveFailure     |number     |水阀故障状态：0-正常, 1-水阀故障|  

### 返回值
 Promise<[TTMeterError](../../错误码说明.md)>  

## 相关链接  
 1. [常规调用方式说明](../../../README.md)  
 2. [错误码及常见问题处理方式](../../错误码说明.md)  
 3. [版本更新说明](../../版本更新说明.md)  

## 版本更新内容
#### **0.0.4**  
    1. 初始化版本  