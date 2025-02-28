# 通通水电表接口说明-设置服务器地址及相关应用参数  

## 方法
```
    function setServerInfo(option: TTServerInfo): boolean;
```

### 功能描述   
 1. 设置远程服务器地址及相关应用参数  
 2. 插件版本：**1.0.0**开始支持  
 3. 该接口仅支持[Component模式](../components/ttmeter-elec.md)调用，常规调用请参考[初始化蓝牙接口：init](init.md)  
 4. **该接口不判断服务器数据是否真实可用**  

### 参数说明 
##### option参数说明 TTServerInfo 
 |PARAMS                |TYPE                      |REQUIRED      |DESCRIPTION|
 |----------------------|--------------------------|--------------|-----------|
 |host                  |string                    |N             |服务器域名或前置接口段, 默认 "https://mini.sciener.cn", 本地化对接需额外配置 |
 |clientId              |string                    |Y             |应用对应的clientId, 请从开放平台获取|
 |clientSecret          |string                    |Y             |应用对应的clientSecret, 请从开放平台获取|
 |packageName           |string                    |Y             |应用包名, 请从开放平台获取|  

### 返回值
 boolean  是否配置成功

## 相关链接  
 1. [常规调用方式说明](../../README.md)  
 2. [组件调用方式说明](../组件调用方式说明.md)  

### 版本更新内容
#### **1.0.0**  
    1. 初始化版本  