import { defineSupportCode } from 'cucumber';

import variableStorage from '../../helpers/variableStorage';

defineSupportCode(({ When }) => {
    When(/^I click on the link "([^"]+)"$/, (element) => {
        const elem = `=${element}`;
        browser.click(elem);
    });

    When(/^I click on the "([^"]+)" (button|element)$/, (element) => {
        browser.click(element);
    });

    When(/^I save the value of the "([^"]+)" element as "([^"]+)"$/, (element, variableName) => {
        const value = browser.getText(element);
        variableStorage.saveVariable(variableName, value);
    });

    When(/^I fill the inputfield "([^"]+)" with variable "([^"]+)"$/, (element, variableName) => {
        const savedValue = variableStorage.getVariable(variableName);
        browser.setValue(element, savedValue);
    });

    When(/^I submit the form "([^"]+)"$/, (form) => {
        browser.submitForm(form);
    });

    When(/^I add "([^"]+)" to the inputfield "([^"]+)"$/, (value, element) => {
        browser.addValue(element, value);
    });

    When(/^I set "([^"]+)" to the inputfield "([^"]+)"$/, (value, element) => {
        browser.setValue(element, value);
    });

    When(/^I clear the inputfield "([^"]+)"$/, (element) => {
        browser.clearElement(element);
    });

    When(/^I drag element "([^"]+)" to element "([^"]+)"$/, (source, destination) => {
        browser.dragAndDrop(source, destination);
    });

    When(/^I submit the form "([^"]+)"$/, (form) => {
        browser.submitForm(form);
    });

    When(/^I pause for (\d+)ms$/, (ms) => {
        /**
         * Number of milliseconds
         * @type {Int}
         */
        const intMs = parseInt(ms, 10);

        browser.pause(intMs);
    });

    When(/^I set a cookie "([^"]+)" with the content "([^"]+)"$/, (cookieName, cookieContent) => {
        browser.setCookie({
            name: cookieName,
            value: cookieContent,
        });
    });

    When(/^I delete the cookie "([^"]+)"$/, (name) => {
        browser.deleteCookie(name);
    });

    When(/^I press the "([^"]+)" key$/, (key) => {
        browser.keys(key);
    });

    When(/^I accept the (alert|dialog)$/, () => {
        browser.alertAccept();
    });
    When(/^I dismiss the dialog$/, () => {
        browser.alertDismiss();
    });

    When(/^I scroll to element "([^"]+)"$/, (selector) => {
        browser.scroll(selector);
    });

    When(/^I close the last opened (window|tab)$/, () => {
        /**
         * The last opened window handle
         * @type {Object}
         */
        const lastWindowHandle = browser.windowHandles().value.slice(-1)[0];
        browser.window(lastWindowHandle);
        browser.close();
    });

    When(/^I focus the last opened (window|tab)$/, () => {
        /**
         * The last opened window
         * @type {Object}
         */
        const lastWindowHandle = browser.windowHandles().value.slice(-1)[0];

        browser.window(lastWindowHandle);
    });

    When(/^I select the (\d+)(st|nd|rd|th) option for element "([^"]+)"$/, (index, unused, selectElem) => {
        /**
         * The index of the option to select
         * @type {Int}
         */
        const optionIndex = parseInt(index, 10);

        browser.selectByIndex(selectElem, optionIndex);
    });

    When(/^I select the option with the text "([^"]+)" for element "([^"]+)"$/, (selectionType, selectionValue, selectElem) => {
        browser.selectByVisibleText(selectElem, selectionValue);
    });

    When(/^I select the option with the name "([^"]+)" for element "([^"]+)"$/, (selectionValue, selectElem) => {
        browser.selectByAttribute(selectElem, 'name', selectionValue);
    });

    When(/^I select the option with the value "([^"]+)" for element "([^"]+)"$/, (selectionValue, selectElem) => {
        browser.selectByValue(selectElem, selectionValue);
    });
});
