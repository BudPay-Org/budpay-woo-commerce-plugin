<?php
/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://devs.budpay.com/
 * @since      1.0.0
 *
 * @package    BudPay
 */

declare(strict_types=1);

defined( 'ABSPATH' ) || exit;

/**
 * BudPay x WooCommerce Integration Class.
 */
class Budpay_Payment_Gateway extends WC_Payment_Gateway {
	/**
	 * Public Key
	 *
	 * @var string the public key
	 */
	protected string $public_key;
	/**
	 * Secret Key
	 *
	 * @var string the secret key.
	 */
	protected string $secret_key;
	/**
	 * Test Public Key
	 *
	 * @var string the test public key.
	 */
	private string $test_public_key;
	/**
	 * Test Secret Key.
	 *
	 * @var string the test secret key.
	 */
	private string $test_secret_key;
	/**
	 * Live Public Key
	 *
	 * @var string the live public key
	 */
	private string $live_public_key;
	/**
	 * Go Live Status.
	 *
	 * @var string the go live status.
	 */
	private string $go_live;
	/**
	 * Live Secret Key.
	 *
	 * @var string the live secret key.
	 */
	private string $live_secret_key;
	/**
	 * Auto Complete Order.
	 *
	 * @var false|mixed|null
	 */
	private $auto_complete_order;
	/**
	 * Logger
	 *
	 * @var WC_Logger the logger.
	 */
	private WC_Logger $logger;

	/**
	 * Constructor.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->base_url           = 'https://api.budpay.com/api/v2/';
		$this->id                 = 'budpay';
		$this->icon               = plugins_url( 'assets/img/budpay.png', BUDPAY_PLUGIN_FILE );
		$this->has_fields         = false;
		$this->method_title       = 'Budpay';
		$this->method_description = 'Budpay ' . __( 'allows you to receive payments in 190+ countries.', 'budpay' );

		$this->init_form_fields();
		$this->init_settings();

		$this->title               = $this->get_option( 'title' );
		$this->description         = $this->get_option( 'description' );
		$this->enabled             = $this->get_option( 'enabled' );
		$this->test_public_key     = $this->get_option( 'test_public_key' );
		$this->test_secret_key     = $this->get_option( 'test_secret_key' );
		$this->live_public_key     = $this->get_option( 'live_public_key' );
		$this->live_secret_key     = $this->get_option( 'live_secret_key' );
		$this->auto_complete_order = get_option( 'autocomplete_order' );
		$this->go_live             = $this->get_option( 'go_live' );
		$this->payment_style       = $this->get_option( 'payment_style' );
		$this->country             = '';
		self::$log_enabled         = $this->logging_option;
		$this->supports            = array(
			'products',
		);

		add_action( 'admin_notices', array( $this, 'admin_notices' ) );
		add_action( 'woocommerce_receipt_' . $this->id, array( $this, 'receipt_page' ) );
		add_action( 'woocommerce_api_budpay_payment_gateway', array( $this, 'budpay_verify_payment' ) );

		// Webhook listener/API hook.
		add_action( 'woocommerce_api_budpay_payment_webhook', array( $this, 'budpay_notification_handler' ) );

		if ( is_admin() ) {
			add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
		}

		$this->public_key = $this->test_public_key;
		$this->secret_key = $this->test_secret_key;

		if ( 'yes' === $this->go_live ) {
			$this->public_key = $this->live_public_key;
			$this->secret_key = $this->live_secret_key;
		}

		$this->logger = Budpay_Logger::instance();

		$this->sdk = null;

		add_action( 'wp_enqueue_scripts', array( $this, 'payment_scripts' ) );
	}

	/**
	 * WooCommerce admin settings override.
	 */
	public function admin_options() {
		?>
		<h3 class="budpay__heading"><?php esc_attr_e( 'Budpay', 'budpay' ); ?></h3>
		<table class="form-table">
			<tr valign="top">
				<th scope="row">
					<label><?php esc_attr_e( 'Webhook Instruction', 'budpay' ); ?></label>
				</th>
				<td class="forminp forminp-text">
					<p class="description">
						<?php esc_attr_e( 'Please add this webhook URL and paste on the webhook section on your dashboard', 'budpay' ); ?><strong style="color: blue"><pre><code><?php echo esc_url( WC()->api_request_url( 'Budpay_Payment_Webhook' ) ); ?></code></pre></strong><a href="https://merchant.budpay.com/merchant/settings" target="_blank">Merchant Account</a>
					</p>
				</td>
			</tr>
			<?php
				$this->generate_settings_html();
			?>
		</table>
		<?php
	}

