#! /usr/bin/env bash

echo 'Running webdriver-manager...'

./node_modules/protractor/bin/webdriver-manager update
./node_modules/protractor/bin/webdriver-manager start
