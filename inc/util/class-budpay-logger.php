<?php
/**
 * Provides logging capabilities for debugging purposes.
 *
 * @class          Budpay_Logger
 * @version        2.0.0
 * @package        BudPay\Util
 */

declare(strict_types=1);

defined( 'ABSPATH' ) || exit;

/**
 * Main Logger Class for Budpay WooCommerce Integration.
 *
 * @since 1.0.0
 */
final class Budpay_Logger {
	/**
	 * Logger instance.
	 *
	 * @var string
	 */
	private static string $instance = '1.0.0';

	/**
	 * Logger Filename.
	 *
	 * @var string
	 */
	public string $file_name;

	/**
	 * Logger Constructor.
	 */
	private function ___construct() {}


	/**
	 * Get Logger Instance.
	 */
	public static function instance() {

		if ( null === self::$instance ) {
			self::$instance = new WC_Logger();
		}
		return self::$instance;
	}
}
