<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {
    /**
     * TypoScript for t3kit
     */
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
        't3kit',
        'Configuration/TypoScript',
        't3kit'
    );
});
