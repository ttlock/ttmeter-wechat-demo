/**
 * @document TTLock Wechat Plugin for bluetooth meter
 * @author Simonrate. Ye
 * @date 2025-03-05 12:38:49
 * @copyright Copyright(C) 2025 Hangzhou Sciener Smart Technology Co. Ltd.
 *
 * @note 本文件为全局环境声明(ambient declarations)：文件内禁止出现任何顶层import/export语句，
 *       否则整个文件将被视为模块，所有全局声明立即失效。
 *       模块式引用请使用文件末尾的 declare module "ttmeter-plugin" 声明，
 *       运行时仍需通过 requirePlugin("ttmeter-plugin") 获取插件实例，import仅用于类型引入。
 **/

/**
 * @description Routine callback info passed to the function after execution
 * @since 0.0.1
 */
declare interface TTMeterError<T = any> {
	/**
	 * @description Error code of TTMeterPlugin
	 * @since 0.0.1
	 */
	errCode: number;
	/**
	 * @description Error message
	 * @since 0.0.1
	 */
	errMsg: string;
	/**
	 * @description Detailed explanation or additional context for the error
	 * @since 0.0.1
	 */
	description?: string;
	/**
	 * @description Name of the internal interface where the error occurred
	 * @since 0.0.1
	 */
	wxInterface?: string;
	/**
	 * @description Additional data or payload associated with the error
	 * @since 0.0.1
	 */
	data?: T;
}


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
	 * @description The data of getFeatureValue result, returned by TTMeterError.data
	 * @since 1.3.0
	 */
	interface FeatureValueData {
		/**
		 * @description Feature value
		 * @since 1.3.0
		 */
		featureValue?: string;
	}

	/**
	 * @description The data of getDeviceInfo result, returned by TTMeterError.data
	 * @since 1.3.0
	 */
	interface DeviceInfoData {
		/**
		 * @description Cat.1 card number
		 * @since 1.3.0
		 */
		catOneCardNumber?: string;
		/**
		 * @description Cat.1 phone number
		 * @since 1.3.0
		 */
		catOneImsi?: string;
		/**
		 * @description Cat.1 module number
		 * @since 1.3.0
		 */
		catOneNodeId?: string;
		/**
		 * @description Cat.1 operator
		 * @since 1.3.0
		 */
		catOneOperator?: string;
		/**
		 * @description Cat.1 signal strength
		 * @since 1.3.0
		 */
		catOneRssi?: number;
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
		 * @description Keep the connection with the bluetooth electric meter
		 * @since 1.2.0
		 */
		keepConnection(): Promise<TTMeterError>;

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
		getFeatureValue(option?: TTElectricMeter.GetFeatureValue): Promise<TTMeterError<TTMeter.FeatureValueData>>;

		/**
		 * @description Reset the bluetooth electric meter
		 * @param option -Parameters
		 * @since 1.3.0
		 */
		reset(option?: TTElectricMeter.Reset): Promise<TTMeterError>;

		/**
		 * @description Get the device information of bluetooth electric meter
		 * @param option -Parameters
		 * @since 1.3.0
		 */
		getDeviceInfo(option?: TTElectricMeter.GetDeviceInfo): Promise<TTMeterError<TTMeter.DeviceInfoData>>;

		/**
		 * @description Configure the APN of bluetooth electric meter
		 * @param option -Parameters
		 * @since 1.3.0
		 */
		configApn(option: TTElectricMeter.ConfigAPN): Promise<TTMeterError>;

		/**
		 * @description Configure the remote server address of bluetooth electric meter
		 * @param option -Parameters
		 * @since 1.3.0
		 */
		configServer(option: TTElectricMeter.ConfigServer): Promise<TTMeterError>;
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
		 * @description Keep the connection with the bluetooth water meter
		 * @since 1.2.0
		 */
		keepConnection(): Promise<TTMeterError>;

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
		getFeatureValue(option?: TTWaterMeter.GetFeatureValue): Promise<TTMeterError<TTMeter.FeatureValueData>>;

		/**
		 * @description Reset the bluetooth water meter
		 * @param option -Parameters
		 * @since 1.3.0
		 */
		reset(option?: TTWaterMeter.Reset): Promise<TTMeterError>;

		/**
		 * @description Get the device information of bluetooth water meter
		 * @param option -Parameters
		 * @since 1.3.0
		 */
		getDeviceInfo(option?: TTWaterMeter.GetDeviceInfo): Promise<TTMeterError<TTMeter.DeviceInfoData>>;

		/**
		 * @description Configure the APN of bluetooth water meter
		 * @param option -Parameters
		 * @since 1.3.0
		 */
		configApn(option: TTWaterMeter.ConfigAPN): Promise<TTMeterError>;

		/**
		 * @description Configure the remote server address of bluetooth water meter
		 * @param option -Parameters
		 * @since 1.3.0
		 */
		configServer(option: TTWaterMeter.ConfigServer): Promise<TTMeterError>;
	}
}


