/// <reference path="./base.d.ts" />
/// <reference path="./meter.d.ts" />

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
}