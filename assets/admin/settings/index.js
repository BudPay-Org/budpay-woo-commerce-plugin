import { registerPlugin } from "@wordpress/plugins";
import { addFilter } from "@wordpress/hooks";
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { useEffect, useState } from '@wordpress/element';
// import { sanitizeHTML } from '@woocommerce/utils';
// import { RawHTML } from '@wordpress/element';
// Example of RawHTML and sanitize HTML: https://github.com/Saggre/woocommerce/blob/e38ffc8427ec4cc401d90482939bae4cddb69d7c/plugins/woocommerce-blocks/assets/js/extensions/payment-methods/bacs/index.js#L24

import { 
	Button,
	Panel,
	PanelBody,
	Card,
	Snackbar,
	CheckboxControl,
	ToggleControl,
	__experimentalText as Text,
	__experimentalHeading as Heading,
	__experimentalInputControl as InputControl,
	ResponsiveWrapper
} from '@wordpress/components';
import { WooNavigationItem } from "@woocommerce/navigation";
// import * as Woo from '@woocommerce/components';
import { Fragment } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
// import { addQueryArgs } from '@wordpress/url';

/** Internal Dependencies */
import strings from './strings';
import Page from 'wcbudpay/admin/components/page';
import Input, { CustomSelectControl } from 'wcbudpay/admin/components/input';
// import { CheckoutIcon, EyeIcon } from 'wcbudpay/admin/icons';

const NAMESPACE = "budpay/v1";
const ENDPOINT = "/settings";

import './index.scss';

apiFetch({ path: NAMESPACE + ENDPOINT }).then((configuration) => console.log(configuration));

// https://woocommerce.github.io/woocommerce-blocks/?path=/docs/icons-icon-library--docs

const BudpaySaveButton = ( { children, onClick } ) => {
	const [isBusy, setIsBusy] = useState(false);
	useEffect(() => {}, [isBusy]);
	return (
		<Button
			className="budpay-settings-cta"
			variant="secondary"
			isBusy={ isBusy }
			disabled={ false }
			onClick={ () => { 
				setIsBusy(true); 
				onClick(setIsBusy);
			} }
		>
			{ children }
		</Button>
	)
}

const EnableTestModeButton = ({ onClick, isDestructive, isBusy, children}) => {
	const [ isRed, setIsRed ] = useState(isDestructive);
	useEffect(() => {}, [isDestructive]);
	return (
		<Button
			className="budpay-settings-cta"
			variant="secondary"
			isBusy={ isBusy }
			disabled={ false }
			isDestructive={ isRed }
			onClick={ () => {
				onClick()
				setIsRed(!isRed)
			} }
			>
			{children}
		</Button>
	)
}

