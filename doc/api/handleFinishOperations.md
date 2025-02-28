# 通通水电表接口说明-断开已连接的设备  

## 方法
```
    function handleFinishOperations(): Promise<TTMeterError>;
```

### 功能描述   
 1. 断开已连接的智能设备  
 2. 插件版本：**1.0.0**开始支持  
 3. 该接口支持[requirePlugin模式](../../README.md)和[Component模式](../组件调用方式说明.md)  

### 特殊说明   
 1. 调用时设备需处于**已连接状态**  
 2. 若调用时设备未处于连接状态，则返回错误码  
 3. 批量接口调用结束后，请及时调用该接口释放蓝牙资源

### 参数说明  
 void

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