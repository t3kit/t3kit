<?php
defined('TYPO3_MODE') || die();

// Bootstrap table classes,
// Also change renderType to a selectCheckBox to allow multiple classe
$GLOBALS['TCA']['tt_content']['columns']['table_class']['config'] = [
    'type' => 'select',
    'renderType' => 'selectCheckBox',
    'items' => [
        [
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/Table/locallang.xlf:table_class.table_dark',
            'table-dark'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/Table/locallang.xlf:table_class.table_striped',
            'table-striped'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/Table/locallang.xlf:table_class.table_bordered',
            'table-bordered'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/Table/locallang.xlf:table_class.table_borderless',
            'table-borderless'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/Table/locallang.xlf:table_class.table_hover',
            'table-hover'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/Table/locallang.xlf:table_class.table_sm',
            'table-sm'
        ],
        [
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/Table/locallang.xlf:table_class.table_responsive',
            'table-responsive'
        ],
    ],
    'default' => ''
];
