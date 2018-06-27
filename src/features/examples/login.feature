Feature: Login
    As any user
    I should be able to login

    Scenario: login
        Given I open the login page
        When I login with username "tomsmith" and password "SuperSecretPassword!"
        Then there should be a flash message with text "You logged into a secure area!"