/**
 * @description The interfaces and parameters for electric meters
 * @since 0.0.3
 */
declare namespace TTElectricMeter {
	/**
	 * @description Electric meter information scanned via Bluetooth
	 * @since 0.0.3
	 */
	interface DeviceModel extends TTMeter.DeviceModel {
		/**
		 * @description Electric meter power status, invalid on Protocol Version 2
		 * @since 0.0.3
		 * @value 0 -Power off, 1 -Power on
		 */
		onOff?: number;
		/**
		 * @description Electric meter payment mode, invalid on Protocol Version 2
		 * @since 0.0.3
		 * @value 0 -Postpaid mode, 1 -Prepaid mode
		 */
		payMode?: number;
		/**
		 * @description Total electricity consumption, unit: kWh, invalid on Protocol Version 2
		 * @since 0.0.3
		 */
		totalKwh?: string;
		/**
		 * @description Remaining electricity consumption, unit: kWh, invalid on Protocol Version 2
		 * @since 0.0.3
		 */
		remainderKwh?: string;
		/**
		 * @description Electric meter voltage, unit: V, invalid on Protocol Version 2
		 * @since 0.0.3
		 */
		voltage?: string;
		/**
		 * @description Electric meter current, unit: A, invalid on Protocol Version 2
		 * @since 0.0.3
		 */
		electricCurrent?: number;
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
	 * @description Electric meter scan callback
	 * @since 0.0.3
	 */
	type OnDeviceFound = (result: DeviceModel) => void
	/**
	 * @description Electric meter scanning parameters
	 * @since 0.0.3
	 */
	interface Scan {
		/**
		 * @description Electric meter scan callback
		 * @since 0.0.3
		 */
		onFoundDevice: OnDeviceFound;
		/**
		 * @description (Android)Scan timed out and no electric meter was found
		 * @since 0.0.3
		 */
		onNoDeviceFound: TTMeter.OnNoDeviceFound;
	}
	
	/**
	 * @description Keep bluetooth connection
	 * @since 1.2.0
	 */
	interface KeepConnection {
	}
	
	
	/**
	 * @description Parameters carried when initialize a bluetooth electric meter
	 * @since 0.0.3
	 */
	interface Add {
		/**
		 * @description Bluetooth Name
		 * @since 0.0.3
		 */
		name: string;
		/**
		 * @description Electric meter payment mode
		 * @since 0.0.3
		 * @value 0 -Postpaid mode, 1 -Prepaid mode
		 */
		payMode: number;
		/**
		 * @description Unit price of electricity
		 * @since 0.0.3
		 */
		price: number;
	}
	
	/**
	 * @description Parameters carried when deleting a bluetooth electric meter
	 * @since 0.0.3
	 */
	interface Delete {
	}
	
	/**
	 * @description Parameters carried when setting the power on/off status of the Bluetooth electric meter.
	 * @since 0.0.3
	 */
	interface SetPowerOnOff {
		/**
		 * @description Power On/Off Switch
		 * @since 0.0.3
		 */
		powerOn: boolean;
	}
	
	/**
	 * @description Parameters carried when setting the remaining power of the Bluetooth electric meter.
	 * @since 0.0.3
	 */
	interface SetRemainingElectricity {
		/**
		 * @description Remaining electricity consumption, unit: kWh
		 * @since 0.0.3
		 */
		remainderKwh: number;
	}
	
	/**
	 * @description Parameters carried when clearing the power consumption data of the Bluetooth electric meter.
	 * @since 0.0.3
	 */
	interface ClearRemainingElectricity {
	}
	
	/**
	 * @description Parameters carried when reading Bluetooth electric meter data
	 * @since 0.0.3
	 */
	interface ReadData {
	}
	
	/**
	 * @description Parameters carried when setting up the Bluetooth electric meter payment mode.
	 * @since 0.0.3
	 */
	interface SetPayMode {
		/**
		 * @description Electric meter payment mode
		 * @since 0.0.3
		 * @value 0 -Postpaid mode, 1 -Prepaid mode
		 */
		payMode: number;
		/**
		 * @description Unit price of electricity
		 * @since 0.0.3
		 */
		price: number;
	}
	
	/**
	 * @description Parameters transmitted during Bluetooth electric meter recharge.
	 * @since 0.0.3
	 */
	interface Recharge {
		/**
		 * @description Recharge amount
		 * @since 0.0.3
		 */
		rechargeAmount?: number;
		/**
		 * @description Recharge electricity, unit: kWh
		 * @since 0.0.3
		 */
		rechargeKwh?: number;
		/**
		 * @description Recharge token
		 * @since 0.0.3
		 */
		executeToken?: string;
	}
	
