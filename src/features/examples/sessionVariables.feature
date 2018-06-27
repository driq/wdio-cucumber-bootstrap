Feature: Save variables
    As a developer
    I should be able to save variables for later use

    Scenario: save variable
        Given I open the url "/"
        When I save the value of the "h1" element as "heading"

    Scenario: read variable
        Given I open the url "login"
        When I fill the inputfield "#username" with variable "heading"
        Then the value of field "#username" should contain saved value "heading"
        And the value of field "#username" should be "Welcome to the-internet"

