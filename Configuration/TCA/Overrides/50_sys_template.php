<?php

defined('TYPO3_MODE') || die();


/*
* ###########################
* Include t3kit Static Template files
* ===========================
*/
// Include all
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    't3kit',
    'Configuration/TypoScript',
    '--- All t3kit Configuration'
);

// Include Content Elements Configuration
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    't3kit',
    'Configuration/TypoScript/ContentElement',
    '--- Content Elements Configuration'
);

// Include Page Configuration
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    't3kit',
    'Configuration/TypoScript/Page',
    '--- Page Configuration'
);

// Include General Config
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    't3kit',
    'Configuration/TypoScript/Config',
    '--- General Config'
);

// Include Plugin Config
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    't3kit',
    'Configuration/TypoScript/Plugin',
    '--- Plugin Config'
);
