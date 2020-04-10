<?php
defined('TYPO3_MODE') || die();

// /*
//  * ###########################
//  * Add "Dynamic content" CType divider
//  * ===========================
//  */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:group.dynamic',
        '--div--',
        null
    ],
    'button',
    'after'
);
