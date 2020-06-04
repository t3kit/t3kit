<?php

defined('TYPO3_MODE') || die();

/*
 * ###########################
 * Add Content Element to Type list
 * ===========================
 */
// all "items" have four parts (fourth being optional)
// 0 => label
// 1 => value
// 2 => icon
// 3 => groupID
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.I.5',
        'table',
        'content-table',
        'default'
    ]
);


/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */


/*
 * ###########################
 * Configure element fields (types) to display
 * ===========================
 */


/*
* ###########################
* Add columns for Content Element
* ===========================
*/
// Add bootstrap table classes,
// Also change renderType to a selectCheckBox to allow multiple classe
$GLOBALS['TCA']['tt_content']['columns']['table_class'] = array_replace_recursive(
    $GLOBALS['TCA']['tt_content']['columns']['table_class'],
    [
        'config' => [
            'type' => 'select',
            'renderType' => 'selectCheckBox',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/locallang_table.xlf:table_class.table_striped',
                    'table-striped'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/locallang_table.xlf:table_class.table_bordered',
                    'table-bordered'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/locallang_table.xlf:table_class.table_borderless',
                    'table-borderless'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/locallang_table.xlf:table_class.table_hover',
                    'table-hover'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/locallang_table.xlf:table_class.table_sm',
                    'table-sm'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/locallang_table.xlf:table_class.table_responsive',
                    'table-responsive'
                ],
            ],
            'default' => ''
        ]
    ]
);


/*
 * ###########################
 * Add new palettes for a Content Element
 * ===========================
 */


/*
 * ###########################
 * Add flexForms for Content Element
 * ===========================
 */
