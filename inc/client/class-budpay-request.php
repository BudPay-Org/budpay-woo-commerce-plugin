<?php
/**
 * The file that defines class to handle requests to Budpay.
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://devs.budpay.com/
 * @since      1.0.0
 *
 * @package    Budpay/WooCommerce
 * @subpackage Budpay/WooCommerce/client
 */

declare(strict_types=1);

defined( 'ABSPATH' ) || exit;

/**
 * Class Budpay_Request file.
 *
 * @package Budpay\Client
 */
class Budpay_Request {
	/**
	 *  Pointer to gateway making the request.
	 */
	public function __construct() {
		$this->notify_url = WC()->api_request_url( 'Budpay_Payment_Gateway' );
	}

	/**
	 * This method prepares the payload for the request
	 *
	 * @param \WC_Order $order Order object.
	 * @param string    $secret_key APi key.
	 * @param bool      $testing is ci.
	 * @throws \InvalidArgumentException When the secret key is not spplied.
	 *
	 * @return array
	 */
	public function get_prepared_payload( \WC_Order $order, string $secret_key, bool $testing = false ): array {
		$order_id = $order->get_id();
		$txnref   = 'WOO_' . $order_id . '_' . time();
		$amount   = $order->get_total();
		$currency = $order->get_currency();
		$email    = $order->get_billing_email();

		if ( $testing ) {
			$txnref = 'WOO_' . $order_id . '_TEST';
		}

		if ( empty( $secret_key ) ) {
			// let admin know that the secret key is not set.
			throw new \InvalidArgumentException( 'This Payment Method is current unavailable as Administrator is yet to Configure it.Please contact Administrator for more information.' );
		}

		return array(
			'email'     => $email,
			'amount'    => $amount,
			'currency'  => $currency,
			'reference' => $txnref,
			'callback'  => $this->notify_url . '?order_id=' . $order_id,
		);
	}
}
