<?php
defined('TYPO3_MODE') || die();



/*
 * ###########################
 * Add Content Element to Type list
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_static.xlf:quote.title',
        'quote',
        'ce-quote'
    ],
    'heroImage',
    'after'
);



/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['quote'] = 'ce-quote';



/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['quote'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            --palette--;;quote,
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
$GLOBALS['TCA']['tt_content']['palettes']['quote'] = array(
    'showitem' => '
        custom_header;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_static.xlf:quote.author,
        --linebreak--,
        custom_subheader;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_static.xlf:quote.cited_work,
        --linebreak--,
        bodytext;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_static.xlf:quote.bodytext,
        --linebreak--,
        link_title,
        --linebreak--,
        link,
    ',
);
