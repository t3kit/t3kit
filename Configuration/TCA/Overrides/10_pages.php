<?php

defined('TYPO3_MODE') || die();


/*
* ###########################
* PageTS for t3kit
* ===========================
*/
// BE layouts
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/WebLayout/BackendLayouts.tsconfig',
    'All BE layouts'
);
// Content Elements
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/T3kitContentElements.tsconfig',
    'All t3kit Content Elements'
);
// RTE
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/RTE.tsconfig',
    'RTE'
);
// TCAdefaults
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/TCAdefaults.tsconfig',
    'TCAdefaults'
);
// TCEFORM
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/TCEFORM.tsconfig',
    'TCEFORM'
);
// TCEMAIN
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/TCEMAIN.tsconfig',
    'TCEMAIN'
);


// -------------------------------
// t3kit Content Elements includes
// -------------------------------
// Static CE-s
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Static/BigIconTextLink.tsconfig',
    '(Static CE) BigIconTextLink'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Static/IconTextLink.tsconfig',
    '(Static CE) IconTextLink'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Static/ImageTextLink.tsconfig',
    '(Static CE) ImageTextLink'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Static/HeroImage.tsconfig',
    '(Static CE) HeroImage'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Static/Video.tsconfig',
    '(Static CE) Video'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Static/Audio.tsconfig',
    '(Static CE) Audio'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Static/Quote.tsconfig',
    '(Static CE) Quote'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Static/ContactCard.tsconfig',
    '(Static CE) ContactCard'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Static/Button.tsconfig',
    '(Static CE) Button'
);

// Dynamic CE-s
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Dynamic/Slider.tsconfig',
    '(Dynamic CE) Image Slider'
);

// Special CE-s
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Special/DividerIcon.tsconfig',
    '(Special CE) DividerIcon'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Special/SimpleSiteHeader.tsconfig',
    '(Special CE) SimpleSiteHeader'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Special/SiteHeader.tsconfig',
    '(Special CE) SiteHeader'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Mod/Wizards/ContentElements/Special/SiteFooter.tsconfig',
    '(Special CE) SiteFooter'
);




/*
 * #####################################################################
 * #####################################################################
 * Columns and Palettes for pages
 * =====================================================================
 * =====================================================================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages', [
    'nav_image' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/Page/locallang.xlf:nav_image',
        'exclude' => true,
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('nav_image', [
            'appearance' => [
                'createNewRelationLinkTitle' =>
                'LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.asset_references.addFileReference',
            ],
            'overrideChildTca' => [
                'types' => [
                    '0' => [
                        'showitem' => '
                            --palette--;;simpleImageOverlayPalette,
                            --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_TEXT => [
                        'showitem' => '
                        --palette--;;simpleImageOverlayPalette,
                        --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                        'showitem' => '
                        --palette--;;simpleImageOverlayPalette,
                        --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_AUDIO => [
                        'showitem' => '
                        --palette--;;audioOverlayPalette,
                        --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_VIDEO => [
                        'showitem' => '
                        --palette--;;videoOverlayPalette,
                        --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_APPLICATION => [
                        'showitem' => '
                        --palette--;;simpleImageOverlayPalette,
                        --palette--;;filePalette'
                    ]
                ],
                'columns' => [
                    'uid_local' => [
                        'config' => [
                            'appearance' => [
                                'elementBrowserAllowed' => 'jpg,jpeg,png,svg'
                            ]
                        ]
                    ]
                ]
            ],
        ], $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'])
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
    'pages',
    'layout',
    '--linebreak--, nav_image',
    'after:backend_layout_next_level'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages', [
    'nav_icon_source' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/Page/locallang.xlf:nav_icon_source',
        'exclude' => true,
        'onChange' => 'reload',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [   'None',
                    ''
                ],
                [
                    'Bootstrap',
                    'EXT:t3kit/Resources/Public/assets/Icons/Bootstrap/'
                ],
            ],
            'default' => '',
        ]
    ]
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages', [
    'nav_icon' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/Page/locallang.xlf:nav_icon',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'fieldWizard' => [
                'selectIcons' => [
                    'disabled' => 0,
                    'iconSourceField' => 'nav_icon_source',
                ],
            ],
            'itemsProcFunc' => 'T3k\t3kit\View\IconView->addIconsFromSource',
            'items' => [
                [   'None',
                    ''
                ]
            ],
            'maxitems' => '1',
            'size' => '1',
            'default' => '',
        ]
    ]
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages', [
    'hide_subpages_in_menu' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/Page/locallang.xlf:hide_subpages_in_menu',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'items' => [
                [
                    0 => '',
                    1 => '',
                ]
            ],
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
    'pages',
    'visibility',
    'hide_subpages_in_menu',
    'after:nav_hide'
);

$GLOBALS['TCA']['pages']['palettes']['nav_icon'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/Page/locallang.xlf:nav_icon.palette',
    'showitem' => '
        nav_icon_source,
        --linebreak--,
        nav_icon
    '
];

$typeList = [];
$typeList[] = (string)\TYPO3\CMS\Core\Domain\Repository\PageRepository::DOKTYPE_DEFAULT;
$typeList[] = (string)\TYPO3\CMS\Core\Domain\Repository\PageRepository::DOKTYPE_LINK;
$typeList[] = (string)\TYPO3\CMS\Core\Domain\Repository\PageRepository::DOKTYPE_SHORTCUT;

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'pages',
    '--palette--;;nav_icon,',
    implode(',', $typeList),
    'after:layout'
);
