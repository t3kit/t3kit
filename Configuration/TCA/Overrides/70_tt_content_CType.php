<?php

defined('TYPO3') || die();

/*
 * ###########################
 * CType config
 * ===========================
 */

$CTypeItems = $GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'];

// remove 'standard' CType divider
foreach ($CTypeItems as $position => $item) {
    switch ($item['label'] ?? '') {
        case 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.div.standard':
            unset($GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][$position]);
            break;
    }
}
// remove 'lists' CType divider and elements with 'lists' group
foreach ($CTypeItems as $position => $item) {
    switch ($item['group'] ?? '') {
        case 'lists':
            unset($CTypeItems, $GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][$position]);
            break;
    }
}

// Rename default "Standart" divider title into Static content
$GLOBALS['TCA']['tt_content']['columns']['CType']['config']['itemGroups']['default'] =
'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:group.static';

// Add "Dynamic content" CType divider
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItemGroup(
    'tt_content',
    'CType',
    'dynamic',
    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:group.dynamic',
    'after:default'
);

// Add "Grid content" CType divider
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItemGroup(
    'tt_content',
    'CType',
    'grid',
    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:group.grid',
    'after:dynamic'
);
