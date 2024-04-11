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
