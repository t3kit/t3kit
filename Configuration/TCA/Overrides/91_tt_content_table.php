<?php
defined('TYPO3_MODE') || die();

// Bootstrap 4 table classes,
// Also change renderType to a selectCheckBox to allow multiple classe
$GLOBALS['TCA']['tt_content']['columns']['table_class']['config'] = [
    'type' => 'select',
    'renderType' => 'selectCheckBox',
    'items' => [
        [
            'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:table_class.table-dark',
            'table-dark'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:table_class.table-striped',
            'table-striped'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:table_class.table-bordered',
            'table-bordered'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:table_class.table-borderless',
            'table-borderless'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:table_class.table-hover',
            'table-hover'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:table_class.table-sm',
            'table-sm'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:table_class.table-responsive',
            'table-responsive'
        ],
    ],
    'default' => ''
];
