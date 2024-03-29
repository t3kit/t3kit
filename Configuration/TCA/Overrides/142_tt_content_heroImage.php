<?php

defined('TYPO3') || die();

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
        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Static/locallang_heroImage.xlf:heroImage.title',
        'heroImage',
        'ce-hero-image',
        'default'
    ]
);



/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['heroImage'] = 'ce-hero-image';



/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['heroImage'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            header;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_element_title,
            --palette--;;headertext_layout_position_link_subheadertext,
            --palette--;;bodytext_position,
            --palette--;;title_link_position,
            --palette--;;button,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.images,
            picture,
            --palette--;;mediaAdjustments,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:tab.settings,
            pi_flexform;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:flexform.title,
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
            ],
        ],
        'header_text' => [
            'config' => [
                'enableFrontendRichtext' => true,
                'frontendRichtextConfiguration' => 'bronly',
            ],
        ],
        'subheader_text' => [
            'config' => [
                'enableFrontendRichtext' => true,
                'frontendRichtextConfiguration' => 'bronly',
            ],
        ],
        'bodytext' => [
            'config' => [
                'enableFrontendRichtext' => true,
                'frontendRichtextConfiguration' => 'bronly',
            ],
        ],
    ],
];


/*
* ###########################
* Add columns for Content Element
* ===========================
*/


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
    'FILE:EXT:t3kit/Configuration/FlexForms/HeroImage.xml',
    'heroImage'
);
