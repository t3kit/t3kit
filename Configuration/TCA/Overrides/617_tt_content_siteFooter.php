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
        'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.CType',
        'siteFooter',
        'ce-siteFooter',
        'special'
    ]
);


/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['siteFooter'] = 'ce-siteFooter';


/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['siteFooter'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            header;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header.ALT.html_formlabel,
            header_layout,
            header_style,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteFooter.xlf:tab.logo,
            simple_image,
            svg_image,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteFooter.xlf:tab.settings,
            pi_flexform;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteFooter.xlf:flexform.title,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteFooter.xlf:tab.links,
            page_links_1;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteFooter.xlf:page_links_1,
            page_links_2;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteFooter.xlf:page_links_2,
            page_links_3;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteFooter.xlf:page_links_3,
            pages;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Special/locallang_siteFooter.xlf:footer_bottom_links,
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
    '
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
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:t3kit/Configuration/FlexForms/SiteFooter.xml',
    'siteFooter'
);
