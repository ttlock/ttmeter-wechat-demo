/// <reference path="./base.d.ts" />
/// <reference path="./meter.d.ts" />

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
	}
	/**
	 * @description Water meter scan callback
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
}