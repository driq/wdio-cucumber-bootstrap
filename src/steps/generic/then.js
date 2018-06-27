import { defineSupportCode } from 'cucumber';
import { expect } from 'chai';

import variableStorage from '../../helpers/variableStorage';

defineSupportCode(({ Then }) => {
    Then(/^the page title should be "([^"]+)"$/, (expectedTitle) => {
        const pageTitle = browser.getTitle();
        expect(pageTitle).to.equal(expectedTitle, `Expected title to be "${expectedTitle}" but found "${pageTitle}"`);
    });

    Then(/^the page url should be "([^"]+)"$/, (expectedUrl) => {
        const currentUrl = browser.url().value;
        expect(currentUrl).to.equal(expectedUrl, `Expected url to be "${expectedUrl}" but found "${currentUrl}"`);
    });

    Then(/^the value of field "([^"]+)" should contain "([^"]+)"$/, (field, value) => {
        const fieldValue = browser.getValue(field);
        expect(fieldValue).to.contain(value);
    });

    Then(/^the value of field "([^"]+)" should be "([^"]+)"$/, (element, expectedValue) => {
        const actualValue = browser.getValue(element);
        expect(actualValue).to.equal(expectedValue);
    });

    Then(/^the value of field "([^"]+)" should contain saved value "([^"]+)"$/, (field, variableName) => {
        const savedValue = variableStorage.getVariable(variableName);
        const fieldValue = browser.getValue(field);
        expect(fieldValue).to.equal(savedValue);
    });

    Then(/^the element "([^"]+)" should be visible$/, (element) => {
        const isVisible = browser.isVisible(element);
        expect(isVisible).to.equal(true, `Expected element "${element}" to be visible`);
    });

    Then(/^the element "([^"]+)" should become visible$/, (element) => {
        const becameVisible = browser.waitForVisible(element);
        expect(becameVisible).to.equal(true, `Expected element "${element}" to become visible`);
    });

    Then(/^the element "([^"]+)" should be within the viewport$/, (element) => {
        const isVisibleWithinViewport = browser.isVisibleWithinViewport(element);
        expect(isVisibleWithinViewport).to.equal(false, `Expected element "${element}" to be inside the viewport`);
    });

    Then(/^the element "([^"]+)" should exist$/, (element) => {
        const exists = browser.isExisting(element);
        expect(exists).to.equal(true, `Expected element "${element}" to exist`);
    });

    Then(/^the element "([^"]+)" should not exist$/, (element) => {
        const exists = browser.isExisting(element);
        expect(exists).to.equal(false, `Expected element "${element}" to not exist`);
    });

    Then(/^the element "([^"]+)" should not contain the same text as element "([^"]+)"$/, (element1, element2) => {
        const text1 = browser.getText(element1);
        const text2 = browser.getText(element2);
        expect(text1).to.equal(text2, `Expected text to be "${text1}" but found "${text2}"`);
    });

    Then(/^the element "([^"]+)" should not contain the same text as element "([^"]+)"$/, (element1, element2) => {
        const text1 = browser.getText(element1);
        const text2 = browser.getText(element2);
        expect(text1).to.not.equal(text2, `Expected text not to be "${text1}"`);
    });

    Then(/^the text of element "([^"]+)" should be "([^"]+)"$/, (element, expectedText) => {
        const actualText = browser.getText(element);
        expect(actualText).to.equal(expectedText);
    });
    Then(/^the text of element "([^"]+)" should contain "([^"]+)"$/, (element, expectedText) => {
        const actualText = browser.getText(element);
        expect(actualText).to.contain(expectedText);
    });

    Then(/^the element "([^"]+)" should contain text$/, (element) => {
        const actualText = browser.getText(element);
        expect(actualText).to.not.be.empty();
    });

    Then(/^the url should be "([^"]+)"$/, (expectedUrl) => {
        const currentUrl = browser.url().value;
        expect(currentUrl).to.equal(expectedUrl, `expected url to be "${expectedUrl}" but found "${currentUrl}"`);
    });

    Then(/^the url should not be "([^"]+)"$/, (expectedUrl) => {
        const currentUrl = browser.url().value;
        expect(currentUrl).to.not.equal(expectedUrl, `expected url not to be "${currentUrl}"`);
    });

    Then(/^the path should be "([^"]+)"$/, (expectedPath) => {
        const currentUrl = browser.url().value.replace(/http(s?):\/\//, '');
        const domain = `${currentUrl.split('/')[0]}`;
        const currentPath = currentUrl.replace(domain, '');

        expect(currentPath).to.equal(expectedPath, `expected path to be "${expectedPath}" but found "${currentUrl}"`);
    });
    Then(/^the path should not be "([^"]+)"$/, (expectedPath) => {
        const currentUrl = browser.url().value.replace(/http(s?):\/\//, '');
        const domain = `${currentUrl.split('/')[0]}`;
        const currentPath = currentUrl.replace(domain, '');

        expect(currentPath).to.not.equal(expectedPath, `expected path not to be "${currentUrl}"`);
    });

    Then(/^the url should contain "([^"]+)"$/, (expectedUrlPart) => {
        const currentUrl = browser.url().value;
        expect(currentUrl).to.contain(expectedUrlPart, `Expected URL "${currentUrl}" to contain "${expectedUrlPart}"`);
    });

    Then(/^the url should not contain "([^"]+)"$/, (expectedUrlPart) => {
        const currentUrl = browser.url().value;
        expect(currentUrl).to.not.contain(expectedUrlPart, `Expected URL "${currentUrl}" not to contain "${expectedUrlPart}"`);
    });

    Then(/^the attribute "([^"]+)" of element "([^"]+)" should( not)? be "([^"]+)"$/, (attrName, elem, expectedValue) => {
        const attributeValue = browser.getAttribute(elem, attrName);
        expect(attributeValue).to.equal(expectedValue, `Attribute of element "${elem}" should not contain "${attributeValue}", but "${expectedValue}"`);
    });

    Then(/^the attribute "([^"]+)" of element "([^"]+)" should not be "([^"]+)"$/, (attrName, elem, expectedValue) => {
        const attributeValue = browser.getAttribute(elem, attrName);
        expect(attributeValue).to.not.equal(expectedValue, `Attribute of element "${elem}" should not contain "${attributeValue}"`);
    });

    Then(/^the css property "([^"]+)" of element "([^"]+)" should( not)? be "([^"]+)"$/, (attrName, elem, expectedValue) => {
        let attributeValue = browser.getCssProperty(elem, attrName);

        // when getting something with a color or font-weight WebdriverIO returns a object but we
        // want to assert against a string
        if (attrName.match(/(color|font-weight)/)) {
            attributeValue = attributeValue.value;
        }
        expect(attributeValue).to.equal(expectedValue, `CSS property of element "${elem}" should not contain "${attributeValue}", but "${expectedValue}"`);
    });

    Then(/^the css property "([^"]+)" of element "([^"]+)" should not be "([^"]+)"$/, (attrName, elem, expectedValue) => {
        let attributeValue = browser.getCssProperty(elem, attrName);

        // when getting something with a color or font-weight WebdriverIO returns a object but we
        // want to assert against a string
        if (attrName.match(/(color|font-weight)/)) {
            attributeValue = attributeValue.value;
        }
        expect(attributeValue).to.not.equal(expectedValue, `CSS property of element "${elem}" should not contain "${attributeValue}"`);
    });

    Then(/^checkbox "([^"]+)" should be checked$/, (element) => {
        const isSelected = browser.isSelected(element);
        expect(isSelected).to.equal(true, `"${element}" should be selected`);
    });

    Then(/^checkbox "([^"]+)" should not be checked$/, (element) => {
        const isSelected = browser.isSelected(element);
        expect(isSelected).to.not.equal(true, `"${element}" should not be selected`);
    });

    Then(/^the element "([^"]+)" should be selected$/, (element) => {
        const isSelected = browser.isSelected(element);
        expect(isSelected).to.equal(true, `"${element}" should be selected`);
    });

    Then(/^the element "([^"]+)" should not be selected$/, (element) => {
        const isSelected = browser.isSelected(element);
        expect(isSelected).to.not.equal(true, `"${element}" should not be selected`);
    });

    Then(/^the element "([^"]+)" should be enabled$/, (element) => {
        const isEnabled = browser.isEnabled(element);
        expect(isEnabled).to.equal(true, `Expected element "${element}" to be enabled`);
    });

    Then(/^the element "([^"]+)" should not be enabled$/, (element) => {
        const isEnabled = browser.isEnabled(element);
        expect(isEnabled).to.equal(false, `Expected element "${element}" to not be enabled`);
    });

    Then(/^cookie "([^"]+)" should contain "([^"]+)"$/, (name, expectedValue) => {
        const cookie = browser.getCookie(name);
        expect(cookie.name).to.equal(name, `no cookie found with the name "${name}"`);
        expect(cookie.value).to.equal(expectedValue, `expected cookie "${name}" to have value "${expectedValue}" but got "${cookie.value}"`);
    });

    Then(/^cookie "([^"]+)" should not contain "([^"]+)"$/, (name, expectedValue) => {
        const cookie = browser.getCookie(name);
        expect(cookie.name).to.equal(name, `no cookie found with the name "${name}"`);
        expect(cookie.value).to.not.equal(expectedValue, `expected cookie "${name}" not to have value "${expectedValue}"`);
    });

    Then(/^cookie "([^"]+)" should exist$/, (name) => {
        const cookie = browser.getCookie(name);
        expect(cookie).to.not.equal(null, `Expected cookie "${name}" to exists but it does not`);
    });

    Then(/^cookie "([^"]+)" should not exist$/, (name) => {
        const cookie = browser.getCookie(name);
        expect(cookie).to.equal(null, `Expected cookie "${name}" not to exists but it does`);
    });

    Then(/^the element "([^"]+)" should have a (height|width) of ([\d]+)px$/, (elem, dimension, expectedSize) => {
        const intExpectedSize = parseInt(expectedSize, 10);
        const actualSize = browser.getElementSize(elem)[dimension];
        expect(actualSize).to.equal(intExpectedSize, `Element "${elem}" should have a ${dimension} of ${intExpectedSize}px, but is ${actualSize}px`);
    });

    Then(/^the element "([^"]+)" should not have a (height|width) of ([\d]+)px$/, (elem, dimension, expectedSize) => {
        const intExpectedSize = parseInt(expectedSize, 10);
        const actualSize = browser.getElementSize(elem)[dimension];
        expect(actualSize).to.not.equal(intExpectedSize, `Element "${elem}" should not have a ${dimension} of ${intExpectedSize}px`);
    });

    Then(/^the element "([^"]+)" should be positioned at ([\d]+)px on the (x|y) axis$/, (elem, expectedPosition, axis) => {
        const location = browser.getLocation(elem, axis);
        const intExpectedPosition = parseInt(expectedPosition, 10);
        expect(location).to.equal(intExpectedPosition, `Element "${elem}" should be positioned at ${intExpectedPosition}px on the ${axis} axis, but was found at ${location}px`);
    });

    Then(/^the element "([^"]+)" should not be positioned at ([\d]+)px on the (x|y) axis$/, (elem, expectedPosition, axis) => {
        const location = browser.getLocation(elem, axis);
        const intExpectedPosition = parseInt(expectedPosition, 10);
        expect(location).to.not.equal(intExpectedPosition, `Element "${elem}" should not be positioned at ${intExpectedPosition}px on the ${axis} axis`);
    });

    Then(/^the element "([^"]+)" should have the class "([^"]+)"$/, (elem, expectedClassName) => {
        const classesList = browser.getAttribute(elem, 'className').split(' ');
        expect(classesList).to.include(expectedClassName, `Element ${elem} should have the class ${expectedClassName}`);
    });

    Then(/^the element "([^"]+)" should not have the class "([^"]+)"$/, (elem, expectedClassName) => {
        const classesList = browser.getAttribute(elem, 'className').split(' ');
        expect(classesList).to.not.include(expectedClassName, `Element ${elem} should not have the class ${expectedClassName}`);
    });

    Then(/^a new (window|tab) should open$/, () => {
        // The handles of all open windows/tabs
        const windowHandles = browser.windowHandles().value;
        expect(windowHandles.length).to.not.equal(1, 'A new window should have been opened');
    });

    Then(/^a new (window|tab) should not open$/, () => {
        // The handles of all open windows/tabs
        const windowHandles = browser.windowHandles().value;
        expect(windowHandles.length).to.equal(1, 'A new window should not have been opened');
    });

    Then(/^the page "([^"]+)" should be opened in a new (tab|window)$/, (expectedUrl) => {
        // The handles of all open windows/tabs
        const windowHandles = browser.windowHandles().value;

        expect(windowHandles).length.to.not.equal(1, 'A popup was not opened');

        // The last opened window handle
        const lastWindowHandle = windowHandles.slice(-1);

        // Make sure we focus on the last opened window handle
        browser.window(lastWindowHandle[0]);

        // Get the URL of the current browser window
        const windowUrl = browser.url().value;

        expect(windowUrl).to.contain(expectedUrl, 'The popup has a incorrect url');

        browser.close();
    });

    Then(/^the element "([^"]+)" should be focused$/, (selector) => {
        const hasFocus = browser.hasFocus(selector);
        expect(hasFocus).to.not.equal(true, 'Expected element to not be focused, but it is');
    });

    Then(/^the element "([^"]+)" should not be focused$/, (selector) => {
        const hasFocus = browser.hasFocus(selector);
        expect(hasFocus).to.equal(true, 'Expected element to be focused, but it is not');
    });

    Then(/^there should be an? (alertbox|confirmbox|prompt) with the text "([^"]+)"$/, (modalType, expectedText) => {
        try {
            const text = browser.alertText();
            expect(text).to.equal(expectedText, `Expected the text of ${modalType} not to equal "${expectedText}", instead found "${text}"`);
        } catch (e) {
            assert(e, `A ${modalType} was not opened when it should have been opened`);
        }
    });

    Then(/^there should not be an? (alertbox|confirmbox|prompt) with the text "([^"]+)"$/, (modalType, expectedText) => {
        try {
            const text = browser.alertText();
            expect(text).to.not.equal(expectedText, `Expected the text of ${modalType} not to equal "${expectedText}"`);
        } catch (e) {
            assert(e, `A ${modalType} was not opened when it should have been opened`);
        }
    });
});
