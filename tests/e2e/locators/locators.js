var Locators = {
  //SAMPLE PAGE LOCATORS

  NAME_INPUT_LOCATOR: {
    elemType: 'css',
    name: 'Your Name Input Field',
    elem: 'input[ng-model="yourName"]'
  },
  GREETING_DIV_LOCATOR: {
    elemType: 'css',
    name: 'Angularjs Greeting',
    elem: 'h1.ng-binding'
  }
};
module.exports = Locators;
