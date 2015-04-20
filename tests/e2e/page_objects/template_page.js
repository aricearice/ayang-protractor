(function() {
  'use strict';

  var Base = require('./base'),
      TemplatePage = Object.create(Base);

  TemplatePage.samplePageMethod = function() {
    var your_name_field = TemplatePage.find(TemplatePage.name_input);
    Base.setInput(your_name_field, "Jon Snow");
    console.log('Hello World. My First Test!');
    return;
  };

  TemplatePage.name_input = TemplatePage.locators.NAME_INPUT_LOCATOR;
  TemplatePage.greeting_div = TemplatePage.locators.GREETING_DIV_LOCATOR;

  module.exports = TemplatePage;
}());
