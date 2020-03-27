<?php
defined('TYPO3_MODE') || die();

/*
* ###########################
* TypoScript for t3kit
* ===========================
*/
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    't3kit',
    'Configuration/TypoScript',
    't3kit'
);

# Includes for indexed_search
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    't3kit',
    'Configuration/TypoScript/Extensions/indexed_search',
    't3kit - Indexed Search Configuration'
);
