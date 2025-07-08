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