/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/@automattic+interpolate-components@1.2.1_react@18.2.0/node_modules/@automattic/interpolate-components/dist/esm/index.js":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@automattic+interpolate-components@1.2.1_react@18.2.0/node_modules/@automattic/interpolate-components/dist/esm/index.js ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ interpolate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tokenize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokenize */ "./node_modules/.pnpm/@automattic+interpolate-components@1.2.1_react@18.2.0/node_modules/@automattic/interpolate-components/dist/esm/tokenize.js");



function getCloseIndex(openIndex, tokens) {
  const openToken = tokens[openIndex];
  let nestLevel = 0;

  for (let i = openIndex + 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.value === openToken.value) {
      if (token.type === 'componentOpen') {
        nestLevel++;
        continue;
      }

      if (token.type === 'componentClose') {
        if (nestLevel === 0) {
          return i;
        }

        nestLevel--;
      }
    }
  } // if we get this far, there was no matching close token


  throw new Error('Missing closing component token `' + openToken.value + '`');
}

function buildChildren(tokens, components) {
  let children = [];
  let openComponent;
  let openIndex;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'string') {
      children.push(token.value);
      continue;
    } // component node should at least be set


    if (components[token.value] === undefined) {
      throw new Error(`Invalid interpolation, missing component node: \`${token.value}\``);
    } // should be either ReactElement or null (both type "object"), all other types deprecated


    if (typeof components[token.value] !== 'object') {
      throw new Error(`Invalid interpolation, component node must be a ReactElement or null: \`${token.value}\``);
    } // we should never see a componentClose token in this loop


    if (token.type === 'componentClose') {
      throw new Error(`Missing opening component token: \`${token.value}\``);
    }

    if (token.type === 'componentOpen') {
      openComponent = components[token.value];
      openIndex = i;
      break;
    } // componentSelfClosing token


    children.push(components[token.value]);
    continue;
  }

  if (openComponent) {
    const closeIndex = getCloseIndex(openIndex, tokens);
    const grandChildTokens = tokens.slice(openIndex + 1, closeIndex);
    const grandChildren = buildChildren(grandChildTokens, components);
    const clonedOpenComponent = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(openComponent, {}, grandChildren);
    children.push(clonedOpenComponent);

    if (closeIndex < tokens.length - 1) {
      const siblingTokens = tokens.slice(closeIndex + 1);
      const siblings = buildChildren(siblingTokens, components);
      children = children.concat(siblings);
    }
  }

  children = children.filter(Boolean);

  if (children.length === 0) {
    return null;
  }

  if (children.length === 1) {
    return children[0];
  }

  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, ...children);
}

function interpolate(options) {
  const {
    mixedString,
    components,
    throwErrors
  } = options;

  if (!components) {
    return mixedString;
  }

  if (typeof components !== 'object') {
    if (throwErrors) {
      throw new Error(`Interpolation Error: unable to process \`${mixedString}\` because components is not an object`);
    }

    return mixedString;
  }

  const tokens = (0,_tokenize__WEBPACK_IMPORTED_MODULE_1__["default"])(mixedString);

  try {
    return buildChildren(tokens, components);
  } catch (error) {
    if (throwErrors) {
      throw new Error(`Interpolation Error: unable to process \`${mixedString}\` because of error \`${error.message}\``);
    }

    return mixedString;
  }
}

/***/ }),

/***/ "./node_modules/.pnpm/@automattic+interpolate-components@1.2.1_react@18.2.0/node_modules/@automattic/interpolate-components/dist/esm/tokenize.js":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@automattic+interpolate-components@1.2.1_react@18.2.0/node_modules/@automattic/interpolate-components/dist/esm/tokenize.js ***!
  \*******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tokenize)
/* harmony export */ });
function identifyToken(item) {
  // {{/example}}
  if (item.startsWith('{{/')) {
    return {
      type: 'componentClose',
      value: item.replace(/\W/g, '')
    };
  } // {{example /}}


  if (item.endsWith('/}}')) {
    return {
      type: 'componentSelfClosing',
      value: item.replace(/\W/g, '')
    };
  } // {{example}}


  if (item.startsWith('{{')) {
    return {
      type: 'componentOpen',
      value: item.replace(/\W/g, '')
    };
  }

  return {
    type: 'string',
    value: item
  };
}

