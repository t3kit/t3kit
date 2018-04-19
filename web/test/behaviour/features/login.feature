Feature: Sign in to the website
  In order to access the admin interface
  As a visitor
  I need to be able to log in to the website

  Scenario: Show backend interface
    Given I am on "/typo3"
    And I am logged in from "/typo3" authenticated as "admin" using "admin1234"
    Then I should see "Logout"
