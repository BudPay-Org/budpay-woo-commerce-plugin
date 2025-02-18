## Budpay for WooCommerce

## Requirements 
1. Node v20+ 
2. pnpm
3. WPCLI
4. Webpack


## Build Process for Developers
Our plugin uses modern build tools, including Webpack and UglifyJS, to generate production-ready JavaScript and CSS. The following scripts define our build process:
```json
{
  "prebuild": "pnpm install && composer install",
  "build": "pnpm run preuglify && pnpm run uglify && composer run makepot && pnpm run build:webpack && pnpm run plugin-zip",
  "build:webpack": "wp-scripts build",
  "start": "pnpm run start:webpack",
  "start:webpack": "rimraf build/* && wp-scripts start",
  "preuglify": "rm -f $pnpm_package_config_assets_js_min",
  "uglify": "for f in $pnpm_package_config_assets_js_js; do file=${f%.js}; node_modules/.bin/uglifyjs $f -c -m > $file.min.js; done"
}
```
Developers can reproduce the build by following these steps:

### Steps to Reproducing the build process Plugin zip.
1. git clone https://github.com/BudPay-Org/budpay-woo-commerce-plugin.git budpay
1. ./bin/setup.sh
2. pnpm install 
3. pnpm build
4. Download `budpay.zip`

### Links to unminified 
- assets/js/checkout.js 
- assets/blocks/index.js
- assets/admin/settings/index.js
- assets/editor/index.js