	/**
	 * @description Parameters carried when setting the maximum power threshold for the Bluetooth electric meter.
	 * @since 0.0.3
	 */
	interface SetMaxPower {
		/**
		 * @description Maximum power threshold
		 * @since 0.0.3
		 */
		maxPower: number;
	}
	
	/**
	 * @description Parameters for querying Bluetooth electric meter characteristics.
	 * @since 0.0.3
	 */
	interface GetFeatureValue {
	}

	/**
	 * @description Parameters for reset device.
	 * @since 1.3.0
	 */
	interface Reset {
	}

	/**
	 * @description Parameters for get device information.
	 * @since 1.3.0
	 */
	interface GetDeviceInfo {
	}

	/**
	 * @description Parameters for config APN.
	 * @since 1.3.0
	 */
	interface ConfigAPN {
		/**
		 * @description APN
		 * @since 1.3.0
		 */
		apn: string;
	}

	/**
	 * @description Parameters for config server.
	 * @since 1.3.0
	 */
	interface ConfigServer {
		/**
		 * @description remote server address
		 * @since 1.3.0
		 */
		serverAddress: string;
		/**
		 * @description remote server port
		 * @since 1.3.0
		 */
		portNumber: number;
	}
}


/**
 * @description The interfaces and parameters for water meters
 * @since 0.0.4
 */
declare namespace TTWaterMeter {
	/**
	 * @description Water meter information scanned via Bluetooth
	 * @since 0.0.4
	 */
	interface DeviceModel extends TTMeter.DeviceModel {
		/**
		 * @description Water meter power status, invalid on Protocol Version 2
		 * @since 0.0.4
		 * @value 0 -Power off, 1 -Power on
		 */
		onOff?: number;
		/**
		 * @description Magnetic interference, invalid on Protocol Version 2
		 * @since 0.0.4
		 * @value 0 -No magnetic interference, 1 -Magnetic interference
		 */
		magneticInterference?: number;
		/**
		 * @description Water valve malfunction, invalid on Protocol Version 2
		 * @since 0.0.4
		 * @value 0 -No water valve malfunction, 1 -Water valve malfunction
		 */
		waterValveFailure?: number;
		/**
		 * @description Water meter payment mode, invalid on Protocol Version 2
		 * @since 0.0.4
		 * @value 0 -Postpaid mode, 1 -Prepaid mode
		 */
		payMode?: number;
		/**
		 * @description Total water consumption, unit: t, invalid on Protocol Version 2
		 * @since 0.0.4
		 */
		totalM3?: string;
		/**
		 * @description Remaining water consumption, unit: t, invalid on Protocol Version 2
		 * @since 0.0.4
		 */
		remainderM3?: string;
		/**
		 * @description Electric quantity, 1 - 100, invalid on Protocol Version 2
		 * @since 0.0.4
		 */
		electricQuantity?: number;
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
	 * @description Water meter scan callback
	 * 
	 * @since 0.0.4
	 */
	type OnDeviceFound = (result: DeviceModel) => void
	/**
	 * @description Water meter scanning parameters
	 * @since 0.0.4
	 */
	interface Scan {
		/**
		 * @description Water meter scan callback
		 * @since 0.0.4
		 */
		onFoundDevice: OnDeviceFound;
		/**
		 * @description (Android)Scan timed out and no water meter was found
		 * @since 0.0.4
		 */
		onNoDeviceFound: TTMeter.OnNoDeviceFound;
	}
	
	/**
	 * @description Keep bluetooth connection
	 * @since 1.2.0
	 */
	interface KeepConnection {
	}
	
	
	/**
	 * @description Parameters carried when initialize a bluetooth water meter
	 * @since 0.0.4
	 */
	interface Add {
		/**
		 * @description Bluetooth Name
		 * @since 0.0.4
		 */
		name: string;
		/**
		 * @description Water meter payment mode
		 * @since 0.0.4
		 * @value 0 -Postpaid mode, 1 -Prepaid mode
		 */
		payMode: number;
		/**
		 * @description Unit price of electricity
		 * @since 0.0.4
		 */
		price: number;
	}
	
	/**
	 * @description Parameters carried when deleting a bluetooth water meter
	 * @since 0.0.4
	 */
	interface Delete {
	}
	
	/**
	 * @description Parameters carried when setting the power on/off status of the Bluetooth water meter.
	 * @since 0.0.4
	 */
	interface SetWaterOnOff {
		/**
		 * @description Power On/Off Switch
		 * @since 0.0.4
		 */
		onOff: boolean;
	}
	