const BudpaySettings = () => {
	/** Initial Values */
	const default_settings = budpayData?.budpay_defaults;
	const [openGeneralPanel, setOpenGeneralPanel] = useState(false);
;	const firstName = wcSettings.admin?.currentUserData?.first_name || 'there';
	const BUDPAY_LOGO_URL = budpayData?.budpay_logo;
	const [budpaySettings, setBudPaySettings] = useState(default_settings);
	const [enableGetStartedBtn, setEnabledGetstartedBtn] = useState(false);
	const payment_style_on_checkout_options = [
        { label: 'Redirect', value: 'redirect' },
        // { label: 'Popup', value: 'inline' },
    ];

	let headingStyle = {  };

	if(firstName != '') {
		headingStyle['whiteSpaceCollapse'] = 'preserve-breaks';
	}
	/** Initial Values End */

	/** Handlers */
	const handleChange = (key, value) => {
		setBudPaySettings(prevSettings => ({
			...prevSettings,
			[key]: value 
		}));
	};
	
	const handleSecretKeyChange = (evt) => {
		handleChange('live_secret_key', evt);
	};

	const handlePaymentTitle = (evt) => {
		handleChange('title', evt);
	}
	
	const handlePublicKeyChange = (evt) => {
		handleChange('live_public_key', evt);
	};

	const handleTestSecretKeyChange = (evt) => {
		handleChange('test_secret_key', evt);
	};

	const handleTestPublicKeyChange = (evt) => {
		handleChange('test_public_key', evt);
	};

	return (
		<Fragment>
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
							disabled={ enableGetStartedBtn }
							onClick={ () => {
								setOpenGeneralPanel(true);
								setEnabledGetstartedBtn(false);
							} }
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
								onChange={() => setBudPaySettings( prevSettings => ({
									...prevSettings,
									enabled: prevSettings.enabled == 'yes' ? 'no' : 'yes' // Toggle the value
								}) )}
							/>
							
							<div className="budpday-settings__inputs">
								<Input labelName="Secret Key" initialValue={ budpaySettings.live_secret_key } onChange={ handleSecretKeyChange } isConfidential />
								<Input labelName="Public Key" initialValue={ budpaySettings.live_public_key } onChange={ handlePublicKeyChange }  />
							</div>

							<Text className="budpay-webhook-link" numberOfLines={1} >
								{ budpayData.budpay_webhook }
							</Text>

							<Text className="budpay-webhook-instructions" numberOfLines={1} >
							Please add this webhook URL and paste on the webhook section on your dashboard.
							</Text>
						</div>

						<div className="budpay-settings-btn-center">
							<BudpaySaveButton onClick={ (setIsBusy) => {
									apiFetch({
										path: NAMESPACE + ENDPOINT,
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
											'X-WP-Nonce': wpApiSettings.nonce,
										},
										data: budpaySettings // Send the updated settings to the server
									}).then(response => {
										console.log('Settings saved successfully:', response);
										// Optionally, you can update the UI or show a success message here
										setIsBusy(false);

									}).catch(error => {
										console.error('Error saving settings:', error);
										// Handle errors if any
									});
								} }>
								{ strings.button.save_settings }	
							</BudpaySaveButton>
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
								onChange={ () => setBudPaySettings( prevSettings => ({
									...prevSettings,
									autocomplete_order: prevSettings.autocomplete_order == 'yes' ? 'no' : 'yes' // Toggle the value
								}) ) }
							/>
							<Input labelName="Payment method Title" initialValue={ budpaySettings.title } onChange={ handlePaymentTitle } />
							<CustomSelectControl labelName="Payment Style on Checkout" initialValue={ budpaySettings.payment_style } options={ payment_style_on_checkout_options } />
						</div>

						<div className="budpay-settings-btn-center">
							<BudpaySaveButton onClick={ (setIsBusy) => {
									apiFetch({
										path: NAMESPACE + ENDPOINT,
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
											'X-WP-Nonce': wpApiSettings.nonce,
										},
										data: budpaySettings // Send the updated settings to the server
									}).then(response => {
										console.log('Settings saved successfully:', response);
										// Optionally, you can update the UI or show a success message here
										setIsBusy(false);

									}).catch(error => {
										console.error('Error saving settings:', error);
										// Handle errors if any
									});
								} }>
								{ strings.button.save_settings }	
							</BudpaySaveButton>
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
							<Input labelName="Test Secret Key" initialValue={ budpaySettings.test_secret_key } onChange={ handleTestSecretKeyChange }  isConfidential />
							<Input labelName="Test Public Key" initialValue={ budpaySettings.test_public_key } onChange={ handleTestPublicKeyChange }  />
						</div>
						<EnableTestModeButton
							className="budpay-settings-cta"
							variant="secondary"
							isBusy={ false }
							disabled={ false }
							isDestructive={ budpaySettings.go_live == 'no' }
							onClick={ () => {
								setBudPaySettings( prevSettings => ({
									...prevSettings,
									go_live: (prevSettings.go_live == 'yes') ? 'no' : 'yes' // Toggle the value
								}) )

								apiFetch({
									path: NAMESPACE + ENDPOINT,
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
										'X-WP-Nonce': wpApiSettings.nonce,
									},
									data: { ...budpaySettings, go_live: (budpaySettings.go_live == 'yes') ? 'no' : 'yes'  } // Send the updated settings to the server
								}).then(response => {
									console.log('Test mode enabled successfully:', response);
									// Optionally, you can update the UI or show a success message here
								}).catch(error => {
									console.error('Error saving settings:', error);
									// Handle errors if any
								});
							} }
						>
							{ (budpaySettings.go_live === 'yes') ?  strings.button.enable_test_mode: strings.button.disable_test_mode  }
						</EnableTestModeButton>
					</PanelBody>
				</Panel>
			</Page>
		</Fragment>
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