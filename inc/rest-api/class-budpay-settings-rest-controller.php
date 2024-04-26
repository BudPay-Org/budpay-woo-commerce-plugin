<?php
/**
 * Base For Budpay Endpoint.
 *
 * @package    Budpay/WooCommerce/RestApi
 */

/**
 * Budpay Settings Endpoint.
 */
final class Budpay_Settings_Rest_Controller extends WP_REST_Controller {
	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace;

	/**
	 * Rest base for the current object.
	 *
	 * @var string
	 */
	protected $rest_base;

	/**
	 * Settings Route Constructor.
	 */
	public function __construct() {
		$this->namespace = 'budpay/v1';
		$this->rest_base = 'settings';
	}

	/**
	 * Register Routes and their Verbs.
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
					'args'                => $this->get_endpoint_args_for_item_schema(),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'update_item_permissions_check' ),
					'args'                => array(
						'live_secret_key' => true,
						'test_secret_key' => true,
						'live_public_key' => true,
						'test_public_key' => true,
						'go_live'         => array(
							'validate_callback' => function ( $param ) {
								if ( ! gettype( $param ) === 'yes' && ! gettype( $param ) === 'no' ) {
									return new WP_Error(
										'rest_invalid_param',
										__( 'The go_live value provided is invalid. Please provide a yes or no.', 'budpay' ),
										array( 'status' => WP_Http::BAD_REQUEST )
									);
								}
								return true;
							},
						),
					),

				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);
	}

	/**
	 * Get Current Users Permission.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return bool|WP_Error
	 */
	public function get_items_permissions_check( $request ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			return new WP_Error(
				'rest_cannot_view',
				__( 'Your user is not permitted to access this resource.', 'budpay' ),
				array( 'status' => rest_authorization_required_code() )
			);
		}

		return true;
	}

	/**
	 * Checks if the user has the necessary permissions to get global styles information.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return bool|WP_Error
	 */
	public function update_item_permissions_check( $request ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			return new WP_Error(
				'rest_cannot_view',
				__( 'Your user is not permitted to access this resource.', 'budpay' ),
				array( 'status' => rest_authorization_required_code() )
			);
		}

		return true;
	}

	/**
	 * Get the current settings.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function get_item( $request ): WP_REST_Response {
		$settings = get_option( 'woocommerce_budpay_settings', array() );

		return new WP_REST_Response( $settings, WP_Http::OK );
	}

	/**
	 * Update Budpay Settings.
	 *
	 * @param WP_REST_Request $request the request.
	 */
	public function update_item( $request ): WP_REST_Response {
		$settings = $request->get_params();
		update_option( 'woocommerce_budpay_settings', $settings );
		return new WP_REST_Response(
			array(
				'message' => 'Updated Successfully',
				'data'    => $settings,
			),
			WP_Http::OK
		);
	}
}
