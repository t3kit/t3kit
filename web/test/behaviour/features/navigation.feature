Feature: Navigation
	In order to allow visitor to navigate all pages in the website
	As a website owner
	I want to make sure that the navigation works properly.

	Background:
		Given I am on the homepage

	Scenario: All menu items should be accessible
		Then I should access all pages of navigation with css selector ".header-top ul.nav li a"
