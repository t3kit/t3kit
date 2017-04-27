Feature: Homepage
	In order to provide a website to visitor
	As a website owner
	I want to provide a homepage for visitor to view.

	Background:
		Given I am on the homepage

	Scenario: homepage responded
		Then I should see "Call us on"

	Scenario: Homepage has subscription form
		Then I should see "Subscribe to newsletter"
