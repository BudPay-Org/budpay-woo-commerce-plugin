/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/blocks/payment-method/constants.js":
/*!***************************************************!*\
  !*** ./assets/blocks/payment-method/constants.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   PAYMENT_METHOD_NAME: () => (/* binding */ PAYMENT_METHOD_NAME),
    /* harmony export */   PAYMENT_METHOD_VERSION: () => (/* binding */ PAYMENT_METHOD_VERSION)
    /* harmony export */ });
    const PAYMENT_METHOD_NAME = 'budpay';
    const PAYMENT_METHOD_VERSION = '1.0.0';
    
    /***/ }),
    
    /***/ "./assets/blocks/payment-method/index.js":
    /*!***********************************************!*\
      !*** ./assets/blocks/payment-method/index.js ***!
      \***********************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
    /* harmony export */ });
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
    /* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
    /* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./assets/blocks/payment-method/constants.js");
    /* harmony import */ var wcbudpay_blocks_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wcbudpay/blocks/utils */ "./assets/blocks/utils.js");
    var _getBlocksConfigurati, _getBlocksConfigurati2;
    
    /**
     * WordPress dependencies
     */
    
    
    
    /**
     * Internal dependencies
     */
    
    
    
    /**
     * Content component
     */
    const Content = () => {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntities)((0,wcbudpay_blocks_utils__WEBPACK_IMPORTED_MODULE_4__.getBlocksConfiguration)()?.description || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You may be redirected to a secure page to complete your payment.', 'budpay')));
    };
    const BUDPAY_ASSETS = (_getBlocksConfigurati = (0,wcbudpay_blocks_utils__WEBPACK_IMPORTED_MODULE_4__.getBlocksConfiguration)()?.asset_url) !== null && _getBlocksConfigurati !== void 0 ? _getBlocksConfigurati : null;
    const paymentMethod = {
      name: _constants__WEBPACK_IMPORTED_MODULE_3__.PAYMENT_METHOD_NAME,
      label: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          display: 'flex',
          flexDirection: 'row',
          rowGap: '0em',
          alignItems: 'center'
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: `${BUDPAY_ASSETS}/img/budpay.png`,
        alt: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntities)((0,wcbudpay_blocks_utils__WEBPACK_IMPORTED_MODULE_4__.getBlocksConfiguration)()?.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Budpay', 'budpay'))
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "BudPay"))),
      placeOrderButtonLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Proceed to Budpay', 'budpay'),
      ariaLabel: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntities)((0,wcbudpay_blocks_utils__WEBPACK_IMPORTED_MODULE_4__.getBlocksConfiguration)()?.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Payment via Budpay', 'budpay')),
      canMakePayment: () => true,
      content: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Content, null),
      edit: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Content, null),
      paymentMethodId: _constants__WEBPACK_IMPORTED_MODULE_3__.PAYMENT_METHOD_NAME,
      supports: {
        features: (_getBlocksConfigurati2 = (0,wcbudpay_blocks_utils__WEBPACK_IMPORTED_MODULE_4__.getBlocksConfiguration)()?.supports) !== null && _getBlocksConfigurati2 !== void 0 ? _getBlocksConfigurati2 : []
      }
    };
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (paymentMethod);
    
    /***/ }),
    
    /***/ "./assets/blocks/utils.js":
    /*!********************************!*\
      !*** ./assets/blocks/utils.js ***!
      \********************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   createPaymentRequestUsingCart: () => (/* binding */ createPaymentRequestUsingCart),
    /* harmony export */   getBlocksConfiguration: () => (/* binding */ getBlocksConfiguration),
    /* harmony export */   getPublicKey: () => (/* binding */ getPublicKey),
    /* harmony export */   updatePaymentRequestUsingCart: () => (/* binding */ updatePaymentRequestUsingCart)
    /* harmony export */ });
    /* harmony import */ var _woocommerce_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @woocommerce/settings */ "@woocommerce/settings");
    /* harmony import */ var _woocommerce_settings__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_woocommerce_settings__WEBPACK_IMPORTED_MODULE_0__);
    /**
     * WooCommerce dependencies
     */
    
    const getBlocksConfiguration = () => {
      const budpayServerData = (0,_woocommerce_settings__WEBPACK_IMPORTED_MODULE_0__.getSetting)('budpay_data', null);
      if (!budpayServerData) {
        throw new Error('Budpay initialization data is not available');
      }
      return budpayServerData;
    };
    
    /**
     * Creates a payment request using cart data from WooCommerce.
     *
     * @param {Object} Budpay - The Budpay JS object.
     * @param {Object} cart - The cart data response from the store's AJAX API.
     *
     * @return {Object} A Budpay payment request.
     */
    const createPaymentRequestUsingCart = (budpay, cart) => {
      const options = {
        total: cart.order_data.total,
        currency: cart.order_data.currency,
        country: cart.order_data.country_code,
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: getBlocksConfiguration()?.checkout?.needs_payer_phone,
        requestShipping: !!cart.shipping_required,
        displayItems: cart.order_data.displayItems
      };
      if (options.country === 'PR') {
        options.country = 'US';
      }
      return budpay.paymentRequest(options);
    };
    
    /**
     * Updates the given PaymentRequest using the data in the cart object.
     *
     * @param {Object} paymentRequest  The payment request object.
     * @param {Object} cart  The cart data response from the store's AJAX API.
     */
    const updatePaymentRequestUsingCart = (paymentRequest, cart) => {
      const options = {
        total: cart.order_data.total,
        currency: cart.order_data.currency,
        displayItems: cart.order_data.displayItems
      };
      paymentRequest.update(options);
    };
    
    /**
     * Returns the Budpay public key
     *
     * @throws Error
     * @return {string} The public api key for the Budpay payment method.
     */
    const getPublicKey = () => {
      const public_key = getBlocksConfiguration()?.public_key;
      if (!public_key) {
        throw new Error('There is no public key available for Budpay. Make sure it is available on the wc.budpay_data.public_key property.');
      }
      return public_key;
    };
    
    /***/ }),
    
    /***/ "react":
    /*!************************!*\
      !*** external "React" ***!
      \************************/
    /***/ ((module) => {
    
    module.exports = window["React"];
    
    /***/ }),
    
    /***/ "@woocommerce/blocks-registry":
    /*!******************************************!*\
      !*** external ["wc","wcBlocksRegistry"] ***!
      \******************************************/
    /***/ ((module) => {
    
    module.exports = window["wc"]["wcBlocksRegistry"];
    
    /***/ }),
    
    /***/ "@woocommerce/settings":
    /*!************************************!*\
      !*** external ["wc","wcSettings"] ***!
      \************************************/
    /***/ ((module) => {
    
    module.exports = window["wc"]["wcSettings"];
    
    /***/ }),
    
    /***/ "@wordpress/html-entities":
    /*!**************************************!*\
      !*** external ["wp","htmlEntities"] ***!
      \**************************************/
    /***/ ((module) => {
    
    module.exports = window["wp"]["htmlEntities"];
    
    /***/ }),
    
    /***/ "@wordpress/i18n":
    /*!******************************!*\
      !*** external ["wp","i18n"] ***!
      \******************************/
    /***/ ((module) => {
    
    module.exports = window["wp"]["i18n"];
    
    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
    /******/ 			return cachedModule.exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			// no module.id needed
    /******/ 			// no module.loaded needed
    /******/ 			exports: {}
    /******/ 		};
    /******/ 	
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/ 	
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	/* webpack/runtime/compat get default export */
    /******/ 	(() => {
    /******/ 		// getDefaultExport function for compatibility with non-harmony modules
    /******/ 		__webpack_require__.n = (module) => {
    /******/ 			var getter = module && module.__esModule ?
    /******/ 				() => (module['default']) :
    /******/ 				() => (module);
    /******/ 			__webpack_require__.d(getter, { a: getter });
    /******/ 			return getter;
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = (exports, definition) => {
    /******/ 			for(var key in definition) {
    /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    /******/ 				}
    /******/ 			}
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	(() => {
    /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
    /******/ 		// define __esModule on exports
    /******/ 		__webpack_require__.r = (exports) => {
    /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 			}
    /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
    /*!********************************!*\
      !*** ./assets/blocks/index.js ***!
      \********************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _woocommerce_blocks_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @woocommerce/blocks-registry */ "@woocommerce/blocks-registry");
    /* harmony import */ var _woocommerce_blocks_registry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_woocommerce_blocks_registry__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var wcbudpay_blocks_payment_method__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wcbudpay/blocks/payment-method */ "./assets/blocks/payment-method/index.js");
    /**
     * WooCommerce dependencies
     */
    
    
    /**
     * Internal dependencies
     *
     * reference: https://github.com/woocommerce/woocommerce-blocks/blob/trunk/docs/third-party-developers/extensibility/checkout-payment-methods/payment-method-integration.md
     */
    
    
    // Register Budpay Payment Request.
    (0,_woocommerce_blocks_registry__WEBPACK_IMPORTED_MODULE_0__.registerPaymentMethod)(wcbudpay_blocks_payment_method__WEBPACK_IMPORTED_MODULE_1__["default"]);
    
    // TODO: implement a Direct Card payment metho
    })();
    
    /******/ })()
    ;
    //# sourceMappingURL=index.js.map