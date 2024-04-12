<?php
/**
 * Class BudPay_Notices
 *
 * @package    Budpay/WooCommerce
 * @subpackage Budpay/WooCommerce/notices
 */

defined( 'ABSPATH' ) || exit;

/**
 * BudPay Main Notice Class
 */
class BudPay_Notices {
	/**
	 *  Woocommerce_not_installed
	 *
	 * @return void
	 */
	public function woocommerce_not_installed() {
		include_once dirname( BUDPAY_PLUGIN_FILE ) . '/inc/views/html-admin-missing-woocommerce.php';
	}

	/**
	 *  Woocommerce_wc_not_supported
	 *
	 * @return void
	 */
	public function woocommerce_wc_not_supported() {
		/* translators: $1. Minimum WooCommerce version. $2. Current WooCommerce version. */
		echo '<div class="error"><p><strong>' . sprintf( esc_html__( 'BudPay requires WooCommerce %1$s or greater to be installed and activated. kindly upgrade to a higher version of WooCommerce. WooCommerce version %2$s is not supported.', 'budpay' ), esc_attr( BUDPAY_MIN_WC_VER ), esc_attr( WC_VERSION ) ) . '</strong></p></div>';
	}
}
