/** 
 * @description 插件返回错误码声明
 * @since 0.0.1
 */
export const E = {
    "OK": 0, // Success.(0.0.1)
	"CRC_ERROR": 1, // [智能电表][智能水表] CRC error.(0.0.1)
	"DATA_TRANS_FAIL": 2, // [智能电表][智能水表]数据解析失败(0.0.1)
	"DATA_LEN_ERROR": 3, // [智能电表][智能水表]数据长度不正确(0.0.1)
	"INVALID_PARAMS": 4, // [智能电表][智能水表]Invalid params.(0.0.1)
	"DYNAMIC_CODE_ERROR": 5, // [智能电表][智能水表]Invalid dynamic code.(0.0.1)
	"DUPLICATE_ORDER": 6, // [智能电表][智能水表]Duplicate order number.(0.0.1)
	"UNDEFINED_ERROR": 19, // [智能电表][智能水表]Failed. Undefined error.(0.0.1)
	"INVALID_COMMAND": 27, // [智能电表][智能水表]Invalid command.(0.0.1)
    "BT_DISCONNECT": 10003, // [蓝牙][设备断连]设备已断开连接(0.0.4)
	"WX_VERSION_ERROR": 10101, // [设备平台][微信版本]微信版本过低，最低版本号：${requsetStatus}(0.0.4)
	"SDK_VERSION_ERROR": 10102, // [设备平台][微信SDK]微信基础库版本过低，最低版本号：${requsetStatus}(0.0.4) -10038
	"NETWORK_ERROR": 10301, // [网络请求]网络异常(0.0.4)
	"INVALID_REQUEST_DOMAIN": 10302, // [网络请求]网络请求失败，请检查域名是否已列入白名单(0.0.4)
	"SERVER_NO_CONFIG": 10303, // [网络请求]无效的请求地址，服务器参数未配置(0.0.4)
	"INVALID_REQUEST_URL": 10304, // [网络请求]无效的请求地址(0.0.4)
	"REQUEST_API_FAILED": 10305, // [网络请求][状态码]`网络请求失败，状态码：${requsetStatus}`(状态码错误)(0.0.4)
	"SERVER_RES_ERROR": 10307, // [网络请求][服务器返回值]`操作失败，服务器返回错误码：${requsetStatus}`(服务器错误码) TTMeterError.data返回服务器错误信息(0.0.4)
	"MINIPROGRAM_AUTH_DENY": 10401, // [权限开关][小程序授权][小程序蓝牙授权]用户已拒绝小程序【蓝牙】授权(0.0.4) - 10039 - 401
	"BT_SWITCH_ERROR": 10402, // [系统开关][蓝牙开关]请打开系统【蓝牙】开关(0.0.4) -10012
	"LOCATION_SWITCH_ERROR": 10403, // [系统开关][位置开关][Android][设备扫描]请打开系统【位置信息】开关(0.0.4) - 10046
	"BT_SCAN_TIMEOUT_ANDROID": 10404, // [权限开关][Android][设备扫描][附近设备授权][扫描超时]设备扫描超时，请在系统设置中检查微信【附近设备】权限是否已授予，并确认设备已在附近(半防错)(0.0.4) - 404
	"BT_CONNECT_TIMEOUT_ANDROID": 10405, // [权限开关][Android][连接超时][附近设备授权]设备连接超时，请在系统设置中检查微信【附近设备】权限是否已授予，并确认设备已在附近(0.0.4) - 10042 - 405
	"LOCAL_DEVICE_AUTH_DENY": 10406, // [权限开关][Android][附近设备授权]用户已拒绝授权，请检查系统设置中微信【附近设备】权限是否已授予(0.0.4) - 10043 - 402
	"LOCATION_AUTH_DENY": 10407, // [权限开关][Android][设备扫描][位置授权]用户已拒绝授权，请检查系统设置中微信【位置信息】权限是否已授予(部分设备无法分辨是否已授予精确位置，则返回该错误码)(0.0.4) - 10015 - 403
	"DETAIL_LOCATION_AUTH_DENY": 10408, // [权限开关][Android][设备扫描][精确位置授权]用户已拒绝授权，请检查系统设置中微信【精确位置信息】权限是否已授予(0.0.4) - 10044
	"BLUETOOTH_AUTH_DENY": 10409, // [权限开关][iOS][蓝牙授权]用户已拒绝授权，请检查系统设置中微信【蓝牙】权限是否已授予(0.0.4) -10014
	"BT_SCAN_TIMEOUT": 10501, // [蓝牙][设备扫描][iOS][设备ID转换]搜索不到设备，已停止搜索，请确认设备是否已在附近(0.0.4) -10036
	"BT_CONNECT_TIMEOUT": 10502, // [蓝牙][连接超时]蓝牙连接超时，请确认设备已在附近(通用超时，重连)(0.0.4) -10002
	"BT_CONNECT_FAIED": 10503, // [蓝牙][设备连接失败]蓝牙连接失败，请重试(半防错)(0.0.4)
	"BT_CONN_FAILED_133": 10504, // [蓝牙][设备连接][Android][status 133]蓝牙连接失败，请重试(Android 133错误)(0.0.4) - 10045
	"BT_WRITE_ERROR": 10505, // [蓝牙][设备通信][数据发送]数据发送失败，请稍后重试(数据列表为空)(0.0.4) - 10004
	"BT_RECEIVE_TIMEOUT": 10506, // [蓝牙][设备通信][数据接收]设备通信超时未响应(0.0.4) - 10017
	"BT_CHAR_ERROR": 10508, // [蓝牙][特征值]通信失败，无法启用蓝牙特征值(0.0.4)
	"BT_SERVICE_NO_EXIST": 10513, // [蓝牙][蓝牙服务]通信失败，蓝牙服务不存在(0.0.4)
	"BT_CHAR_NO_EXIST": 10514, // [蓝牙][设备通信][特征值]蓝牙特征值不存在(0.0.4) - 10018
	"BT_ALREAY_CONNECTED": 10601, // [蓝牙连接]设备已连接上，无需重连(0.0.4)
	"BT_ERROR_CONNECTED_DEVICE": 10602, // [蓝牙连接]目标设备与当前已连接的设备不符(0.0.4)
	"BT_NOT_CONNECTED": 10603, // [蓝牙连接]设备未连接，请先连接设备(0.0.4) - 502
    "PLATFORM_ERROR": 11002, // [设备平台]设备平台不支持蓝牙操作(0.0.4)
    "PARAMS_ERROR": 11003, // [参数]参数错误(0.0.4)
    "API_BUSY": 11013, // [蓝牙][状态控制]蓝牙正在操作中，请稍候再试(0.0.4)
	"BLE_OPEN_ADAPTER_FAILED": 13001, // [接口防错]启用蓝牙适配器失败(0.0.4) - 10030
	"BLE_CLOSE_ADAPTER_FAILED": 13002, // [接口防错]关闭蓝牙适配器失败(0.0.4) - 10040
	"BLE_START_SCAN_FAILED": 13003, // [接口防错]开启蓝牙设备扫描失败(0.0.4) -10041
	"BLE_STOP_SCAN_FAILED": 13004, // [接口防错]停止蓝牙设备扫描失败(0.0.4) - 10031
	"BLE_CREATE_CONN_FAILED": 13005, // [接口防错]设备连接失败(0.0.4) -10007
	"BLE_CLOSE_CONN_FAILED": 13006, // [接口防错]断开蓝牙设备连接失败(0.0.4) -10008
	"BLE_GET_SERVICES_FAILED": 13007, // [接口防错][蓝牙服务]获取蓝牙服务列表失败(0.0.4)
	"BLE_GET_CHAR_FAILED": 13008, // [接口防错][特征值]获取蓝牙特征值列表失败(0.0.4)
	"BLE_WRITE_CHAR_FAILED": 13009, // [接口防错]数据发送失败(0.0.4) -10033
	"BLE_NOTIFY_CHAR_FAILED": 13010, // [接口防错]启用蓝牙特征值notify服务失败（蓝牙通信失败）(0.0.4)-10032
	"BLE_READ_CHAR_FAILED": 13011, // [接口防错][数据发送]读取蓝牙特征值失败(0.0.4)
	"REQUEST_FAILED": 13012, // [接口防错]网络请求失败(0.0.4) -11101
	"DOWNLOAD_FAILED": 13013, // [接口防错]文件下载失败(0.0.4)
	"GET_NETWORK_TYPE_FAILED": 13014, // [接口防错]查询网络状态失败(0.0.4)
    "FAIL": 99999, // [防错错误码]Operation failed.(0.0.4)
} as const;