	/**
	 * Initial gateway settings form fields.
	 *
	 * @return void
	 */
	public function init_form_fields() {

		$this->form_fields = array(

			'enabled'            => array(
				'title'       => __( 'Enable/Disable', 'budpay' ),
				'label'       => __( 'Enable Budpay', 'budpay' ),
				'type'        => 'checkbox',
				'description' => __( 'Enable Budpay as a payment option on the checkout page', 'budpay' ),
				'default'     => 'no',
				'desc_tip'    => true,
			),
			'title'              => array(
				'title'       => __( 'Payment method title', 'budpay' ),
				'type'        => 'text',
				'description' => __( 'Optional', 'budpay' ),
				'default'     => 'Budpay',
			),
			'description'        => array(
				'title'       => __( 'Payment method description', 'budpay' ),
				'type'        => 'text',
				'description' => __( 'Optional', 'budpay' ),
				'default'     => 'Powered by Budpay: Accepts Mastercard, Visa, Verve.',
			),
			'test_public_key'    => array(
				'title'       => __( 'Test Public Key', 'budpay' ),
				'type'        => 'text',
				'description' => __( 'Required! Enter your Budpay test public key here', 'budpay' ),
				'default'     => '',
			),
			'test_secret_key'    => array(
				'title'       => __( 'Test Secret Key', 'budpay' ),
				'type'        => 'password',
				'description' => __( 'Required! Enter your Budpay test secret key here', 'budpay' ),
				'default'     => '',
			),
			'live_public_key'    => array(
				'title'       => __( 'Live Public Key', 'budpay' ),
				'type'        => 'text',
				'description' => __( 'Required! Enter your Budpay live public key here', 'budpay' ),
				'default'     => '',
			),
			'live_secret_key'    => array(
				'title'       => __( 'Live Secret Key', 'budpay' ),
				'type'        => 'password',
				'description' => __( 'Required! Enter your Budpay live secret key here', 'budpay' ),
				'default'     => '',
			),
			'autocomplete_order' => array(
				'title'       => __( 'Autocomplete Order After Payment', 'budpay' ),
				'label'       => __( 'Autocomplete Order', 'budpay' ),
				'type'        => 'checkbox',
				'class'       => 'budpay-autocomplete-order',
				'description' => __( 'If enabled, the order will be marked as complete after successful payment', 'budpay' ),
				'default'     => 'no',
				'desc_tip'    => true,
			),
			'payment_style'      => array(
				'title'       => __( 'Payment Style on checkout', 'budpay' ),
				'type'        => 'select',
				'description' => __( 'Optional - Choice of payment style to use. Either inline or redirect. (Default: inline)', 'budpay' ),
				'options'     => array(
					'inline'   => esc_html_x( 'Popup(Keep payment experience on the website)', 'payment_style', 'budpay' ),
					'redirect' => esc_html_x( 'Redirect', 'payment_style', 'budpay' ),
				),
				'default'     => 'redirect',
			),
			'go_live'            => array(
				'title'       => __( 'Mode', 'budpay' ),
				'label'       => __( 'Live mode', 'budpay' ),
				'type'        => 'checkbox',
				'description' => __( 'Check this box if you\'re using your live keys.', 'budpay' ),
				'default'     => 'no',
				'desc_tip'    => true,
			),
		);
	}

