<?php
/**
 * Plugin Name: BudPay
 * Plugin URI: https://devs.budpay.com/
 * Description: This plugin is the official plugin of Budpay.
 * Version: 1.0.0
 * Author: Budpay Devs
 * Author URI: https://devs.budpay.com/
 * Developer: Budpay Devs
 * Developer URI: https://budpay.com/
 * Text Domain: budpay
 * Domain Path: /languages
 *
 * WC requires at least: 2.2
 * WC tested up to: 2.3
 * Requires at least: 5.8
 * Requires PHP: 7.4
 *
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package BudPay
 */

declare(strict_types=1);

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'BUDPAY_PLUGIN_FILE' ) ) {
	define( 'BUDPAY_PLUGIN_FILE', __FILE__ );
}

/**
 * Initialize Budpay.
 */
function budpay_bootstrap() {
	if ( ! class_exists( 'Budpay' ) ) {
		include_once dirname( BUDPAY_PLUGIN_FILE ) . '/inc/class-budpay.php';
		// Global for backwards compatibility.
		$GLOBALS['budpay'] = Budpay::instance();
	}
}

add_action( 'plugins_loaded', 'budpay_bootstrap', 99 );

/**
 * Register the Budpay payment gateway for WooCommerce Blocks.
 *
 * @return void
 */
function budpay_woocommerce_blocks_support() {
	if ( class_exists( 'Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType' ) ) {
		require_once dirname( BUDPAY_PLUGIN_FILE ) . '/inc/block/class-budpay-block-support.php';
		add_action(
			'woocommerce_blocks_payment_method_type_registration',
			function ( Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry $payment_method_registry ) {

				$payment_method_registry->register( new Budpay_Block_Support() );
			}
		);
	}
}

// add woocommerce block support.
add_action( 'woocommerce_blocks_loaded', 'budpay_woocommerce_blocks_support' );

add_action(
	'before_woocommerce_init',
	function () {
		if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
		}
	}
);

/**
 * Add the Settings link to the plugin
 *
 * @param  array $links Existing links on the plugin page.
 *
 * @return array Existing links with our settings link added
 */
function budpay_plugin_action_links( array $links ): array {

	$budpay_settings_url = esc_url( get_admin_url( null, 'admin.php?page=wc-settings&tab=checkout&section=budpay' ) );
	array_unshift( $links, "<a title='BudPay Settings Page' href='$budpay_settings_url'>Configure</a>" );

	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'budpay_plugin_action_links' );
