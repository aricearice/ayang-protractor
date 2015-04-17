(function() {
  'use strict';

  var Base = {
    path: require('path'),
    locators: require('./../locators/locators')
  };

  Base.creds = browser.params.login;
  if (Base.creds.password === '') {
    Base.PW1 = configHelper.fakeNames.PW1;
  } else {
    Base.PW1 = Base.creds.password1;
  }
  Base.findBy = function(elemDict, desiredText) {
    if (elemDict.elemType === 'css') {
      return by.css(elemDict.elem);
    } else if (elemDict.elemType === 'cssContainingText') {
      try {
        return by.cssContainingText(elemDict.elem, desiredText);
      } catch (err) {
        console.error(err);
        return;
      }
    } else if (elemDict.elemType === 'id') {
      return by.id(elemDict.elem);
    } else if (elemDict.elemType === 'model') {
      return by.model(elemDict.elem);
    } else if (elemDict.elemType === 'link text') {
      return by.linkText(elemDict.elem);
    } else if (elemDict.elemType === 'options') {
      return by.options(elemDict.elem);
    } else if (elemDict.elemType === 'buttonText') {
      return by.buttonText(elemDict.elem);
    } else if (elemDict.elemType === 'repeater') {
      return by.repeater(elemDict.elem);
    }
  };
  Base.find = function(elemDict, desiredText) {
    return element(Base.findBy(elemDict, desiredText));
  };
  Base.findArray = function(elemDict, desiredText) {
    return element.all(Base.findBy(elemDict, desiredText));
  };
  Base.setInput = function(field, fieldInput) {
    return field.sendKeys(fieldInput);
  };
  Base.elementPresence = function(elemDict) {
    return Base.find(elemDict).isPresent();
  };
  Base.elementDisappeared = function(elemDict) {
    return Base.elementPresence(elemDict).then(function(presenceOfElement) {
      return !presenceOfElement;
    });
  };
  Base.displayStatusOf = function(elemDict) {
    return Base.find(elemDict).isDisplayed();
  };
  Base.elementClassAttribute = function(elemDict) {
    return Base.find(elemDict).getAttribute('class');
  };
  Base.hrefAttributeOf = function(foundElement) {
    return foundElement.getAttribute('href');
  };
  Base.srcAttributeOf = function(foundElement) {
    return foundElement.getAttribute('src');
  };
  Base.textOf = function(elemDict, message) {
    var foundElement = Base.find(elemDict);
    return foundElement.getText().then(function(promise) {
      if (message) {
        console.log(message);
      } else {
        console.log('Checking the text for element ' + elemDict.name);
      }
      return promise;
    });
  };
  Base.getAllWindowHandles = function() {
    return browser.driver.getAllWindowHandles();
  };
  Base.switchWindowToHandle = function(handle) {
    return browser.driver.switchTo().window(handle);
  };
  Base.closeCurrentWindow = function() {
    return browser.driver.close();
  };
  Base.wait = function(anonFunctionReturningBoolean, seconds, errorMessage) {
    return browser.driver.wait(anonFunctionReturningBoolean, seconds * 1000, errorMessage);
  };
  Base.waitForPresenceOf = function(elemDict, waitTime) {
    return Base.wait(function() {
      console.log('Waiting for ' + elemDict.name + ' to be present on page...');
      return Base.elementPresence(elemDict);
    }, waitTime, elemDict.name + ' is not present');
  };
  Base.waitForDisplayOf = function(elemDict, waitTime) {
    return Base.wait(function() {
      var element = Base.find(elemDict);
      console.log('Waiting for ' + elemDict.name + ' to display...');
      return Base.displayStatusOf(element);
    }, waitTime, elemDict.name + ' is not displayed');
  };
  Base.waitForTextShown = function(elemDict, waitTime) {
    return Base.wait(function() {
      var element = Base.find(elemDict);
      return Base.textOf(element).then(function(text) {
        return text.length > 1;
      });
    }, waitTime, elem + ' text did not load');
  };
  Base.waitUntilSeen = function(elemDict, waitTime) {
    Base.waitForPresenceOf(elemDict, waitTime);
    return Base.waitForDisplayOf(elemDict, waitTime);
  };
  Base.randomChildOf = function(elemCss, rand) {
    return elemCss.replace('()', '(' + rand + ')');
  };
  Base.randomNumberWithMax = function(max) {
    return Math.floor(Math.random() * max) + 1;
  };
  Base.clickOn = function(elemDict, message) {
    var element = Base.find(elemDict);
    return element.click().then(function(promise) {
      if (message) {
        console.log(message);
      } else {
        console.log('Clicked on element ' + elemDict.name);
      }
      return promise;
    });
  };
  Base.get = function(url, force) {
    return Base.getCurrentUrl().then(function(current) {
      if (current !== url || force === true) {
        var printed_url = url.replace(/\/.+@/, '//');
        console.log('Getting page at ' + printed_url);
        return browser.driver.get(url);
      } else {
        console.log('Staying on the same URL');
        return;
      }
    });
  };
  Base.getCurrentUrl = function() {
    return browser.driver.getCurrentUrl().then(function(url) {
      var printed_url = url.replace(/\/.+@/, '//');
      console.log('Checking the current URL... it is:' + printed_url);
      return url;
    });
  };
  Base.getTitle = function(message) {
    return browser.driver.getTitle().then(function(promise) {
      if (message) {
        console.log('Checking the page title of the ' + message + ' page');
      } else {
        console.log('Checking the page title');
      }
      return promise;
    });
  };
  Base.driverPause = function(seconds) {
    return browser.driver.sleep(seconds * 1000);
  };
  Base.pauseFor2Seconds = function() {
    return Base.driverPause(2);
  };
  Base.pauseForPageLoad = function() {
    return Base.driverPause(1.5);
  };
  Base.clickIthElementOfArray = function(arrayDict, index) {
    var elem_to_click = Base.findArray(arrayDict).get(index);
    elem_to_click.getText().then(function(elemText) {
      console.log('Clicking the ' + index + '-th element: "' + elemText + '" of ' + arrayDict.name);
      return elem_to_click.click();
    });
  };

  module.exports = Base;
}());
