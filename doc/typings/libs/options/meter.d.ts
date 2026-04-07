/// <reference path="./base.d.ts" />

/**
 * @description The interfaces and parameters for meters
 * @since 0.0.3
 */
declare namespace TTMeter {
	/**
	 * @description Logging callback
	 * @since 0.0.3
	 */
	type LogCallback = (...args: any | void) => void;
	
	/**
	 * @description Information for Network status change.
	 * @since 0.0.3
	 * @see WechatMiniprogram.OnNetworkWeakChangeListenerResult
	 */
	interface OnNetworkWeakChangeListenerResult {
	    networkType?: string;
	    weakNet?: boolean;
	}
	/**
	 * @description Information for Bluetooth adapter state change.
	 * @since 0.0.3
	 * @see WechatMiniprogram.OnBluetoothAdapterStateChangeListenerResult
	 */
	interface OnBluetoothAdapterStateChangeListenerResult {
	    available?: boolean;
	    discovering?: boolean;
	}
	/**
	 * @description Information for Device disconnection.
	 * @since 0.0.3
	 * @see WechatMiniprogram.OnBLEConnectionStateChangeListenerResult
	 */
	interface OnBLEConnectionStateChangeListenerResult {
	    connected?: boolean
	    deviceId?: string
	}
	
	/**
	 * @description Remote server address and related parameters.
	 * @since 0.0.3
	 */
	interface ClientInfo {
		/**
		 * @description Remote interface address
		 * @since 0.0.3
		 */
	    url: string;
		/**
		 * @description Application Client ID
		 * @since 0.0.3
		 */
	    clientId: string;
		/**
		 * @description Application Client Secret
		 * @since 0.0.3
		 */
	    clientSecret?: string;
		/**
		 * @description Package name of Application
		 * @since 0.0.3
		 */
	    packageName?: string;
		/**
		 * @description Access token of your account
		 * @since 0.0.3
		 */
		accessToken?: string;
		/**
		 * @description User's ID
		 * @since 0.0.3
		 */
		uid?: number;
	}
	
	/**
	 * @description Device information scanned by Bluetooth
	 * @since 0.0.3
	 */
	interface DeviceModel {
		/** 
		 * @description Bluetooth Name
		 * @since 0.0.3
		 */
		name?: string;
		/**
		 * @description MAC Address, Format: AA:BB:CC:DD:EE:FF
		 * @since 0.0.3
		 */
		mac?: string;
		/**
		 * @description Bluetooth signal value
		 * @since 0.0.3
		 */
		RSSI?: number;
		/**
		 * @description A boolean value indicating whether the device has been added to the system.
		 * @since 0.0.3
		 */
		isInited?: boolean;
		/**
		 * @description The timestamp indicating when the device was scanned.
		 * @since 0.0.3
		 */
		scanTime?: number;
        /**
		 * @description Protocol version number, 1 - Version 1, 2 - Version 2
		 * @since 1.1.0
		 */
		type?: number;
		/**
		 * @description Execute command response message
		 * @since 1.1.0
		 */
		executeResponse?: string;
	}
	/**
	 * @description Meter scan callback
	 * @since 0.0.3
	 */
	type OnDeviceFound = (result: DeviceModel) => void;
	/**
	 * @description (Android)Scan timed out and no device was found
	 * @since 0.0.3
	 */
	type OnNoDeviceFound = (result: TTMeterError) => void;
	
	/**
	 * @description Bluetooth callback methods
	 * @since 0.0.3
	 */
	interface Init {
		/**
		 * @description Network status change callback
		 * @since 0.0.3
		 */
	    onNetworkWeakChange?: (result?: OnNetworkWeakChangeListenerResult) => void;
		/**
		 * @description Bluetooth adapter state change callback
		 * @since 0.0.3
		 */
	    onBluetoothAdapterStateChange?: (result?: OnBluetoothAdapterStateChangeListenerResult) => void;
		/**
		 * @description Device disconnection callback
		 * @since 0.0.3
		 */
	    onBLEDisconnect?: (result?: OnBLEConnectionStateChangeListenerResult) => void;
	}
	
	/**
	 * 智能电表相关导出接口列表
	 */
	interface ElectricMeter {
		/**
		 * @description Start scanning for electric meters.
		 * @param callbacks -Electric meter scanning parameters
		 * @since 0.0.3
		 */
		startScan(callbacks: TTElectricMeter.Scan): Promise<TTMeterError>;
		/**
		 * @description Locate dist electric meter.
		 * @param mac -MAC Address of Electric meter, Format: AA:BB:CC:DD:EE:FF
		 * @since 0.0.3
		 */
		locate(mac: string): Promise<TTMeterError>;
		/**
		 * @description Connect to dist electric meter.
		 * @param mac -MAC Address of Electric meter, Format: AA:BB:CC:DD:EE:FF
		 * @since 0.0.3
		 */
		connect(mac: string): Promise<TTMeterError>;
		
		/**
		 * @description Add bluetooth electric meter to account
		 * @param info -Parameters  carried when initialize a bluetooth electric meter
		 * @since 0.0.3
		 */
		add(option: TTElectricMeter.Add): Promise<TTMeterError>;
		
		/**
		 * @description Delete bluetooth electric meter from account
		 * @param option -Parameters carried when deleting a bluetooth electric meter
		 * @since 0.0.3
		 */
		delete(option?: TTElectricMeter.Delete): Promise<TTMeterError>;
		
