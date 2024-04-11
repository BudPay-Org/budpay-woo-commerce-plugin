<?php
/**
 * Main Class of the Plugin.
 *
 * @package BudPay
 */

declare(strict_types=1);

defined( 'ABSPATH' ) || exit;

/**
 * Main Class
 *
 * @since 1.0.0
 */
class BudPay {
	/**
	 * Plugin version.
	 *
	 * @var string
	 */
	public string $version = '1.0.0';

	/**
	 * Plugin API version.
	 *
	 * @var string
	 */
	public string $api_version = 'v2';

	/**
	 * Plugin Instance.
	 *
	 * @var BudPay|null
	 */
	public static ?BudPay $instance;

	/**
	 * BudPay Constructor
	 */
	public function __construct() {
		$this->define_constants();
		$this->load_plugin_textdomain();
		$this->includes();
		$this->init();
	}

	/**
	 * Define general constants.
	 *
	 * @param string      $name  constant name.
	 * @param string|bool $value constant value.
	 */
	private function define( string $name, $value ) {
		if ( ! defined( $name ) ) {
			define( $name, $value );
		}
	}

	/**
	 * Define BudPay Constants.
	 */
	private function define_constants() {
		$this->define( 'BUDPAY_VERSION', $this->version );
		$this->define( 'BUDPAY_MINIMUM_WP_VERSION', '5.8' );
		$this->define( 'BUDPAY_PLUGIN_URL', plugin_dir_url( BUDPAY_PLUGIN_FILE ) );
		$this->define( 'BUDPAY_PLUGIN_BASENAME', plugin_basename( BUDPAY_PLUGIN_FILE ) );
		$this->define( 'BUDPAY_PLUGIN_DIR', plugin_dir_path( BUDPAY_PLUGIN_FILE ) );
		$this->define( 'BUDPAY_DIR_PATH', plugin_dir_path( BUDPAY_PLUGIN_FILE ) );
		$this->define( 'BUDPAY_MIN_WC_VER', '6.9.1' );
		$this->define( 'BUDPAY_URL', trailingslashit( plugins_url( '/', BUDPAY_PLUGIN_FILE ) ) );
		$this->define( 'BUDPAY_EPSILON', 0.01 );
	}

	/**
	 * Load plugin textdomain.
	 *
	 * @since 1.0.0
	 */
	public function load_plugin_textdomain() {
		$locale = determine_locale();

		load_plugin_textdomain( 'budpay', false, dirname( BUDPAY_PLUGIN_BASENAME ) . '/i18n/languages' );
	}

	/**
	 * Initialize the plugin.
	 * Checks for an existing instance of this class in the global scope and if it doesn't find one, creates it.
	 *
	 * @return void
	 */
	private function init() {
		$notices = new BudPay_Notices();

		// Check if WooCommerce is active.
		if ( ! class_exists( 'WooCommerce' ) ) {

			add_action( 'admin_notices', array( $notices, 'woocommerce_not_installed' ) );
			return;
		}

		if ( ! class_exists( 'WC_Payment_Gateway' ) ) {
			return;
		}

		if ( version_compare( WC_VERSION, BUDPAY_MIN_WC_VER, '<' ) ) {
			add_action( 'admin_notices', array( $notices, 'woocommerce_wc_not_supported' ) );
			return;
		}

		register_activation_hook( __FILE__, array( $this, 'activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

		$this->register_payment_gateway();
	}

	/**
	 * Cloning is forbidden.
	 *
	 * @since 1.0.0
	 */
	public function __clone() {}

	/**
	 * Unserializing instances of this class is forbidden.
	 *
	 * @since 1.0.0
	 */
	public function __wakeup() {}

	/**
	 * Include required core files used in admin and on the frontend.
	 */
	public function includes() {
		// Include classes that can run on WP Freely.
		include_once dirname( BUDPAY_PLUGIN_FILE ) . '/inc/notices/class-budpay-notices.php';
	}

	/**
	 * This handles actions on plugin activation.
	 *
	 * @return void
	 */
	public static function activate() {
		if ( ! class_exists( 'WooCommerce' ) ) {
			$notices = new BudPay_Notices();
			add_action( 'admin_notices', array( $notices, 'woocommerce_not_installed' ) );
		}
	}

	/**
	 * This handles actions on plugin deactivation.
	 *
	 * @return void
	 */
	public static function deactivate() {
		// Deactivation logic.
	}

	/**
	 * Register BudPay as a Payment Gateway.
	 *
	 * @return void
	 */
	public function register_payment_gateway() {
		require_once dirname( BUDPAY_PLUGIN_FILE ) . '/inc/class-budpay-payment-gateway.php';

		add_filter( 'woocommerce_payment_gateways', array( 'Budpay', 'add_gateway_to_woocommerce_gateway_list' ), 99 );
	}

	/**
	 * Add the Gateway to WooCommerce
	 *
	 * @param  array $methods Existing gateways in WooCommerce.
	 *
	 * @return array Gateway list with our gateway added
	 */
	public static function add_gateway_to_woocommerce_gateway_list( array $methods ): array {

		$methods[] = 'Budpay_Payment_Gateway';

		return $methods;
	}

	/**
	 * Add the Settings link to the plugin
	 *
	 * @param  array $links Existing links on the plugin page.
	 *
	 * @return array Existing links with our settings link added
	 */
	public static function plugin_action_links( array $links ): array {

		$budpay_settings_url = esc_url( get_admin_url( null, 'admin.php?page=wc-settings&tab=checkout&section=budpay' ) );
		array_unshift( $links, "<a title='Budpay Settings Page' href='$budpay_settings_url'>Configuration</a>" );

		return $links;
	}
}
