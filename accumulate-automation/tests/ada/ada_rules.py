
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