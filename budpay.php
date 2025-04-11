<?php
/**
 * Plugin Name: BudPay
 * Plugin URI: https://devs.budpay.com/
 * Description: This plugin is the official plugin of Budpay.
 * Version: 1.0.1
 * Author: Budpay
 * Author URI: https://app.budpay.com/
 * Developer: Budpay Devs
 * Developer URI: https://budpay.com/
 * Text Domain: budpay
 * Domain Path: /languages
 *
 * WC requires at least: 2.2
 * WC tested up to: 2.3
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * Requires Plugins: woocommerce
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
 * Add the Settings link to the plugin
 *
 * @param  array $links Existing links on the plugin page.
 *
 * @return array Existing links with our settings link added
 */
function budpay_plugin_action_links( array $links ): array {

	$budpay_settings_url = esc_url( get_admin_url( null, 'admin.php?page=wc-admin&path=%2Fbudpay' ) );
	array_unshift( $links, "<a title='BudPay Settings Page' href='$budpay_settings_url'>Configure</a>" );

	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'budpay_plugin_action_links' );

/**
 * Initialize Budpay.
 */
function budpay_bootstrap() {
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	if ( ! class_exists( 'Budpay' ) ) {
		include_once dirname( BUDPAY_PLUGIN_FILE ) . '/inc/class-budpay.php';
		// Global for backwards compatibility.
		$GLOBALS['budpay'] = Budpay::instance();
	}
}

add_action( 'plugins_loaded', 'budpay_bootstrap', 99 );

/**
 * Register the admin JS.
 */
function budpay_add_extension_register_script() {

	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	if ( ! class_exists( 'Automattic\WooCommerce\Admin\Loader' ) && version_compare( WC_VERSION, '6.3', '<' ) && ! \Automattic\WooCommerce\Admin\Loader::is_admin_or_embed_page() ) {
		return;
	}

	if ( ! class_exists( 'Automattic\WooCommerce\Admin\Loader' ) && version_compare( WC_VERSION, '6.3', '>=' ) && ! \Automattic\WooCommerce\Admin\PageController::is_admin_or_embed_page() ) {
		return;
	}

	$script_path       = '/build/settings.js';
	$script_asset_path = dirname( BUDPAY_PLUGIN_FILE ) . '/build/settings.asset.php';
	$script_asset      = file_exists( $script_asset_path )
		? require_once $script_asset_path
		: array(
			'dependencies' => array(),
			'version'      => BUDPAY_VERSION,
		);

	wp_register_script(
		'budpay-admin-js',
		plugins_url( 'build/settings.js', BUDPAY_PLUGIN_FILE ),
		array_merge( array( 'wp-element', 'wp-data', 'moment', 'wp-api' ), $script_asset['dependencies'] ),
		$script_asset['version'],
		true
	);

	$budpay_fallback_settings = array(
		'enabled'            => 'no',
		'go_live'            => 'no',
		'title'              => 'BudPay',
		'live_public_key'    => 'pk_XXXXXXXXXXXX',
		'live_secret_hash'   => '',
		'test_public_key'    => 'pk_XXXXXXXXXXXX',
		'test_secret_hash'   => '',
		'autocomplete_order' => 'no',
	);

	$budpay_default_settings = get_option( 'woocommerce_budpay_settings', $budpay_fallback_settings );

	wp_localize_script(
		'budpay-admin-js',
		'budpayData',
		array(
			'asset_plugin_url' => plugins_url( '', BUDPAY_PLUGIN_FILE ),
			'asset_plugin_dir' => plugins_url( '', BUDPAY_PLUGIN_DIR ),
			'budpay_logo'      => plugins_url( 'assets/img/BudPay-Logo3.png', BUDPAY_PLUGIN_FILE ),
			'budpay_defaults'  => $budpay_default_settings,
			'budpay_webhook'   => WC()->api_request_url( 'Budpay_Payment_Webhook' ),
		)
	);

	wp_enqueue_script( 'budpay-admin-js' );

	wp_register_style(
		'budpay_admin_css',
		plugins_url( 'assets/admin/style/index.css', BUDPAY_PLUGIN_FILE ),
		array(),
		BUDPAY_VERSION
	);

	wp_enqueue_style( 'budpay_admin_css' );
}

add_action( 'admin_enqueue_scripts', 'budpay_add_extension_register_script' );


/**
 * Register the Budpay payment gateway for WooCommerce Blocks.
 *
 * @return void
 */
function budpay_woocommerce_blocks_support() {
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

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
