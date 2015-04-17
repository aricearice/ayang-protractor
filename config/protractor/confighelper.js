/**
 * Define path of this directory so that other directories can be created relative to this. 
 */
global.appRoot = require('path').resolve(__dirname);

var Faker = require('faker'), // Faker.js module
  configHelper = {
    // MAIN TEST DIRECTORY FOR e2e tests
    e2eTestDirectory: appRoot + '/../../tests/e2e/',
 
    //Sauce Labs Credentials
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    // Time: for logs, unique email creation, all kinds of good stuff
    CURRENT_TIME: new Date(),

    ////log stuff///
    get mainLogDir() {
      return this.e2eTestDirectory + 'testLog/';
    },

    ////GENERATE FAKE CREDENTIALS
    fakeNames: {
      fakeUsername: Faker.internet.userName(),
      get username() {
        return this.fakeUsername;
      },
    },

    /////BASE URL
    baseUrl: (function() {
      console.log('running tests against SOME_URL');
      return 'http://' + process.env.TEST_URL;
    })(),
    /////SPECS TO RUN
    // Options to specify which specs to run with an environment variable with
    // comma separated values listing the named specs that we would like to run
    specNamesList: (process.env.SPECS ? process.env.SPECS : 'all'),
    get specs() {
      if (this.specNamesList.indexOf('all') > -1) {
        return [this.e2eTestDirectory + 'specs/*.spec.js'];
      } else {
        var list = [];
        var specsList = this.specNamesList.split(',');
        for (var item in specsList) {
          list.push(this.e2eTestDirectory + 'specs/' + specsList[item] + '.spec.js');
        }
        return list;
      }
    },

/**
 * Define which browsers and platforms to run tests against
 * Mostly useful for running on Sauce Labs.
 */
    browserCaps: (process.env.BROWSER_NAMES ? process.env.BROWSER_NAMES : 'chrome'),
    get multiCapabilities() {
      var caps = [];
      var testName = 'SOME_TEST_NAME';
      if (this.browserCaps.indexOf('chrome') > -1) {
        caps.push({
          'browserName': 'chrome',
          'version': (process.env.CHROME_VERSION ? process.env.CHROME_VERSION : '41'),
          //shard test files: set to false by default. if true, then split specs up to run in parallel
          shardTestFiles: (process.env.SHARD ? JSON.parse(process.env.SHARD) : false),
          'platform': (process.env.PLATFORM ? process.env.PLATFORM : ''),
          'record-screenshots': false,
          'name': testName,
          'chromeOptions': {
            'args': [
              'incognito',
              'disable-extensions',
              'enable-crash-reporter-for-testing'
            ]
          }
        });
      }
      if (this.browserCaps.indexOf('firefox') > -1) {
        caps.push({
          'browserName': 'firefox',
          'version': (process.env.FIREFOX_VERSION ? process.env.FIREFOX_VERSION : '32'),
          //shardTestFiles: set to false by default. if true, then split specs up to run in parallel
          shardTestFiles: (process.env.SHARD ? JSON.parse(process.env.SHARD) : false),
          'platform': (process.env.PLATFORM ? process.env.PLATFORM : ''),
          'record-screenshots': false,
          'name': testName,
        });
      }
      if (this.browserCaps.indexOf('safari') > -1) {
        caps.push({
          'browserName': 'safari',
          'version': (process.env.SAFARI_VERSION ? process.env.SAFARI_VERSION : '6'),
          //shard test files: set to false by default. if true, then split specs up to run in parallel
          shardTestFiles: (process.env.SHARD ? JSON.parse(process.env.SHARD) : false),
          'platform': '',
          'safariIgnoreFraudWarning': true,
          'record-screenshots': false,
          'name': testName,
        });
      }
      for (var c in caps) {
        caps[c].maxInstances = Math.floor(6 / caps.length);
        if (caps[c].platform.length === 0) {
          caps[c].platform = null; //if platform is not defined, then probably not running on sauce: remove platform specification
          caps[c].version = null; //if platform is not defined, then probably not running on sauce: remove version specification
        }
      }
      return caps;
    },
    get capabilities() {
      return this.multiCapabilities[0];
    }
  };
module.exports = configHelper;
