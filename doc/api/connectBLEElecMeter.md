# 通通水电表接口说明-连接蓝牙智能电表  

## 方法
```
    function connectBLEElecMeter(MAC: string): Promise<TTMeterError>;
```

### 功能描述   
 1. 连接蓝牙智能电表，确定该设备是否已在附近  
 2. 插件版本：**1.0.0**开始支持  
 3. 该接口支持[requirePlugin模式](../../README.md)和[Component模式](../组件调用方式说明.md)  

### 权限说明   
 1. 需开启小程序【蓝牙】授权
 2. 需开启系统【蓝牙】开关  
 3. 需授权微信【蓝牙】权限  
 4. 需授权微信【附近设备】权限（安卓）

### 参数说明  
 |PARAMS    |TYPE       |REQUIRED      |DESCRIPTION|
 |----------|-----------|--------------|-----------|
 |MAC       |string     |Y             |目标设备的MAC地址 |

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