/** 错误码提示语(0.0.1) */
const M = (requsetStatus?: number | string): Record<number, string> => ({
	[E.OK]: "Success.",
	[E.CRC_ERROR]: "CRC error.", // [智能电表][智能水表]
	[E.DATA_TRANS_FAIL]: "数据解析失败", // [智能电表][智能水表]
	[E.DATA_LEN_ERROR]: "数据长度不正确", // [智能电表][智能水表]
	[E.INVALID_PARAMS]: "Invalid params.", // [智能电表][智能水表]
	[E.DYNAMIC_CODE_ERROR]: "Invalid dynamic code.", // [智能电表][智能水表]
	[E.DUPLICATE_ORDER]: "Duplicate order number.", // [智能电表][智能水表]
	[E.UNDEFINED_ERROR]: "Failed. Undefined error.", // [智能电表][智能水表]
	[E.INVALID_COMMAND]: "Invalid command.", // [智能电表][智能水表]
	[E.BT_DISCONNECT]: "设备已断开连接", // [智能电表][智能水表]
	[E.WX_VERSION_ERROR]: `微信版本过低，最低版本号：${requsetStatus}`, // [设备平台][微信版本]
	[E.SDK_VERSION_ERROR]: `微信基础库版本过低，最低版本号：${requsetStatus}`, // [设备平台][微信SDK]
	[E.NETWORK_ERROR]: "网络异常", // [网络请求]
	[E.INVALID_REQUEST_DOMAIN]: "网络请求失败，请检查域名是否已列入白名单", // [网络请求]
	[E.SERVER_NO_CONFIG]: "无效的请求地址，服务器参数未配置", // [网络请求]
	[E.INVALID_REQUEST_URL]: "无效的请求地址", // [网络请求]
	[E.REQUEST_API_FAILED]: `网络请求失败，状态码：${requsetStatus}`, // [网络请求][状态码] 状态码错误
	[E.SERVER_RES_ERROR]: `操作失败，服务器返回错误码：${requsetStatus}`, // [网络请求][服务器返回值] 服务器错误码
	[E.MINIPROGRAM_AUTH_DENY]: "用户已拒绝小程序【蓝牙】授权", // [权限开关][小程序授权][小程序蓝牙授权]
	[E.BT_SWITCH_ERROR]: "请打开系统【蓝牙】开关", // [系统开关][蓝牙开关]
	[E.LOCATION_SWITCH_ERROR]: "请打开系统【位置信息】开关", // [系统开关][位置开关][Android][设备扫描]请打开系统【位置信息】开关
	[E.BT_SCAN_TIMEOUT_ANDROID]: "设备扫描超时，请在系统设置中检查微信【附近设备】权限是否已授予，并确认设备已在附近", // [权限开关][Android][设备扫描][附近设备授权][扫描超时] (半防错)
	[E.BT_CONNECT_TIMEOUT_ANDROID]: "设备连接超时，请在系统设置中检查微信【附近设备】权限是否已授予，并确认设备已在附近", // [权限开关][Android][连接超时][附近设备授权]
	[E.LOCAL_DEVICE_AUTH_DENY]: "用户已拒绝授权，请检查系统设置中微信【附近设备】权限是否已授予", // [权限开关][Android][附近设备授权]
	[E.LOCATION_AUTH_DENY]: "用户已拒绝授权，请检查系统设置中微信【位置信息】权限是否已授予", // [权限开关][Android][设备扫描][位置授权] 部分设备无法分辨是否已授予精确位置，则返回该错误码
	[E.DETAIL_LOCATION_AUTH_DENY]: "用户已拒绝授权，请检查系统设置中微信【精确位置信息】权限是否已授予", // [权限开关][Android][设备扫描][精确位置授权]
	[E.BLUETOOTH_AUTH_DENY]: "用户已拒绝授权，请检查系统设置中微信【蓝牙】权限是否已授予", // [权限开关][iOS][蓝牙授权]
	[E.BT_SCAN_TIMEOUT]: "搜索不到设备，已停止搜索，请确认设备是否已在附近", // [蓝牙][设备扫描][iOS][设备ID转换]
	[E.BT_CONNECT_TIMEOUT]: "蓝牙连接超时，请确认设备已在附近", // [蓝牙][连接超时]通用超时，重连
	[E.BT_CONNECT_FAIED]: "蓝牙连接失败，请重试", // [蓝牙][设备连接失败](半防错)
	[E.BT_CONN_FAILED_133]: "蓝牙连接失败，请重试(Android 133)", // [蓝牙][设备连接][Android][status 133]
	[E.BT_WRITE_ERROR]: "数据发送失败，请稍后重试", // [蓝牙][设备通信][数据发送]
	[E.BT_RECEIVE_TIMEOUT]: "设备通信超时未响应", // [蓝牙][设备通信][数据接收]
	[E.BT_CHAR_ERROR]: "通信失败，无法启用蓝牙特征值", // [蓝牙][特征值]通信失败，无法启用蓝牙特征值
	[E.BT_SERVICE_NO_EXIST]: "通信失败，蓝牙服务不存在", // [蓝牙][蓝牙服务]通信失败，蓝牙服务不存在
	[E.BT_CHAR_NO_EXIST]: "蓝牙特征值不存在", // [蓝牙][设备通信][特征值]蓝牙特征值不存在
	[E.BT_ALREAY_CONNECTED]: "设备已连接上，无需重连", // [蓝牙连接]
	[E.BT_ERROR_CONNECTED_DEVICE]: "目标设备与当前已连接的设备不符", // [蓝牙连接]目标设备与当前已连接的设备不符
	[E.BT_NOT_CONNECTED]: "设备未连接，请先连接设备", // [蓝牙连接]
	[E.PLATFORM_ERROR]: "设备平台不支持蓝牙操作", // [设备平台]
	[E.PARAMS_ERROR]: "Params error.", // [参数]
	[E.API_BUSY]: "蓝牙正在操作中，请稍候再试", // [蓝牙][状态控制]
	[E.BLE_OPEN_ADAPTER_FAILED]: "启用蓝牙适配器失败", // [接口防错]
	[E.BLE_CLOSE_ADAPTER_FAILED]: "关闭蓝牙适配器失败", // [接口防错]
	[E.BLE_START_SCAN_FAILED]: "开启蓝牙设备扫描失败", // [接口防错]
	[E.BLE_STOP_SCAN_FAILED]: "停止蓝牙设备扫描失败", // [接口防错]
	[E.BLE_CREATE_CONN_FAILED]: "设备连接失败", // [接口防错]
	[E.BLE_CLOSE_CONN_FAILED]: "断开蓝牙设备连接失败", // [接口防错]
	[E.BLE_GET_SERVICES_FAILED]: "获取蓝牙服务列表失败", // [接口防错][蓝牙服务]
	[E.BLE_GET_CHAR_FAILED]: "获取蓝牙特征值列表失败", // [接口防错][特征值]
	[E.BLE_WRITE_CHAR_FAILED]: "数据发送失败", // [接口防错]
	[E.BLE_NOTIFY_CHAR_FAILED]: "启用蓝牙特征值notify服务失败", // [接口防错]蓝牙通信失败
	[E.BLE_READ_CHAR_FAILED]: "读取蓝牙特征值失败", // [接口防错][数据发送]
	[E.REQUEST_FAILED]: "网络请求失败", // [接口防错]网络请求失败
	[E.DOWNLOAD_FAILED]: "文件下载失败", // [接口防错]
	[E.GET_NETWORK_TYPE_FAILED]: "查询网络状态失败", // [接口防错]查询网络状态失败
	[E.FAIL]: "Operation failed.", // [防错错误码]
})

