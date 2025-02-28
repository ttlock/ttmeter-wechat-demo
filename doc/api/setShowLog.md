# 通通水电表接口说明-设置日志回调  

## 方法
```
    function setShowLog(open: boolean, callback: (...args: any | void) => void): void;
```

### 功能描述   
 1. 设置日志回调开关及回调方法  
 2. 插件版本：**1.0.0**开始支持  
 3. 该接口仅支持[requirePlugin模式](../../README.md)调用，组件化调用请使用[绑定参数设置](../components/ttmeter-elec.md)  

### 参数说明 
##### option参数说明 TTMeterInit 
 |PARAMS    |TYPE                               |REQUIRED      |DESCRIPTION|
 |----------|-----------------------------------|--------------|-----------|
 |open      |boolean                            |Y             |是否启用日志回调|
 |callback  |(...args) => void                  |Y             |日志回调方法|  

### 返回值
 无

## 相关链接  
 1. [常规调用方式说明](../../README.md)  
 2. [组件调用方式说明](../组件调用方式说明.md)  

### 版本更新内容
#### **1.0.0**  
    1. 初始化版本  