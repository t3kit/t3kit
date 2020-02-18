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
        'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_static.xlf:imageTextLink.title',
        'imageTextLink',
        'ce-imageTextLink'
    ],
    'iconTextButton',
    'after'
);


/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['imageTextLink'] = 'ce-imageTextLink';


/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['imageTextLink'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            --palette--;;imageTextLink,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:tabs.settings,
            pi_flexform;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:flexform.title,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.images,
            image, --palette--;;mediaAdjustments,
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
        'image' => [
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
 * Add new palettes for a Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['palettes']['imageTextLink'] = array(
    'showitem' => '
        header;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_formlabel,
        --linebreak--,
        bodytext;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:bodytext_formlabel,
        --linebreak--,
        link_title,
        --linebreak--,
        link,
        --linebreak--,
        content_alignment,
    ',
);


/*
 * ###########################
 * Add flexForms for Content Element
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:t3kit/Configuration/FlexForms/ImageTextLink.xml',
    'imageTextLink'
);
