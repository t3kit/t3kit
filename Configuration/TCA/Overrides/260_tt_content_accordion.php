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
        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_accordion.xlf:accordion.title',
        'accordion',
        'ce-accordion',
        'dynamic'
    ]
);


/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['accordion'] = 'ce-accordion';


/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['accordion'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            header;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_element_title,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_accordion.xlf:accordion.tab,tx_t3kit_accordion_item,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:tab.settings,
            section_container_width,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
            --palette--;;frames,
            --palette--;;appearanceLinks,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,
            --palette--;;language,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
            --palette--;;hidden,
            --palette--;;access,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:categories,
            categories,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:notes,
            rowDescription,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:extended,
    ',
    'columnsOverrides' => [
        'section_container_width' => [
            'config' => [
                'default' => 'container-fluid'
            ]
        ]
    ]
];


/*
* ###########################
* Add columns for Content Element
* ===========================
*/
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'tx_t3kit_accordion_item' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_accordion.xlf:accordion.item',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_t3kit_accordion_item',
            'foreign_field' => 'tt_content',
            'appearance' => [
                'useSortable' => true,
                'showSynchronizationLink' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
                'showRemovedLocalizationRecords' => false,
                'expandSingle' => true,
                'enabledControls' => [
                    'localize' => true,
                ]
            ],
            'behaviour' => [
                'mode' => 'select',
            ]
        ]
    ]
]);
