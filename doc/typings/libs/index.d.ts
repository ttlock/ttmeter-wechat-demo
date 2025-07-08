/**
 * @document TTLock Wechat Plugin for bluetooth meter
 * @author Simonrate. Ye
 * @date 2025-03-05 12:38:49
 * @copyright Copyright(C) 2025 Hangzhou Sciener Smart Technology Co. Ltd.
 **/
/// <reference path="./options/index.d.ts" />

/**
 * 通用接口导出列表
 */
declare interface TTMeterPlugin {
	/**
	 * @description Current version of TTMeterPlugin
	 * @since 0.0.1
	 */
	VERSION: string;
	/**
	 * @description Set log switch and callback method
	 * @param open -Log switch
	 * @param callback -Logging callback
	 * @since 0.0.3
	 */
	setShowLog(open: boolean, callback: TTMeter.LogCallback): void;
	
	/**
	 * @description Set remote server address and related parameters.
	 * @param clientInfo -Server address and related parameters
	 * @since 0.0.3
	 */
	setClientParam(clientInfo: TTMeter.ClientInfo): boolean;
	
	/**
	 * @description Initialize bluetooth callback methods(Universal)
	 * @param option -Bluetooth callback methods
	 * @since 0.0.3
	 */
	init(option: TTMeter.Init): Promise<TTMeterError>;
	/**
	 * @description Stop scanning for Bluetooth devices(Universal)
	 * @since 0.0.3
	 */
	stopScan(): Promise<TTMeterError>;
	/**
	 * @description Release Bluetooth resources after batch operations are completed(Universal)
	 * @since 0.0.3
	 */
	finishOperations(): Promise<TTMeterError>;
	/**
	 * @description Stop all BLE operations of plugin(Universal)
	 * @since 0.0.4
	 */
	stopAllOperations(): Promise<TTMeterError>;
	
	/**
	 * @description Interfaces for electric meters.
	 * @since 0.0.3
	 */
	TTElectricMeter: TTMeter.ElectricMeter;
	
	/**
	 * @description Interfaces for water meters.
	 * @since 0.0.4
	 */
	TTWaterMeter: TTMeter.WaterMeter;
}