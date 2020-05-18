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
        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteHeader.xlf:siteHeader.title',
        'siteHeader',
        'ce-siteHeader',
        'special'
    ]
);


/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['siteHeader'] = 'ce-siteHeader';


/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['siteHeader'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            header;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header.ALT.html_formlabel,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteHeader.xlf:tab.logo,
            simple_image,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteHeader.xlf:tab.settings,
            pi_flexform;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteHeader.xlf:flexform.title,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteHeader.xlf:tab.meta_menu,
            pages;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:pages.ALT.menu_formlabel,
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
        'simple_image' => [
            'config' => [
                'filter' => [
                    0 => [
                        'parameters' => [
                            'allowedFileExtensions' => 'jpg,jpeg,png,svg'
                        ]
                    ]
                ],
                'overrideChildTca' => [
                    'columns' => [
                        'uid_local' => [
                            'config' => [
                                'appearance' => [
                                    'elementBrowserAllowed' => 'jpg,jpeg,png,svg'
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
];


/*
 * ###########################
 * Add flexForms for Content Element
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:t3kit/Configuration/FlexForms/SiteHeader.xml',
    'siteHeader'
);
