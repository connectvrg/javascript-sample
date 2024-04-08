## Web Accessibility Test (WAT)

This NPM Package provides common methods for Web Accessibility Testing recommended by WCAG. It uses `axe-core` which is an accessibility testing engine for websites and other HTML-based user interfaces. It's fast, secure, lightweight, and was built to seamlessly integrate with any existing test environment so you can automate accessibility testing alongside your regular functional testing using `webdriver.io`. It shows hints which internally run the recommended set of WCAG 2.1 Level A and Level AA rules from axe-core.

`Note:` For complete E2E automated testing solution with `webdriver.io`, `Allure` reporting and other capabilities please refer to the [WebAccessibilityTestTool](https://github.com/amiya-pattnaik/WebAccessibilityTestTool) boilerplate project.

### Accessibility Rules
The complete list of rules run by axe-core can be found in [axe-core/doc/rule-descriptions.md](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md).


### Installation

Node must be installed; please follow the directions at http://www.nodejs.org to install it.

`npm install web-accessibility-test --save-dev`

### Example
This example demonstrates how to use `web-accessibility-test` with unit testing framework such as Mocha or Jasmine or CucumberJS.

```
var wat = require('web-accessibility-test');

// to list out all rules
let result = wat.getRules();
console.log(result);


// to list out WCAG rules based on tags.
let result = wat.getRules(["wcag2a", "wcag2aa"]);
console.log(result);


// to get WCAG Violations
let result = wat.getViolations();
console.log(result);


// to run script with custom tag
let result = wat.analyseWithTag(["your-custom-tag"]);
console.log(result);


// to run script with with context enabled
let wat = require('web-accessibility-test');
wat.analyseWithContext([{include: [['#iframe']]}]);


// to get the WCAG recommended best practice
let result = wat.getBestPractice();
console.log(result);

```
### References
[Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)

[axe-core](https://github.com/dequelabs/axe-core)

[Deque Labs](https://github.com/dequelabs)

### License
MIT
