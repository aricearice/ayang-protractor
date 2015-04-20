var configHelper = require('./confighelper'),
    ScreenshotReporter = require(configHelper.e2eTestDirectory + 'screenshotReporter');

// Protractor Tests Configuration
exports.config = {
  allScriptsTimeout: 60000,
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  sauceUser: configHelper.sauceUser,
  sauceKey: configHelper.sauceKey,

  // Capabilities to be passed to the webdriver instance.
  capabilities: configHelper.capabilities,
  multiCapabilities: configHelper.multiCapabilities,

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: configHelper.specs,

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000
  },
  baseUrl: configHelper.baseUrl,
  params : { 
    login : {
      username: configHelper.fakeNames.username,
      password1: ''
    }
  },
  framework: 'jasmine2',
  onPrepare: function() {
    browser.ignoreSynchronization = true; // allow for testing on non-Angular apps
    var caps = browser.getCapabilities().then(function(promise) { 
          browserName = promise.caps_.browserName;
          browserVersion = promise.caps_.version;
          strAppend = '_' + browserName + '-' + browserVersion; // Directories should be stamped with browser name and version
        }),
        Faker = require('faker'),
        jasmineReporters = require('jasmine-reporters'),

        // Create directories for logs to live in:
        logDirName = 'generic_test_log'+ new Date().toISOString().replace(/[^a-z0-9\_]/gi,'') + strAppend,
        // Name of the log directory file should have time stamp, browser name, and version.
        mainlogdir = configHelper.mainLogDir,
        mkdirp = require('mkdirp'),
        path = require('path'),
        logdir = path.join(mainlogdir, logDirName);

    mkdirp(logdir);  // Finally, make the directory.

    // Make sure that the browser window is wide enough so that all page elements are shown
    browser.driver.manage().window().setSize(1030, 1000);
 
    // Jasmine Reporters
    // And Screenshots On Failure
    jasmine.getEnv().addReporter(new ScreenshotReporter(logdir)); // screenshot reporter
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      filePrefix: 'SAMPLE_TEST_PREFIX',
      savePath: logdir
    })); //xml reporter

    //URLS/SLUGS
    SAMPLE_PAGE_SLUG= '/';
  }
};
