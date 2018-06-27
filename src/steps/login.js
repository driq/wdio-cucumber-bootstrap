import { defineSupportCode } from 'cucumber';

defineSupportCode(({ Given, When, Then }) => {
    Given(/^I open the login page$/, () => {
        browser.url('login');
    });

    When(/^I login with username "([^"]+)" and password "([^"]+)"$/, (username, password) => {
        browser.element('#username').setValue(username);
        browser.element('#password').setValue(password);
        browser.element('#login').submitForm();
    });

    Then(/^there should be a flash message with text "([^"]+)"$/, (text) => {
        browser.element(`#flash*=${text}`).waitForVisible();

        // The code above does not work on internet explorer. Below is a work-around:
        // browser.element('#flash').waitForVisible();
        // expect(browser.element('#flash').getText()).to.contain(text);
    });
});
