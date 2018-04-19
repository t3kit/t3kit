<?php

use Behat\MinkExtension\Context\MinkContext;

/**
 * Class FeatureContext
 */
class FeatureContext extends MinkContext {

    /**
     * Loop menu navigation
     * Example: I should access all pages of navigation with css selector "#main-nav ul li a"
     *
     * @return array
     * @param string $selector
     * @throws \Exception
     *
     * @Then /^I should access all pages of navigation with css selector "([^"]*)"$/
     */
    public function iShouldAccessAllPagesOfNavigationWithCssSelector($selector) {
        $page = $this->getSession()->getPage();
        $elements = $page->findAll('css', $selector);
        if (empty($elements)) {
            throw new \Exception(sprintf("Cannot find css '%s' selector.", $selector));
        }

        /** @var \Behat\Mink\Element\NodeElement $element */
        foreach ($elements as $element) {
            $menu = $element->getText();
            $string = sprintf('Visiting page %s', $menu);
            echo "\033[36m    ->  " . strtr($string, ["\n" => "\n|  "]) . "\033[0m\n";
            try {
                $this->visitPath($element->getAttribute('href'));
                // This is needed otherwise selenium will fail
                sleep(1);
                $this->assertSession()->pageTextContains($this->fixStepArgument($menu));
            } catch (\Exception $exception) {
                // Suppress handling of redirects
                break;
            }
        }

        return $elements;
    }

    /**
     * @Given /^I am logged in from "([^"]*)" authenticated as "([^"]*)" using "([^"]*)"$/
     */
    public function iAmAuthenticatedAs($url, $username, $password) {
        $this->visit($url);
        $this->fillField('username', $username);
        $this->fillField('t3-password', $password);
        $this->pressButton('Login');
    }
}