function tokenize(mixedString) {
  const tokenStrings = mixedString.split(/(\{\{\/?\s*\w+\s*\/?\}\})/g); // split to components and strings

  return tokenStrings.map(identifyToken);
}

/***/ }),

/***/ "./assets/admin/components/error-boundary/index.jsx":
/*!**********************************************************!*\
  !*** ./assets/admin/components/error-boundary/index.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);

/**
 * WordPress dependencies
 */


// import InlineNotice from 'wcbudpay/admin/components/inline-notice';

class ErrorBoundary extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super(...arguments);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, info) {
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }
  render() {
    if (!this.state.error) {
      return this.props.children;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('There was an error rendering this view. Please contact support for assistance if the problem persists.', 'budpay'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), this.state.error.toString());
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

/***/ }),

/***/ "./assets/admin/components/input/index.jsx":
/*!*************************************************!*\
  !*** ./assets/admin/components/input/index.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomSelectControl: () => (/* binding */ CustomSelectControl),
/* harmony export */   InputWithSideLabel: () => (/* binding */ InputWithSideLabel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);



const CustomSelectControl = ({
  labelName,
  initialValue,
  options,
  onChange
}) => {
  const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);
  const handleChange = newValue => {
    setValue(newValue);
    onChange?.(newValue);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: labelName || 'No Label Added',
    value: value,
    options: options,
    onChange: handleChange
  });
};
const InputWithSideLabel = ({
  initialValue,
  labelName,
  isConfidential,
  onChange
}) => {
  const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);
  const type = isConfidential ? 'password' : 'text';
  const handleChange = nextValue => {
    const newValue = nextValue !== null && nextValue !== void 0 ? nextValue : '';
    setValue(newValue);
    onChange?.(newValue);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
    __unstableInputWidth: "3em",
    label: labelName || 'Label',
    value: value,
    type: type,
    labelPosition: "edge",
    onChange: handleChange
  });
};
const Input = ({
  initialValue,
  labelName,
  onChange,
  isConfidential,
  error
}) => {
  const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);
  const type = isConfidential ? 'password' : 'text';
  const handleChange = nextValue => {
    setValue(nextValue);
    onChange?.(nextValue);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Optional side effects when value changes
  }, [value]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: '1rem'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
    label: labelName || 'Label',
    value: value,
    type: type,
    onChange: handleChange
  }), error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      color: 'red',
      fontSize: '0.875em',
      marginTop: '0.25rem'
    }
  }, error));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);

/***/ }),

/***/ "./assets/admin/components/page/index.jsx":
/*!************************************************!*\
  !*** ./assets/admin/components/page/index.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./assets/admin/components/page/style.scss");
/* harmony import */ var wcbudpay_admin_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wcbudpay/admin/components/error-boundary */ "./assets/admin/components/error-boundary/index.jsx");

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


const Page = ({
  children,
  maxWidth,
  isNarrow,
  className = ''
}) => {
  const customStyle = maxWidth ? {
    maxWidth
  } : undefined;
  const classNames = [className, 'budpay-page'];
  if (isNarrow) {
    classNames.push('is-narrow');
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classNames.join(' '),
    style: customStyle
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wcbudpay_admin_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__["default"], null, children));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Page);

/***/ }),

/***/ "./assets/admin/settings/strings.jsx":
/*!*******************************************!*\
  !*** ./assets/admin/settings/strings.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _automattic_interpolate_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @automattic/interpolate-components */ "./node_modules/.pnpm/@automattic+interpolate-components@1.2.1_react@18.2.0/node_modules/@automattic/interpolate-components/dist/esm/index.js");

