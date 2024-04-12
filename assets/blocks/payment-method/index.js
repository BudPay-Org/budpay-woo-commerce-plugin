/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { PAYMENT_METHOD_NAME } from './constants';
import {
	getBlocksConfiguration,
} from 'wcbudpay/blocks/utils';

/**
 * Content component
 */
const Content = () => {
	return <div>{ decodeEntities( getBlocksConfiguration()?.description || __('You may be redirected to a secure page to complete your payment.', 'budpay') ) }</div>;
};

const BUDPAY_ASSETS = getBlocksConfiguration()?.asset_url ?? null;


const paymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: (
		<div style={{ display: 'flex', flexDirection: 'row', rowGap: '0em', alignItems: 'center'}}>
			<img
			src={ `${BUDPAY_ASSETS}/img/budpay.png` }
			alt={ decodeEntities(
				getBlocksConfiguration()?.title || __( 'Budpay', 'budpay' )
			) }
			/>
			<b><h4>BudPay</h4></b>
		</div>
	),
	placeOrderButtonLabel: __(
		'Proceed to Budpay',
		'budpay'
	),
	ariaLabel: decodeEntities(
		getBlocksConfiguration()?.title ||
		__( 'Payment via Budpay', 'budpay' )
	),
	canMakePayment: () => true,
	content: <Content />,
	edit: <Content />,
	paymentMethodId: PAYMENT_METHOD_NAME,
	supports: {
		features:  getBlocksConfiguration()?.supports ?? [],
	},
}

export default paymentMethod;