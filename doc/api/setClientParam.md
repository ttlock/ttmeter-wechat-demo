# 通通水电表接口说明-配置远程服务器请求信息  

## 方法
```
    function setClientParam(clientInfo: TTMeter.ClientInfo): boolean;
```

### 功能描述   
 设置远程服务器地址及相关应用参数  

### 版本支持   
 插件版本 **0.0.3** 开始支持  

### 特殊说明   
 1. 该接口不判断服务器数据是否真实可用  
 2. 当切换设备类型时需先调用该接口  

### 参数说明 
##### clientInfo参数说明 TTMeter.ClientInfo  
 |PARAMS        |TYPE       |REQUIRED      |DESCRIPTION|
 |--------------|-----------|--------------|-----------|
 |url           |string     |Y             |服务器指令接口地址 |
 |clientId      |string     |Y             |应用对应的clientId, 请从开放平台获取|
 |clientSecret  |string     |N             |应用对应的clientSecret, 请从开放平台获取|
 |packageName   |string     |N             |应用包名, 请从开放平台获取|
 |accessToken   |string     |N             |用户登录令牌(若接口需要登录时则必传)|
 |uid           |number     |N             |用户登录ID(若接口需要登录时则必传)|  

### 返回值
 boolean（true -配置成功，false -配置失败）  

## 相关链接  
 1. [常规调用方式说明](../../README.md)  
 2. [错误码及常见问题处理方式](../错误码说明.md)  
 3. [版本更新说明](../版本更新说明.md)  

## 版本更新内容
#### **0.0.3**  
    1. 初始化版本  