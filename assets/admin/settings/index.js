import { registerPlugin } from "@wordpress/plugins";
import { addFilter } from "@wordpress/hooks";
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { useState } from 'react';
// import { sanitizeHTML } from '@woocommerce/utils';
// import { RawHTML } from '@wordpress/element';
// Example of RawHTML and sanitize HTML: https://github.com/Saggre/woocommerce/blob/e38ffc8427ec4cc401d90482939bae4cddb69d7c/plugins/woocommerce-blocks/assets/js/extensions/payment-methods/bacs/index.js#L24

import { 
	Dropdown,
	Button,
	Notice,
	Panel,
	PanelBody,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CheckboxControl,
	ToggleControl,
	__experimentalText as Text,
	__experimentalHeading as Heading,
	__experimentalInputControl as InputControl,
	ResponsiveWrapper
 } from '@wordpress/components';
import { WooNavigationItem } from "@woocommerce/navigation";
import * as Woo from '@woocommerce/components';
import { Fragment } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/** Internal Dependencies */
import strings from './strings';
import Page from 'wcbudpay/admin/components/page';
import Input, { CustomSelectControl } from 'wcbudpay/admin/components/input';
// import { CheckoutIcon, EyeIcon } from 'wcbudpay/admin/icons';

import './index.scss';

// https://woocommerce.github.io/woocommerce-blocks/?path=/docs/icons-icon-library--docs

const BudpaySettings = () => {
	/** Initial Values */
	const [shouldAutoComplete, setShouldAutoComplete] = useState(false);
	const [openGeneralPanel, setOpenGeneralPanel] = useState(false);
;	const firstName = wcSettings.admin?.currentUserData?.first_name || 'there';
	const BUDPAY_LOGO_URL = budpayData?.budpay_logo;
	const default_settings = budpayData?.budpay_defaults;
	const [budpaySettings, setBudPaySettings] = useState(default_settings);
	const payment_style_on_checkout_options = [
        { label: 'Redirect', value: 'redirect' },
        // { label: 'Popup', value: 'inline' },
    ];

	let headingStyle = {  };

	if(firstName != '') {
		headingStyle['whiteSpaceCollapse'] = 'preserve-breaks';
	}
	/** Initial Values End */

	return (
		<Page isNarrow >
			<Card className="budpay-page-banner">
	
				<div className="bupay-page__heading">
					<img className="budpay__settings_logo" alt="budpay-logo" src={ BUDPAY_LOGO_URL } id="budpay__settings_logo" />

					<h2 className="budpay-font-heading" style={{ marginLeft: "15px", ...headingStyle }}>{ strings.heading( firstName ) }</h2>
				</div>	

				<div className="budpay-page__buttons">
					<Button
						variant="primary"
						isBusy={ false }
						disabled={ false }
						onClick={ () => setOpenGeneralPanel(true) }
					>
						{ strings.button.get_started }
					</Button>
				</div>
	
			</Card>

			<Panel className="budpday-page__general_settings-panel">
				<PanelBody
					title={ strings.settings.general }
					initialOpen={ openGeneralPanel }
				>
					<div className="budpday-settings__general">
						<ToggleControl
							checked={ budpaySettings.enabled == 'yes' }
							label="Enable Budpay"
							onChange={() => console.log("Toggle")}
						/>
						
						<div className="budpday-settings__inputs">
							<Input labelName="Secret Key" initialValue={ budpaySettings.live_secret_key } isConfidential />
							<Input labelName="Public Key" initialValue={ budpaySettings.live_public_key }  />
						</div>

						<Text className="budpay-webhook-link" numberOfLines={1} >
							https://8000-bajoski34-budpay-dc8esoaz6is.ws-eu110.gitpod.io/?wc-api=Budpay_Payment_Webhook
						</Text>

						<Text className="budpay-webhook-instructions" numberOfLines={1} >
						Please add this webhook URL and paste on the webhook section on your dashboard.
						</Text>
					</div>

					<div className="budpay-settings-btn-center">
						<Button
							className="budpay-settings-cta"
							variant="secondary"
							isBusy={ false }
							disabled={ false }
							onClick={ () => console.log('no') }
						>
							{ strings.button.save_settings }
						</Button>
					</div>
				</PanelBody>
			</Panel>

			<Panel className="budpay-page__checkout_settings-panel">
				<PanelBody
					title={ strings.settings.checkout }
					// icon={ CheckoutIcon }
					initialOpen={ false }
				>
					{/* <Woo.CheckboxControl
					instanceId="budpay-autocomplete-order"
					checked={ true }
					label="Autocomplete Order After Payment"
					onChange={ ( isChecked ) => {
						console.log(isChecked);
					} }
					/> */}

					
					<div className="budpday-settings__inputs">
						<CheckboxControl
							checked={ budpaySettings.autocomplete_order == 'yes' }
							help="should we complete the order on a confirmed payment?"
							label="Autocomplete Order After Payment"
							onChange={ setBudPaySettings( (budpaySettings) => {
									
							} ) }
						/>
						<Input labelName="Payment method Title" initialValue={ budpaySettings.title } />
						<CustomSelectControl labelName="Payment Style on Checkout" initialValue={ budpaySettings.payment_style } options={ payment_style_on_checkout_options } />
					</div>

					<div className="budpay-settings-btn-center">
						<Button
							className="budpay-settings-cta"
							variant="secondary"
							isBusy={ false }
							disabled={ false }
							onClick={ () => console.log('no') }
						>
							{ strings.button.save_settings }
						</Button>
					</div>
				</PanelBody>
			</Panel>

			<Panel className="budpay-page__sandbox-mode-panel">
				<PanelBody
					title={ strings.sandboxMode.title }
					initialOpen={ false }
				>
						<p>{ strings.sandboxMode.description }</p>
					<div className="budpday-settings__inputs">
						<Input labelName="Test Secret Key" initialValue={ budpaySettings.test_secret_key } isConfidential />
						<Input labelName="Test Public Key" initialValue={ budpaySettings.test_public_key } />
					</div>
					<Button
						className="budpay-settings-cta"
						variant="secondary"
						isBusy={ false }
						disabled={ false }
						onClick={ () => console.log('no') }
					>
						{ strings.button.test_mode }
					</Button>
				</PanelBody>
			</Panel>
		</Page>
	);
} 

addFilter("woocommerce_admin_pages_list", "budpay", (pages) => {
  pages.push({
    container: BudpaySettings,
    path: "/budpay",
    wpOpenMenu: "toplevel_page_woocommerce",
    breadcrumbs: ["Budpay"],
  });

  return pages;
});

const BudPayNav = () => {
	return (
	  <WooNavigationItem parentMenu="budpay-root" item="budpay-1">
		<a className="components-button" href="https://budpay.com/1">
		  BudPay
		</a>
	  </WooNavigationItem>
	);
};

registerPlugin("my-plugin", { render: BudPayNav });