/* eslint-disable max-len */
/**
 * External dependencies
 */




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  button: {
    get_started: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Started!', 'budpay'),
    save_settings: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save Configuration', 'budpay'),
    enable_test_mode: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable Test mode', 'budpay'),
    disable_test_mode: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disable Test mode', 'budpay')
  },
  heading: firstName => (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: %s: first name of the merchant, if it exists, %s: BudPay. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hi%s,\n Welcome to %s!', 'budpay'), firstName ? ` ${firstName}` : '', 'Budpay'),
  settings: {
    general: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('API/Webhook Settings', 'budpay'),
    checkout: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Checkout Settings', 'budpay')
  },
  card: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Offer card payments', 'budpay'),
  sandboxMode: {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Test Mode: I'm setting up a store for someone else.", 'budpay'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: %s: Budpay */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This option will set up %s in test mode. When you’re ready to launch your store, switching to live payments is easy.', 'budpay'), 'Budpay')
  },
  testModeNotice: (0,_automattic_interpolate_components__WEBPACK_IMPORTED_MODULE_3__["default"])({
    mixedString: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Test mode is enabled, only test credentials can be used to make payments. If you want to process live transactions, please {{learnMoreLink}}disable it{{/learnMoreLink}}.', 'budpay'),
    components: {
      learnMoreLink:
      // Link content is in the format string above. Consider disabling jsx-a11y/anchor-has-content.
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: "#",
        target: "_blank",
        rel: "noreferrer"
      })
    }
  }),
  infoNotice: {
    button: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('enable collection.', 'budpay')
  },
  infoModal: {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: %s: Budpay */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Verifying your information with %s', 'budpay'), 'Budpay')
  },
  stepsHeading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You’re only steps away from getting paid', 'budpay'),
  step1: {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create and connect your account', 'budpay'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('To ensure safe and secure transactions, a WordPress.com account is required.', 'budpay')
  },
  step3: {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Setup complete!', 'budpay'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: %s: Budpay */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You’re ready to start using the features and benefits of %s.', 'budpay'), 'Budpay')
  },
  onboardingDisabled: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We've temporarily paused new account creation. We'll notify you when we resume!", 'budpay'),
  incentive: {
    termsAndConditions: url => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('*See <a>Terms and Conditions</a> for details.', 'budpay'), {
      a:
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer"
      })
    })
  },
  nonSupportedCountry: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: %1$s: Budpay */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('<b>%1$s is not currently available in your location</b>.', 'budpay'), 'Budpay'), {
    b: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null),
    a:
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "#",
      target: "_blank",
      rel: "noopener noreferrer"
    })
  })
});

/***/ }),

/***/ "./assets/admin/components/page/style.scss":
/*!*************************************************!*\
  !*** ./assets/admin/components/page/style.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/admin/settings/index.scss":
/*!******************************************!*\
  !*** ./assets/admin/settings/index.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@woocommerce/navigation":
/*!************************************!*\
  !*** external ["wc","navigation"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wc"]["navigation"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js ***!
  \******************************************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************************!*\
  !*** ./assets/admin/settings/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _woocommerce_navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @woocommerce/navigation */ "@woocommerce/navigation");
/* harmony import */ var _woocommerce_navigation__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_woocommerce_navigation__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _strings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./strings */ "./assets/admin/settings/strings.jsx");
/* harmony import */ var wcbudpay_admin_components_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! wcbudpay/admin/components/page */ "./assets/admin/components/page/index.jsx");
/* harmony import */ var wcbudpay_admin_components_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! wcbudpay/admin/components/input */ "./assets/admin/components/input/index.jsx");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./index.scss */ "./assets/admin/settings/index.scss");






// import { sanitizeHTML } from '@woocommerce/utils';
// import { RawHTML } from '@wordpress/element';
// Example of RawHTML and sanitize HTML: https://github.com/Saggre/woocommerce/blob/e38ffc8427ec4cc401d90482939bae4cddb69d7c/plugins/woocommerce-blocks/assets/js/extensions/payment-methods/bacs/index.js#L24



// import * as Woo from '@woocommerce/components';


// import { addQueryArgs } from '@wordpress/url';

/** Internal Dependencies */



// import { CheckoutIcon, EyeIcon } from 'wcbudpay/admin/icons';

const NAMESPACE = "budpay/v1";
const ENDPOINT = "/settings";

_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default()({
  path: NAMESPACE + ENDPOINT
}).then(configuration => console.log(configuration));

// https://woocommerce.github.io/woocommerce-blocks/?path=/docs/icons-icon-library--docs

