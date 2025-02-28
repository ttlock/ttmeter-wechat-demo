# 通通水电表智能电表组件说明（version: 1.0.0)  

### Component引入  
```
    "usingComponents": {
        "ttmeter-elec": "plugin://ttmeter-plugin/ttmeter-elec"
    }
```  

### 绑定参数  
 |NAME          |TYPE           |VERSION        |DESCRIPTION|
 |--------------|---------------|---------------|-----------|
 |log           |boolean        |1.0.0          |是否启用日志回调方法(setData可触发修改)|  

### 回调事件  
 |EVENT             |EVENT.detail                                                   |VERSION        |DESCRIPTION|
 |------------------|---------------------------------------------------------------|---------------|-----------|
 |ready             |void                                                           |1.0.0          |组件准备完成|
 |info              |...args                                                        |1.0.0          |日志回调|
 |disconnect        |WechatMiniprogram.OnBLEConnectionStateChangeListenerResult     |1.0.0          |设备断开连接|
 |changeNetwork     |WechatMiniprogram.OnNetworkWeakChangeListenerResult            |1.0.0          |网络状态变化|
 |changeBleAdapter  |WechatMiniprogram.OnBluetoothAdapterStateChangeListenerResult  |1.0.0          |蓝牙适配器状态变化|  


### 外部调用方法  
```
    function setServerInfo(params: TTServerInfo): boolean; // 设置服务器参数(1.0.0)
    function scanBLEElecMeter(MAC: string): TTMeterError; // 扫描蓝牙智能电表(1.0.0)
    function connectBLEElecMeter(MAC: string): TTMeterError; // 连接蓝牙智能电表(1.0.0)
    function handleFinishOperations(): TTMeterError; // 操作结束断连设备连接并释放资源(1.0.0)
    function syncElecMeterState(option?: TTMeterSyncElectricState): TTMeterError; // 智能电表抄表(1.0.0)
    function chargeElecMeter(option: TTMeterElectricRecharge): TTMeterError; // 智能电表充值(1.0.0)
    function setElecMeter(option: TTMeterSetElectric): TTMeterError; // 设置电表电量(1.0.0)
```  
##### 接口详细说明  
 1. [设置服务器参数：setServerInfo](../api/setServerInfo.md)  
 2. [扫描定位蓝牙智能电表：scanBLEElecMeter](../api/scanBLEElecMeter.md)  
 3. [连接蓝牙智能电表：connectBLEElecMeter](../api/connectBLEElecMeter.md)  
 4. [操作结束断连设备连接并释放资源：handleFinishOperations](../api/handleFinishOperations.md)  
 5. [智能电表抄表：syncElecMeterState](../api/syncElecMeterState.md)  
 6. [智能电表充值：chargeElecMeter](../api/chargeElecMeter.md)  
 7. [设置电表电量：setElecMeter](../api/setElecMeter.md)  