<?php

defined('TYPO3_MODE') || die();

/*
 * ###########################
 * Add Content Element to Type list
 * ===========================
 */


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
$GLOBALS['TCA']['tt_content']['types']['table']  = array_merge(
    $GLOBALS['TCA']['tt_content']['types']['table'],
    [
        'columnsOverrides' => [
            'columnsOverrides' => [
                'bodytext' => [
                    'config' => [
                        'renderType' => 'textTable',
                        'wrap' => 'off',
                    ],
                ],
            ],
            'header_link' => [
                'config' => [
                    'fieldControl' => [
                        'linkPopup' => [
                            'options' => [
                                'blindLinkFields' => 'params, target, class',
                                'blindLinkOptions' => 'folder, mail, telephone'
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
);


/*
* ###########################
* Add columns for Content Element
* ===========================
*/
// Add bootstrap table classes,
// Also change renderType to a selectCheckBox to allow multiple classe
$GLOBALS['TCA']['tt_content']['columns']['table_class']['config'] = [
    'type' => 'select',
    'renderType' => 'selectCheckBox',
    'items' => [
        [
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/locallang_table.xlf:table_class.table_dark',
            'table-dark'
        ],
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
];


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
