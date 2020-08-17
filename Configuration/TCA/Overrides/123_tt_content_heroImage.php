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
        'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_static.xlf:heroImage.title',
        'heroImage',
        'ce-heroImage'
    ],
    'imageTextLink',
    'after'
);



/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['heroImage'] = 'ce-heroImage';



/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['heroImage'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            --palette--;;heroImage,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:tabs.settings,
            pi_flexform;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:flexform.title,
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
$GLOBALS['TCA']['tt_content']['palettes']['heroImage'] = array(
    'showitem' => '
        header;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_formlabel,
        --linebreak--,
        subheader;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:subheader_formlabel,
        --linebreak--,
        bodytext;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:bodytext_formlabel,
        --linebreak--,
        link_title,
        --linebreak--,
        link,
    ',
);


/*
 * ###########################
 * Add flexForms for Content Element
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:t3kit/Configuration/FlexForms/HeroImage.xml',
    'heroImage'
);