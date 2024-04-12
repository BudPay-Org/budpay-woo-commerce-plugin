.DEFAULT_GOAL := init

%:
	@:

init:
	echo "Specify an Action"

up:
	docker-compose up  --build

down:
	docker-compose  down


dev-js:
	npm run start

build-production-js:
	npm run preuglify && npm run uglify

wp-format:
	npm run format

i18n-pot:
	composer run makepot

zip:
	rm budpay.zip && npm run plugin-zip

inspection:
	./vendor/bin/phpcs -p . --standard=PHPCompatibilityWP

build:
	npm run build

release: build