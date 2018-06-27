import { defineSupportCode } from 'cucumber';

defineSupportCode(({ Given }) => {
    Given(/^I open the url "([^"]+)"$/, (url) => {
        browser.url(url);
    });
});
