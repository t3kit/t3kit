<?php

defined('TYPO3_MODE') || die();

/*
 * ###########################
 * Add  Context Sensitive Help (CSH)
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr(
    'tt_content',
    'EXT:t3kit/Resources/Private/Language/ContentElements/locallang_csh_ttc.xlf'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr(
    'sys_file_reference',
    'EXT:t3kit/Resources/Private/Language/ContentElements/locallang_csh_sfr.xlf'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr(
    'tt_content.pi_flexform.heroImage',
    'EXT:t3kit/Resources/Private/Language/ContentElements/Static/locallang_heroImage_csh.xlf'
);


/*
 * ###########################
 * Load additional t3kit stylesheets to skin the Backend
 * ===========================
 */
$GLOBALS['TBE_STYLES']['skins'][$_EXTKEY]['stylesheetDirectories'][] = 'EXT:t3kit/Resources/Public/CSS/BE/';

/***************
* Allow Custom Records on Standard Pages
*/
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_t3kit_slider_item');
