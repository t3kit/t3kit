<?php
defined('TYPO3_MODE') || die();


/*
 * ###########################
 * Add Content Element to Type list
 * ===========================
 */


// /*
//  * ###########################
//  * Add icon for Content Element
//  * ===========================
//  */


/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['textmedia'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            --palette--;;headers,
            bodytext;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:bodytext_formlabel,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.media,
            assets,
            --palette--;;mediaAdjustments,
            --palette--;;gallerySettings,
            --palette--;;imagelinks,
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
        'assets' => [
            'config' => [
                'filter' => [
                    0 => [
                        'parameters' => [
                            'allowedFileExtensions' => 'jpg,jpeg,png,svg,mp4,webm,youtube,vimeo,mp3'
                        ]
                    ]
                ],
                'overrideChildTca' => [
                    'columns' => [
                        'uid_local' => [
                            'config' => [
                                'appearance' => [
                                    'elementBrowserAllowed' => 'jpg,jpeg,png,svg,mp4,webm,youtube,vimeo,mp3'
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


/*
 * ###########################
 * Add flexForms for Content Element
 * ===========================
 */
