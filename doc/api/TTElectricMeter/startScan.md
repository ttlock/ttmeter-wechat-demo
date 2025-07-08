# 通通水电表接口说明-扫描附近的蓝牙电表  

## 方法
```
    function startScan(callbacks: TTElectricMeter.Scan): Promise<TTMeterError>;
```

### 功能描述   
 开启附近的蓝牙电表扫描  

### 版本支持   
 插件版本 **0.0.3** 开始支持  

### 权限说明   
 1. 需开启小程序【蓝牙】授权
 2. 需开启系统【蓝牙】开关  
 3. 需开启系统【位置信息】开关（安卓）
 4. 需授权微信【蓝牙】权限  
 5. 需授权微信【附近设备】权限（安卓）
 6. 需授权微信【精确位置】权限（安卓），并设置为 **始终允许** 。若设置为 “每次使用中询问”可能导致操作失败

### 参数说明 
##### callbacks参数说明 TTElectricMeter.Scan 
 |PARAMS                |TYPE                                               |REQUIRED      |DESCRIPTION|
 |----------------------|---------------------------------------------------|--------------|-----------|
 |onFoundDevice         |(result: TTElectricMeter.DeviceModel) => void      |Y             |设备扫描回调|
 |onNoDeviceFound       |(result: TTMeterError) => void                     |Y             |【安卓设备】10秒内未扫描到任意设备回调，回调时不关闭蓝牙扫描|

###### 扫描到的智能电表设备 TTElectricMeter.DeviceModel
 |PARAMS            |TYPE       |DESCRIPTION|
 |------------------|-----------|-----------|
 |name              |string     |蓝牙名称|
 |mac               |string     |设备MAC地址|  
 |RSSI              |number     |蓝牙信号值|  
 |isInited          |boolean    |设备是否已添加|  
 |scanTime          |number     |蓝牙扫描时间|  
 |onOff             |number     |通断电状态：0 -断电, 1 -通电|  
 |payMode           |number     |电表付费模式：0 -计能, 1 -预付费|  
 |totalKwh          |string     |总用电量，单位：kwh|  
 |remainderKwh      |string     |剩余电量，单位：kwh|  
 |voltage           |string     |电压，单位：V|  
 |electricCurrent   |number     |电流，单位：A|  

### 返回值
 Promise<[TTMeterError](../../错误码说明.md)>  

## 相关链接  
 1. [常规调用方式说明](../../../README.md)  
 2. [错误码及常见问题处理方式](../../错误码说明.md)  
 3. [版本更新说明](../../版本更新说明.md)  

## 版本更新内容
#### **0.0.4**  
    1. 设备扫描超时且未扫描到设备时不再主动关闭扫描  

#### **0.0.3**  
    1. 初始化版本  