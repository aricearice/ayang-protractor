(function() {
  'use strict';

  var BaseTest = require('./base.test'),
      TemplatePageTest = Object.create(BaseTest);

  TemplatePageTest.sampleTestForPage = function() {
    it('Test the greeting div is empty', function() {
      TemplatePageTest.base.get(browser.baseUrl);
      expect(TemplatePageTest.templatePage.textOf(TemplatePageTest.templatePage.greeting_div)).toEqual('Hello !');
    });

    it('Test the greeting div shows name after name is entered', function() {
      TemplatePageTest.templatePage.samplePageMethod();
      expect(TemplatePageTest.templatePage.textOf(TemplatePageTest.templatePage.greeting_div)).toEqual('Hello Jon Snow!');
    });
  };

  module.exports = TemplatePageTest;
}());