	/**
	 * @description Parameters carried when setting the remaining power of the Bluetooth water meter.
	 * @since 0.0.4
	 */
	interface SetRemainingWater {
		/**
		 * @description Remaining water consumption, unit: t
		 * @since 0.0.4
		 */
		remainderM3: number;
	}
	
	/**
	 * @description Parameters carried when clearing the power consumption data of the Bluetooth water meter.
	 * @since 0.0.4
	 */
	interface ClearRemainingWater {
	}
	
	/**
	 * @description Parameters carried when reading Bluetooth water meter data
	 * @since 0.0.4
	 */
	interface ReadData {
	}
	
	/**
	 * @description Parameters carried when setting up the Bluetooth water meter payment mode.
	 * @since 0.0.4
	 */
	interface SetPayMode {
		/**
		 * @description Water meter payment mode
		 * @since 0.0.4
		 * @value 0 -Postpaid mode, 1 -Prepaid mode
		 */
		payMode: number;
		/**
		 * @description Unit price of water
		 * @since 0.0.4
		 */
		price: number;
	}
	
	/**
	 * @description Parameters transmitted during Bluetooth water meter recharge.
	 * @since 0.0.4
	 */
	interface Recharge {
		/**
		 * @description Recharge amount
		 * @since 0.0.4
		 */
		rechargeAmount?: number;
		/**
		 * @description Recharge water, unit: t
		 * @since 0.0.4
		 */
		rechargeM3?: number;
		/**
		 * @description Recharge token
		 * @since 0.0.4
		 */
		executeToken?: string;
	}
	
	/**
	 * @description Parameters carried when setting total usage of water for the Bluetooth water meter.
	 * @since 0.0.4
	 */
	interface SetTotalUsage {
		/**
		 * @description Total usage of water
		 * @since 0.0.4
		 */
		totalM3: number;
	}
	
	/**
	 * @description Parameters for querying Bluetooth water meter characteristics.
	 * @since 0.0.4
	 */
	interface GetFeatureValue {
	}

	/**
	 * @description Parameters for reset device.
	 * @since 1.3.0
	 */
	interface Reset {
	}

	/**
	 * @description Parameters for get device information.
	 * @since 1.3.0
	 */
	interface GetDeviceInfo {
	}

	/**
	 * @description Parameters for config APN.
	 * @since 1.3.0
	 */
	interface ConfigAPN {
		/**
		 * @description APN
		 * @since 1.3.0
		 */
		apn: string;
	}

	/**
	 * @description Parameters for config server.
	 * @since 1.3.0
	 */
	interface ConfigServer {
		/**
		 * @description remote server address
		 * @since 1.3.0
		 */
		serverAddress: string;
		/**
		 * @description remote server port
		 * @since 1.3.0
		 */
		portNumber: number;
	}
}

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

/**
 * 模块式引用声明(可选用法)：作用域封闭，不污染全局
 * 运行时仍需通过 requirePlugin("ttmeter-plugin") 获取插件实例，import仅用于类型引入(编译后擦除)
 * ```
 * import type { TTMeterPlugin } from "ttmeter-plugin";
 * const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin;
 * ```
 * @since 1.3.0
 */
declare module "ttmeter-plugin" {
	/**
	 * @description Current version of TTMeterPlugin
	 * @since 0.0.1
	 */
	export const VERSION: string;
	/**
	 * @description Set log switch and callback method
	 * @since 0.0.3
	 */
	export function setShowLog(open: boolean, callback: TTMeter.LogCallback): void;
	/**
	 * @description Set remote server address and related parameters.
	 * @since 0.0.3
	 */
	export function setClientParam(clientInfo: TTMeter.ClientInfo): boolean;
	/**
	 * @description Initialize bluetooth callback methods(Universal)
	 * @since 0.0.3
	 */
	export function init(option: TTMeter.Init): Promise<TTMeterError>;
	/**
	 * @description Stop scanning for Bluetooth devices(Universal)
	 * @since 0.0.3
	 */
	export function stopScan(): Promise<TTMeterError>;
	/**
	 * @description Release Bluetooth resources after batch operations are completed(Universal)
	 * @since 0.0.3
	 */
	export function finishOperations(): Promise<TTMeterError>;
	/**
	 * @description Stop all BLE operations of plugin(Universal)
	 * @since 0.0.4
	 */
	export function stopAllOperations(): Promise<TTMeterError>;
	/**
	 * @description Interfaces for electric meters.
	 * @since 0.0.3
	 */
	export const TTElectricMeter: TTMeter.ElectricMeter;
	/**
	 * @description Interfaces for water meters.
	 * @since 0.0.4
	 */
	export const TTWaterMeter: TTMeter.WaterMeter;
}