	/**
	 * Order id
	 *
	 * @param int $order_id  Order id.
	 *
	 * @return array|void
	 */
	public function process_payment( $order_id ) {
		// For Redirect Checkout.
		if ( 'redirect' === $this->payment_style ) {
			return $this->process_redirect_payments( $order_id );
		}

		// For inline Checkout.
		$order = wc_get_order( $order_id );

		$custom_nonce = wp_create_nonce();
		$this->logger->info( 'Rendering Payment Modal' );

		return array(
			'result'   => 'success',
			'redirect' => $order->get_checkout_payment_url( true ) . "&_wpnonce=$custom_nonce",
		);
	}

	/**
	 * Order id
	 *
	 * @param int $order_id  Order id.
	 *
	 * @return array|void
	 */
	public function process_redirect_payments( $order_id ) {
		include_once __DIR__ . '/client/class-budpay-request.php';

		$order = wc_get_order( $order_id );

		try {
			$budpay_request = ( new BudPay_Request() )->get_prepared_payload( $order, $this->get_secret_key() );
			$this->logger->log( 'Budpay: Generating Payment link for order :' . $order_id );
		} catch ( \InvalidArgumentException $budpay_request_error ) {
			wc_add_notice( $budpay_request_error, 'error' );
			// redirect user to check out page.
			$this->logger->error( 'Budpay: Failed in Generating Payment link for order :' . $order_id );
			return array(
				'result'   => 'fail',
				'redirect' => $order->get_checkout_payment_url( true ),
			);
		}

		$custom_nonce               = wp_create_nonce();
		$budpay_request['callback'] = $budpay_request['callback'] . '&_wpnonce=' . $custom_nonce;

		// Initiate Communication with Budpay.

		if ( ! is_wp_error( $response ) ) {
			// TODO: Get customer id.
			$this->logger->info( 'Budpay: redirecting customer to the payment link.' );
			$response = json_decode( $response['body'] );
			return array(
				'result'   => 'success',
				'redirect' => $response->data->authorization_url,
			);
		} else {
			wc_add_notice( 'Unable to Connect to Budpay.', 'error' );
			$this->logger->info( 'Budpay: Unable to Connect to Budpay.' );
			// TODO: handle responses based on error status code : https://devs.budpay.com/responses.
			// redirect user to check out page.
			return array(
				'result'   => 'fail',
				'redirect' => $order->get_checkout_payment_url( true ),
			);
		}
	}

	/**
	 * Handles admin notices
	 *
	 * @return void
	 */
	public function admin_notices(): void {

		if ( 'yes' === $this->enabled ) {

			if ( empty( $this->public_key ) || empty( $this->secret_key ) ) {

				$message = sprintf(
				/* translators: %s: url */
					__( 'For Budpay on appear on checkout. Please <a href="%s">set your Budpay API keys</a> to be able to accept payments.', 'budpay' ),
					esc_url( admin_url( 'admin.php?page=wc-settings&tab=checkout&section=budpay' ) )
				);
			}
		}
	}

	/**
	 * Checkout receipt page
	 *
	 * @param int $order_id Order id.
	 *
	 * @return void
	 */
	public function receipt_page( int $order_id ) {
		$order = wc_get_order( $order_id );
	}

