<?php
/**
 * Main Class of the Plugin.
 *
 * @package    Budpay/WooCommerce
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
	public static ?BudPay $instance = null;

	/**
	 * BudPay Constructor
	 */
	public function __construct() {
		$this->define_constants();
		$this->includes();
		$this->init();
	}

	/**
	 * Main Instance.
	 */
	public static function instance(): BudPay {
		self::$instance = is_null( self::$instance ) ? new self() : self::$instance;

		return self::$instance;
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

		add_action( 'admin_print_styles', function () {
			# using admin_print_styles.
			$image_url = plugin_dir_url( BUDPAY_PLUGIN_FILE ) . 'assets/img/budpay-30x30.png';
			echo '<style> .dashicons-budpay {
					background-image: url("' . esc_url( $image_url ) . '");
					background-repeat: no-repeat;
					background-position: center; 
			}</style>';
		} );

		add_action( 'admin_menu', array( $this, 'add_wc_admin_menu' ) );
		$this->register_budpay_wc_page_items();
		$this->register_payment_gateway();

		include_once BUDPAY_PLUGIN_DIR . 'inc/rest-api/class-budpay-settings-rest-controller.php';
		$settings__endpoint = new Budpay_Settings_Rest_Controller();
		add_action( 'rest_api_init', array( $settings__endpoint, 'register_routes' ) );
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
	 * Register the WooCommerce Settings Page.
	 *
	 * @since 1.0.0
	 */
	public function add_wc_admin_menu() {
		wc_admin_register_page(
			array(
				'id'       => 'budpay-wc-page',
				'title'    => __( 'Budpay', 'budpay' ),
				'path'     => '/budpay',
				'nav_args' => array(
					'parent'       => 'woocommerce',
					'is_top_level' => true,
					'menuId'       => 'plugins',
				),
				'position' => 3,
				'icon'     => 'dashicons-budpay',
			)
		);
	}

	/**
	 * Include Budpay Icon for Sidebar Setup.
	 */

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
	 * Handle Budpay WooCommerce Page Items.
	 */
	public function register_budpay_wc_page_items() {
		if ( ! method_exists( '\Automattic\WooCommerce\Admin\Features\Navigation\Menu', 'add_plugin_category' ) ||
				! method_exists( '\Automattic\WooCommerce\Admin\Features\Navigation\Menu', 'add_plugin_item' )
			) {
			return;
		}
			\Automattic\WooCommerce\Admin\Features\Navigation\Menu::add_plugin_category(
				array(
					'id'         => 'budpay-root',
					'title'      => 'Budpay',
					'capability' => 'view_woocommerce_reports',
				)
			);
			\Automattic\WooCommerce\Admin\Features\Navigation\Menu::add_plugin_item(
				array(
					'id'         => 'budpay-1',
					'parent'     => 'budpay-root',
					'title'      => 'Budpay 1',
					'capability' => 'view_woocommerce_reports',
					'url'        => 'https://budpay.com/',
				)
			);
			\Automattic\WooCommerce\Admin\Features\Navigation\Menu::add_plugin_item(
				array(
					'id'         => 'budpay-2',
					'parent'     => 'budpay-root',
					'title'      => 'Budpay 2',
					'capability' => 'view_woocommerce_reports',
					'url'        => 'https://budpay.com/',
				)
			);
			\Automattic\WooCommerce\Admin\Features\Navigation\Menu::add_plugin_category(
				array(
					'id'              => 'sub-menu',
					'parent'          => 'budpay-root',
					'title'           => 'Budpay Menu',
					'capability'      => 'view_woocommerce_reports',
					'backButtonLabel' => 'Budpay',
				)
			);
			\Automattic\WooCommerce\Admin\Features\Navigation\Menu::add_plugin_item(
				array(
					'id'         => 'sub-menu-child-1',
					'parent'     => 'sub-menu',
					'title'      => 'Sub Menu Child 1',
					'capability' => 'view_woocommerce_reports',
					'url'        => 'http//:www.google.com',
				)
			);
			\Automattic\WooCommerce\Admin\Features\Navigation\Menu::add_plugin_item(
				array(
					'id'         => 'sub-menu-child-2',
					'parent'     => 'sub-menu',
					'title'      => 'Sub Menu Child 2',
					'capability' => 'view_woocommerce_reports',
					'url'        => 'https://budpay.com/',
				)
			);
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
