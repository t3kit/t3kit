<?php

defined('TYPO3_MODE') || die();


/*
* ###########################
* PageTS for t3kit
* ===========================
*/
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Import.tsconfig',
    't3kit'
);


/*
 * ###########################
 * add new TCA columns for pages
 * ===========================
 */
// Add image record for page settings.
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
                    --palette--;;imageoverlayPalette,
                        --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_TEXT => [
                        'showitem' => '
                        --palette--;;imageoverlayPalette,
                        --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                        'showitem' => '
                        --palette--;;imageoverlayPalette,
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
                        --palette--;;imageoverlayPalette,
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

// Add icons record for page settings.
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
    'nav_icon_class' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/Page/locallang.xlf:nav_icon_class',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [   'None',
                    ''
                ]
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


/*
 * ###########################
 * Palettes for pages
 * ===========================
 */
$GLOBALS['TCA']['pages']['palettes']['nav_icon'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/Page/locallang.xlf:nav_icon.palette',
    'showitem' => '
        nav_icon_source, nav_icon_class,
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