	/**
	 * Loads (enqueue) static files (js & css) for the checkout page
	 *
	 * @return void
	 */
	public function payment_scripts() {

		// Load only on checkout page.
		if ( ! is_checkout_pay_page() && ! isset( $_GET['key'] ) ) {
			return;
		}

		if ( ! isset( $_REQUEST['_wpnonce'] ) ) {
			return;
		}

		$expiry_message = sprintf(
			/* translators: %s: shop cart url */
			__( 'Sorry, your session has expired. <a href="%s" class="wc-backward">Return to shop</a>', 'budpay' ),
			esc_url( wc_get_page_permalink( 'shop' ) )
		);

			$nonce_value = sanitize_text_field( wp_unslash( $_REQUEST['_wpnonce'] ) );

			$order_key = urldecode( sanitize_text_field( wp_unslash( $_GET['key'] ) ) );
			$order_id  = absint( get_query_var( 'order-pay' ) );

			$order = wc_get_order( $order_id );

		if ( empty( $nonce_value ) || ! wp_verify_nonce( $nonce_value ) ) {

			WC()->session->set( 'refresh_totals', true );
			wc_add_notice( __( 'We were unable to process your order, please try again.', 'budpay' ) );
			wp_safe_redirect( $order->get_cancel_order_url() );
			return;
		}

		if ( $this->id !== $order->get_payment_method() ) {
			return;
		}

		wp_enqueue_script( 'jquery' );

		$budpay_inline_link = 'https://inlinepay.budpay.com/budpay-inline-custom.js';

		wp_enqueue_script( 'budpay', $budpay_inline_link, array( 'jquery' ), BUDPAY_VERSION, false );

		$checkout_frontend_script = 'assets/js/checkout.js';
		if ( 'yes' === $this->go_live ) {
			$checkout_frontend_script = 'assets/js/checkout.min.js';
		}

		wp_enqueue_script( 'budpay_js', plugins_url( $checkout_frontend_script, BUDPAY_PLUGIN_FILE ), array( 'jquery', 'budpay' ), BUDPAY_VERSION, false );

		$payment_args = array();

		if ( is_checkout_pay_page() && get_query_var( 'order-pay' ) ) {
			$email         = $order->get_billing_email();
			$amount        = $order->get_total();
			$txnref        = 'WOO_' . $order_id . '_' . time();
			$the_order_id  = $order->get_id();
			$the_order_key = $order->get_order_key();
			$currency      = $order->get_currency();
			$custom_nonce  = wp_create_nonce();
			$redirect_url  = WC()->api_request_url( 'Budpay_Payment_Gateway' ) . '?order_id=' . $order_id . '&_wpnonce=' . $custom_nonce;

			if ( $the_order_id === $order_id && $the_order_key === $order_key ) {

				$payment_args['email']        = $email;
				$payment_args['amount']       = $amount;
				$payment_args['tx_ref']       = $txnref;
				$payment_args['currency']     = $currency;
				$payment_args['public_key']   = $this->public_key;
				$payment_args['redirect_url'] = $redirect_url;
				$payment_args['phone_number'] = $order->get_billing_phone();
				$payment_args['first_name']   = $order->get_billing_first_name();
				$payment_args['last_name']    = $order->get_billing_last_name();
				$payment_args['consumer_id']  = $order->get_customer_id();
				$payment_args['ip_address']   = $order->get_customer_ip_address();
				$payment_args['title']        = esc_html__( 'Order Payment', 'budpay' );
				$payment_args['description']  = 'Payment for Order: ' . $order_id;
				$payment_args['logo']         = wp_get_attachment_url( get_theme_mod( 'custom_logo' ) );
				$payment_args['checkout_url'] = wc_get_checkout_url();
				$payment_args['cancel_url']   = $order->get_cancel_order_url();
			}
			update_post_meta( $order_id, '_budpay_txn_ref', $txnref );
		}

		wp_localize_script( 'budpay_js', 'budpay_args', $payment_args );
	}

	/**
	 * Verify payment made on the checkout page
	 *
	 * @return void
	 */
	public function budpay_verify_payment() {
		$public_key = $this->public_key;
		$secret_key = $this->secret_key;
		$logger     = $this->logger;

		if ( ! isset( $_GET['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) ) ) ) {
			if ( isset( $_GET['status'] ) && 'cancelled' === $_GET['status'] ) {
				// TODO: Cancel the payment.
				header( 'Location: ' . wc_get_cart_url() );
				die();
			}
		}

		if ( isset( $_POST['tx_ref'] ) || isset( $_GET['tx_ref'] ) ) {
			// TODO: handle transaction verification.

			$redirect_url = $this->get_return_url( $order );
			header( 'Location: ' . $redirect_url );
			die();
		}
	}

	/**
	 * Process Webhook notifications.
	 */
	public function budpay_notification_handler() {
		$public_key = $this->public_key;
		$secret_key = $this->secret_key;
		$logger     = $this->logger;
	}
}
