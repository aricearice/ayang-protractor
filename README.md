# Protractor Testing Framework

- Running the Sample Test:

    1. Install packages and dependencies:
    ```bash
      npm install
    ```
    2. Initially set up protractor and get a selenium webdriver instance going:
    ```bash
      ./webdriver.sh
    ```
    3. On a separate terminal window, run this command:
    ```bash
      ./node_modules/protractor/bin/protractor ./config/protractor/protractor.config.js --baseUrl=https://angularjs.org
    ```
