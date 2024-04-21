/* eslint-disable max-len */
/**
 * External dependencies
 */
import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import interpolateComponents from '@automattic/interpolate-components';

export default {
	button: {
		get_started: __(
			'Get Started!',
			'budpay'
		),
		save_settings: __(
			'Save Configuration',
			'budpay'
		),
		test_mode: __( 'Enable Test mode', 'budpay' ),
	},
	heading: ( firstName ) =>
		sprintf(
			/* translators: %s: first name of the merchant, if it exists, %s: BudPay. */
			__( 'Hi%s, Welcome to %s!', 'budpay' ),
			firstName ? ` ${ firstName }` : '',
			'Budpay'
		),
	settings: {
		general: __(
			'API/Webhook Settings',
			'budpay'
		),
		checkout: __(
			'Checkout Settings',
			'budpay'
		),
	},
	card: __(
		'Offer card payments',
		'budpay'
	),
	sandboxMode: {
		title: __(
			"Test Mode: I'm setting up a store for someone else.",
			'budpay'
		),
		description: sprintf(
			/* translators: %s: Budpay */
			__(
				'This option will set up %s in test mode. When you’re ready to launch your store, switching to live payments is easy.',
				'budpay'
			),
			'Budpay'
		),
	},
	testModeNotice: interpolateComponents( {
		mixedString: __(
			'Test mode is enabled, only test credentials can be used to make payments. If you want to process live transactions, please {{learnMoreLink}}disable it{{/learnMoreLink}}.',
			'budpay'
		),
		components: {
			learnMoreLink: (
				// Link content is in the format string above. Consider disabling jsx-a11y/anchor-has-content.
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				<a
					href="#"
					target="_blank"
					rel="noreferrer"
				/>
			),
		},
	} ),
	infoNotice: {
		button: __( 'enable collection.', 'budpay' ),
	},
	infoModal: {
		title: sprintf(
			/* translators: %s: Budpay */
			__( 'Verifying your information with %s', 'budpay' ),
			'Budpay'
		),
	
	},
	stepsHeading: __(
		'You’re only steps away from getting paid',
		'budpay'
	),
	step1: {
		heading: __(
			'Create and connect your account',
			'budpay'
		),
		description: __(
			'To ensure safe and secure transactions, a WordPress.com account is required.',
			'budpay'
		),
	},
	step3: {
		heading: __( 'Setup complete!', 'budpay' ),
		description: sprintf(
			/* translators: %s: Budpay */
			__(
				'You’re ready to start using the features and benefits of %s.',
				'budpay'
			),
			'Budpay'
		),
	},
	onboardingDisabled: __(
		"We've temporarily paused new account creation. We'll notify you when we resume!",
		'budpay'
	),
	incentive: {
		termsAndConditions: ( url ) =>
			createInterpolateElement(
				__(
					'*See <a>Terms and Conditions</a> for details.',
					'budpay'
				),
				{
					a: (
						// eslint-disable-next-line jsx-a11y/anchor-has-content
						<a
							href={ url }
							target="_blank"
							rel="noopener noreferrer"
						/>
					),
				}
			),
	},
	nonSupportedCountry: createInterpolateElement(
		sprintf(
			/* translators: %1$s: Budpay */
			__(
				'<b>%1$s is not currently available in your location</b>.',
				'budpay'
			),
			'Budpay'
		),
		{
			b: <b />,
			a: (
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				<a
					href="#"
					target="_blank"
					rel="noopener noreferrer"
				/>
			),
		}
	),
};