const BudpaySaveButton = ({
  children,
  onClick
}) => {
  const [isBusy, setIsBusy] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {}, [isBusy]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
    className: "budpay-settings-cta",
    variant: "secondary",
    isBusy: isBusy,
    disabled: false,
    onClick: () => {
      setIsBusy(true);
      onClick(setIsBusy);
    }
  }, children);
};
const EnableTestModeButton = ({
  onClick,
  isDestructive,
  isBusy,
  children
}) => {
  const [isRed, setIsRed] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(isDestructive);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {}, [isDestructive]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
    className: "budpay-settings-cta",
    variant: "secondary",
    isBusy: isBusy,
    disabled: false,
    isDestructive: isRed,
    onClick: () => {
      onClick();
      setIsRed(!isRed);
    }
  }, children);
};
const BudpaySettings = () => {
  /** Initial Values */
  const default_settings = budpayData?.budpay_defaults;
  const [openGeneralPanel, setOpenGeneralPanel] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
  ;
  const firstName = wcSettings.admin?.currentUserData?.first_name || 'there';
  const BUDPAY_LOGO_URL = budpayData?.budpay_logo;
  const [budpaySettings, setBudPaySettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(default_settings);
  const [enableGetStartedBtn, setEnabledGetstartedBtn] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
  const payment_style_on_checkout_options = [{
    label: 'Redirect',
    value: 'redirect'
  }
  // { label: 'Popup', value: 'inline' },
  ];
  const [errors, setErrors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({
    live_secret_key: '',
    live_public_key: '',
    test_secret_key: '',
    test_public_key: ''
  });
  let headingStyle = {};
  if (firstName != '') {
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
  const validateKey = (key, type) => {
    if (type === 'public') {
      return key.startsWith('pk_live_') || key.startsWith('pk_test_');
    }
    if (type === 'secret') {
      return key.startsWith('sk_live_') || key.startsWith('sk_test_');
    }
    return false;
  };
  const handleSecretKeyChange = value => {
    handleChange('live_secret_key', value);
    const isValid = validateKey(value, 'secret');
    setErrors(prev => ({
      ...prev,
      live_secret_key: isValid ? '' : 'Invalid Secret Key. Must start with sk_live_'
    }));
  };
  const handlePublicKeyChange = value => {
    handleChange('live_public_key', value);
    const isValid = validateKey(value, 'public');
    setErrors(prev => ({
      ...prev,
      live_public_key: isValid ? '' : 'Invalid Public Key. Must start with pk_live_'
    }));
  };
  const handlePaymentTitle = evt => {
    handleChange('title', evt);
  };
  const handleTestSecretKeyChange = value => {
    handleChange('test_secret_key', value);
    const isValid = validateKey(value, 'secret');
    setErrors(prev => ({
      ...prev,
      test_secret_key: isValid ? '' : 'Invalid Secret Key. Must start with sk_test_'
    }));
  };
  const handleTestPublicKeyChange = value => {
    handleChange('test_public_key', value);
    const isValid = validateKey(value, 'public');
    setErrors(prev => ({
      ...prev,
      test_public_key: isValid ? '' : 'Invalid Public Key. Must start with pk_test_'
    }));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wcbudpay_admin_components_page__WEBPACK_IMPORTED_MODULE_10__["default"], {
    isNarrow: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Card, {
    className: "budpay-page-banner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bupay-page__heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "budpay__settings_logo",
    alt: "budpay-logo",
    src: BUDPAY_LOGO_URL,
    id: "budpay__settings_logo"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "budpay-font-heading",
    style: {
      marginLeft: "15px",
      ...headingStyle
    }
  }, _strings__WEBPACK_IMPORTED_MODULE_9__["default"].heading(firstName))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "budpay-page__buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
    variant: "primary",
    isBusy: false,
    disabled: enableGetStartedBtn,
    onClick: () => {
      setOpenGeneralPanel(true);
      setEnabledGetstartedBtn(false);
    }
  }, _strings__WEBPACK_IMPORTED_MODULE_9__["default"].button.get_started))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Panel, {
    className: "budpday-page__general_settings-panel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: _strings__WEBPACK_IMPORTED_MODULE_9__["default"].settings.general,
    initialOpen: openGeneralPanel
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "budpday-settings__general"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    checked: budpaySettings.enabled == 'yes',
    label: "Enable Budpay",
    onChange: () => setBudPaySettings(prevSettings => ({
      ...prevSettings,
      enabled: prevSettings.enabled == 'yes' ? 'no' : 'yes' // Toggle the value
    }))
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "budpday-settings__inputs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wcbudpay_admin_components_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
    labelName: "Secret Key",
    initialValue: budpaySettings.live_secret_key,
    onChange: handleSecretKeyChange,
    isConfidential: true,
    error: errors.live_secret_key
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wcbudpay_admin_components_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
    labelName: "Public Key",
    initialValue: budpaySettings.live_public_key,
    onChange: handlePublicKeyChange,
    error: errors.live_public_key
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalText, {
    className: "budpay-webhook-link",
    numberOfLines: 1,
    color: "red"
  }, budpayData.budpay_webhook), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalText, {
    className: "budpay-webhook-instructions",
    numberOfLines: 1
  }, "Please add this webhook URL and paste on the webhook section on your dashboard.")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "budpay-settings-btn-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BudpaySaveButton, {
    onClick: setIsBusy => {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default()({
        path: NAMESPACE + ENDPOINT,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': wpApiSettings.nonce
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
    }
  }, _strings__WEBPACK_IMPORTED_MODULE_9__["default"].button.save_settings)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Panel, {
    className: "budpay-page__checkout_settings-panel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: _strings__WEBPACK_IMPORTED_MODULE_9__["default"].settings.checkout
    // icon={ CheckoutIcon }
    ,
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "budpday-settings__inputs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.CheckboxControl, {
    checked: budpaySettings.autocomplete_order == 'yes',
    help: "should we complete the order on a confirmed payment?",
    label: "Autocomplete Order After Payment",
    onChange: () => setBudPaySettings(prevSettings => ({
      ...prevSettings,
      autocomplete_order: prevSettings.autocomplete_order == 'yes' ? 'no' : 'yes' // Toggle the value
    }))
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wcbudpay_admin_components_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
    labelName: "Payment method Title",
    initialValue: budpaySettings.title,
    onChange: handlePaymentTitle
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wcbudpay_admin_components_input__WEBPACK_IMPORTED_MODULE_11__.CustomSelectControl, {
    labelName: "Payment Style on Checkout",
    initialValue: budpaySettings.payment_style,
    options: payment_style_on_checkout_options
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "budpay-settings-btn-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BudpaySaveButton, {
    onClick: setIsBusy => {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default()({
        path: NAMESPACE + ENDPOINT,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': wpApiSettings.nonce
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
    }
  }, _strings__WEBPACK_IMPORTED_MODULE_9__["default"].button.save_settings)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Panel, {
    className: "budpay-page__sandbox-mode-panel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: _strings__WEBPACK_IMPORTED_MODULE_9__["default"].sandboxMode.title,
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, _strings__WEBPACK_IMPORTED_MODULE_9__["default"].sandboxMode.description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "budpday-settings__inputs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wcbudpay_admin_components_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
    labelName: "Test Secret Key",
    initialValue: budpaySettings.test_secret_key,
    onChange: handleTestSecretKeyChange,
    isConfidential: true,
    error: errors.test_secret_key
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wcbudpay_admin_components_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
    labelName: "Test Public Key",
    initialValue: budpaySettings.test_public_key,
    onChange: handleTestPublicKeyChange,
    error: errors.test_public_key
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(EnableTestModeButton, {
    className: "budpay-settings-cta",
    variant: "secondary",
    isBusy: false,
    disabled: false,
    isDestructive: budpaySettings.go_live == 'no',
    onClick: () => {
      setBudPaySettings(prevSettings => ({
        ...prevSettings,
        go_live: prevSettings.go_live == 'yes' ? 'no' : 'yes' // Toggle the value
      }));
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default()({
        path: NAMESPACE + ENDPOINT,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': wpApiSettings.nonce
        },
        data: {
          ...budpaySettings,
          go_live: budpaySettings.go_live == 'yes' ? 'no' : 'yes'
        } // Send the updated settings to the server
      }).then(response => {
        console.log('Test mode enabled successfully:', response);
        // Optionally, you can update the UI or show a success message here
      }).catch(error => {
        console.error('Error saving settings:', error);
        // Handle errors if any
      });
    }
  }, budpaySettings.go_live === 'yes' ? _strings__WEBPACK_IMPORTED_MODULE_9__["default"].button.enable_test_mode : _strings__WEBPACK_IMPORTED_MODULE_9__["default"].button.disable_test_mode)))));
};
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)("woocommerce_admin_pages_list", "budpay", pages => {
  pages.push({
    container: BudpaySettings,
    path: "/budpay",
    wpOpenMenu: "toplevel_page_woocommerce",
    breadcrumbs: ["Budpay"]
  });
  return pages;
});
const BudPayNav = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_woocommerce_navigation__WEBPACK_IMPORTED_MODULE_7__.WooNavigationItem, {
    parentMenu: "budpay-root",
    item: "budpay-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "components-button",
    href: "https://budpay.com/1"
  }, "BudPay"));
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)("my-plugin", {
  render: BudPayNav
});
})();

/******/ })()
;
//# sourceMappingURL=settings.js.map