		/**
		 * @description Set the power on/off status of the bluetooth electric meter
		 * @param option -Parameters
		 * @since 0.0.3
		 */
		setPowerOnOff(option: TTElectricMeter.SetPowerOnOff): Promise<TTMeterError>
		
		/**
		 * @description Set the remaining power of the bluetooth electric meter
		 * @param option -Parameters
		 * @since 0.0.3
		 */
		setRemainingElectricity(option: TTElectricMeter.SetRemainingElectricity): Promise<TTMeterError>;
		
		/**
		 * @description Clear the power consumption data of the bluetooth electric meter
		 * @param option -Parameters
		 * @since 0.0.3
		 */
		clearRemainingElectricity(option?: TTElectricMeter.ClearRemainingElectricity): Promise<TTMeterError>;
		
		/**
		 * @description Read bluetooth electric meter data
		 * @param option -Parameters
		 * @since 0.0.3
		 */
		readData(option?: TTElectricMeter.ReadData): Promise<TTMeterError>;
		
		/**
		 * @description Set up the bluetooth electric meter payment mode
		 * @param option -Parameters
		 * @since 0.0.3
		 */
		setPayMode(option: TTElectricMeter.SetPayMode): Promise<TTMeterError>;
		
		/**
		 * @description Bluetooth electric meter recharge
		 * @param option -Parameters
		 * @since 0.0.3
		 */
		recharge(option: TTElectricMeter.Recharge): Promise<TTMeterError>;
		
		/**
		 * @description Set the maximum power threshold for the bluetooth electric meter
		 * @param option -Parameters
		 * @since 0.0.3
		 */
		setMaxPower(option: TTElectricMeter.SetMaxPower): Promise<TTMeterError>;
		
		/**
		 * @description Query the characteristic values of bluetooth electric meter
		 * @param option -Parameters
		 * @since 0.0.3
		 */
		getFeatureValue(option?: TTElectricMeter.GetFeatureValue): Promise<TTMeterError>;
	}
	
	/**
	 * 智能水表相关导出接口列表
	 */
	interface WaterMeter {
		/**
		 * @description Start scanning for water meters.
		 * @param callbacks -Water meter scanning parameters
		 * @since 0.0.4
		 */
		startScan(callbacks: TTWaterMeter.Scan): Promise<TTMeterError>;
		/**
		 * @description Locate dist water meter.
		 * @param mac -MAC Address of Water meter, Format: AA:BB:CC:DD:EE:FF
		 * @since 0.0.4
		 */
		locate(mac: string): Promise<TTMeterError>;
		/**
		 * @description Connect to dist water meter.
		 * @param mac -MAC Address of Water meter, Format: AA:BB:CC:DD:EE:FF
		 * @since 0.0.4
		 */
		connect(mac: string): Promise<TTMeterError>;
		
		/**
		 * @description Add bluetooth water meter to account
		 * @param info -Parameters  carried when initialize a bluetooth water meter
		 * @since 0.0.4
		 */
		add(option: TTWaterMeter.Add): Promise<TTMeterError>;
		
		/**
		 * @description Delete bluetooth water meter from account
		 * @param option -Parameters carried when deleting a bluetooth water meter
		 * @since 0.0.4
		 */
		delete(option?: TTWaterMeter.Delete): Promise<TTMeterError>;
		
		/**
		 * @description Set the water on/off status of the bluetooth water meter
		 * @param option -Parameters
		 * @since 0.0.4
		 */
		setWaterOnOff(option: TTWaterMeter.SetWaterOnOff): Promise<TTMeterError>
		
		/**
		 * @description Set the remaining power of the bluetooth water meter
		 * @param option -Parameters
		 * @since 0.0.4
		 */
		setRemainingWater(option: TTWaterMeter.SetRemainingWater): Promise<TTMeterError>;
		
		/**
		 * @description Clear the power consumption data of the bluetooth water meter
		 * @param option -Parameters
		 * @since 0.0.4
		 */
		clearRemainingWater(option?: TTWaterMeter.ClearRemainingWater): Promise<TTMeterError>;
		
		/**
		 * @description Read bluetooth water meter data
		 * @param option -Parameters
		 * @since 0.0.4
		 */
		readData(option?: TTWaterMeter.ReadData): Promise<TTMeterError>;
		
		/**
		 * @description Set up the bluetooth water meter payment mode
		 * @param option -Parameters
		 * @since 0.0.4
		 */
		setPayMode(option: TTWaterMeter.SetPayMode): Promise<TTMeterError>;
		
		/**
		 * @description Bluetooth water meter recharge
		 * @param option -Parameters
		 * @since 0.0.4
		 */
		recharge(option: TTWaterMeter.Recharge): Promise<TTMeterError>;
		
		/**
		 * @description Set the bottom value for the bluetooth water meter
		 * @param option -Parameters
		 * @since 0.0.4
		 */
		setTotalUsage(option: TTWaterMeter.SetTotalUsage): Promise<TTMeterError>;
		
		/**
		 * @description Query the characteristic values of bluetooth water meter
		 * @param option -Parameters
		 * @since 0.0.4
		 */
		getFeatureValue(option?: TTWaterMeter.GetFeatureValue): Promise<TTMeterError>;
	}
}