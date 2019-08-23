<?php
defined('TYPO3_MODE') || die();

/*
* ###########################
* PageTS for t3kit
* ===========================
*/
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3kit',
    'Configuration/TSconfig/Page/Import.tsconfig',
    't3kit'
);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages', [
    'nav_icon' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.label',
        'description' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description',
        // 'displayCond' => 'FIELD:add_background:!=:0',
        'exclude' => true,
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('nav_icon', [
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
                                'elementBrowserAllowed' => 'png,svg'
                            ]
                        ]
                    ]
                ]
            ],
        ], $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'])
    ],
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages', [
    'nav_image' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.label',
        'description' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description',
        // 'displayCond' => 'FIELD:add_background:!=:0',
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
    'title',
    '--linebreak--, nav_icon',
    'after:subtitle'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
    'pages',
    'layout',
    '--linebreak--, nav_image',
    'after:backend_layout_next_level'
);
