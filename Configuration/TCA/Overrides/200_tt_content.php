<?php
defined('TYPO3_MODE') || die();

// /*
//  * ###########################
//  * Reorder Content elements Type list
//  * ===========================
//  */
$GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items']['0']['0'] = 'Static';

// remove and recreate some content types to reorder it
$CTypeItems = $GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'];
foreach ($CTypeItems as $position => $item) {
    switch ($item[0]) {
        case 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.div.lists':
            unset($GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][$position]);
            break;
        case 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.I.16':
            unset($GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][$position]);
            break;
        case 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.I.14':
            unset($GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][$position]);
            break;
        case 'Form':
            unset($GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][$position]);
            break;
        case 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.I.10':
            unset($GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][$position]);
            break;
        case 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.div.forms':
            unset($GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][$position]);
            break;
    }
}

// Dynamic content
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'Dynamic',
        '--div--',
        null
    ],
    'socialIcons',
    'after'
);

// Content Separator
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.I.16',
        'div',
        'content-special-div'
    ],
    'socialIcons',
    'after'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'Separator',
        '--div--',
        null
    ],
    'socialIcons',
    'after'
);

// Forms
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'Form',
        'form_formframework',
        'content-form'
    ],
    'div',
    'after'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.I.10',
        'login',
        'content-elements-login'
    ],
    'form_formframework',
    'after'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.div.forms',
        '--div--',
        null
    ],
    'div',
    'after'
);

// Plugins
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.I.14',
        'list',
        'content-plugin'
    ],
    'menu_sitemap_pages',
    'after'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'Plugins',
        '--div--',
        null
    ],
    'menu_sitemap_pages',
    'after'
);
