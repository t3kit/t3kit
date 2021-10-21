<?php

return [
    'ctrl' => [
        'label' => 'header',
        'label_alt' => 'header',
        'sortby' => 'sorting',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'cruser_id' => 'cruser_id',
        'title' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_accordion.xlf:accordion.item',
        'delete' => 'deleted',
        'versioningWS' => true,
        'origUid' => 't3_origuid',
        'hideAtCopy' => true,
        'prependAtCopy' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.prependAtCopy',
        'transOrigPointerField' => 'l10n_parent',
        'transOrigDiffSourceField' => 'l10n_diffsource',
        'languageField' => 'sys_language_uid',
        'enablecolumns' => [
            'disabled' => 'hidden',
            'starttime' => 'starttime',
            'endtime' => 'endtime',
        ],
        'typeicon_classes' => [
            'default' => 'ce-accordion'
        ]
    ],
    'types' => [
        '1' => [
            'showitem' => '
            --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
                --palette--;;headertext_layout_style,
                --palette--;;bodytext,
            --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.images,
                picture,
            --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:media,
                --palette--;;uploads,
                --palette--;;uploadslayout,
            --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
                --palette--;;hidden,
                --palette--;;access,
                --palette--;;hiddenLanguagePalette,
            ',
            'columnsOverrides' => [
                'bodytext' => [
                    'config' => [
                        'enableFrontendRichtext' => true,
                        'frontendRichtextConfiguration' => 'bronly',
                    ],
                ],
            ],
        ],
    ],
    'palettes' => [
        '1' => [
            'showitem' => ''
        ],
        'hidden' => [
            'showitem' => '
                hidden;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:field.default.hidden
            ',
        ],
        'access' => [
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.access',
            'showitem' => '
                starttime;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:starttime_formlabel,
                endtime;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:endtime_formlabel,
            ',
        ],
        'hiddenLanguagePalette' => [
            'showitem' => 'sys_language_uid, l18n_parent',
            'isHiddenPalette' => true,
        ],
        'headertext_layout_style' => [
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
            'showitem' => '
                header,
                --linebreak--,
                header_layout,
                header_style,
                --linebreak--
            '
        ],
        'bodytext' => [
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:bodytext.palette',
            'showitem' => '
                bodytext
            '
        ],
        'uploads' => [
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:media',
            'showitem' => '
                media;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:media.ALT.uploads_formlabel,
                --linebreak--,
                file_collections;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:file_collections.ALT.uploads_formlabel,
                --linebreak--,
                filelink_sorting,
                filelink_sorting_direction,
                target
            ',
        ],
        'uploadslayout' => [
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.uploads_layout',
            'showitem' => '
                filelink_size;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_size_formlabel,
                uploads_description,
                uploads_type
            ',
        ],
    ],
    'columns' => [
        'tt_content' => [
            'exclude' => true,
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_accordion.xlf:accordion.title',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'foreign_table' => 'tt_content',
                'foreign_table_where' => 'AND tt_content.pid=###CURRENT_PID### AND tt_content.CType="accordion"',
                'maxitems' => 1,
                'default' => 0,
            ],
        ],
        'hidden' => [
            'exclude' => true,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.visible',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
                'items' => [
                    [
                        0 => '',
                        1 => '',
                        'invertStateDisplay' => true
                    ]
                ],
            ]
        ],
        'starttime' => [
            'exclude' => true,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.starttime',
            'config' => [
                'type' => 'input',
                'renderType' => 'inputDateTime',
                'eval' => 'datetime,int',
                'default' => 0
            ],
            'l10n_mode' => 'exclude',
            'l10n_display' => 'defaultAsReadonly'
        ],
        'endtime' => [
            'exclude' => true,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.endtime',
            'config' => [
                'type' => 'input',
                'renderType' => 'inputDateTime',
                'eval' => 'datetime,int',
                'default' => 0,
                'range' => [
                    'upper' => mktime(0, 0, 0, 1, 1, 2038)
                ]
            ],
            'l10n_mode' => 'exclude',
            'l10n_display' => 'defaultAsReadonly'
        ],
        'sys_language_uid' => [
            'exclude' => true,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.language',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'special' => 'languages',
                'items' => [
                    [
                        'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.allLanguages',
                        -1,
                        'flags-multiple'
                    ],
                ],
                'default' => 0,
            ]
        ],
        'l10n_parent' => [
            'displayCond' => 'FIELD:sys_language_uid:>:0',
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.l18n_parent',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        '',
                        0
                    ]
                ],
                'foreign_table' => 'tx_t3kit_accordion_item',
                'foreign_table_where' => 'AND tx_t3kit_accordion_item.pid=###CURRENT_PID### AND tx_t3kit_accordion_item.sys_language_uid IN (-1,0)',
                'default' => 0
            ]
        ],
        'l10n_diffsource' => [
            'config' => [
                'type' => 'passthrough',
            ]
        ],

        'header' => [
            'exclude' => true,
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_accordion.xlf:accordion.header',
            'config' => [
                'type' => 'input'
            ]
        ],
        'header_layout' => [
            'exclude' => true,
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.1',
                        '1'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.2',
                        '2'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.3',
                        '3'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.4',
                        '4'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.5',
                        '5'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.6',
                        '6'
                    ]
                ],
                'default' => '2'
            ]
        ],
        'header_style' => [
            'exclude' => true,
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.default',
                        '0'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.1',
                        'h1'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.2',
                        'h2'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.3',
                        'h3'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.4',
                        'h4'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.5',
                        'h5'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.6',
                        'h6'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.1',
                        'large-h1'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.2',
                        'large-h2'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.3',
                        'large-h3'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.4',
                        'large-h4'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.5',
                        'large-h5'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.6',
                        'large-h6'
                    ]
                ],
                'default' => '0'
            ]
        ],
        'bodytext' => [
            'l10n_mode' => 'prefixLangTitle',
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.text',
            'config' => [
                'type' => 'text',
                'cols' => 80,
                'rows' => 15,
                'softref' => 'typolink_tag,email[subst],url',
                'enableRichtext' => true
            ]
        ],
        'picture' => [
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture',
            'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('picture', [
                'appearance' => [
                    'createNewRelationLinkTitle' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:images.addFileReference'
                ],
                'overrideChildTca' => [
                    'types' => [
                        '0' => [
                            'showitem' => '
                                --palette--;;imageOverlayPalette,
                                --palette--;;filePalette'
                        ],
                        \TYPO3\CMS\Core\Resource\File::FILETYPE_TEXT => [
                            'showitem' => '
                                --palette--;;imageOverlayPalette,
                                --palette--;;filePalette'
                        ],
                        \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                            'showitem' => '
                                --palette--;;imageOverlayPalette,
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
                                --palette--;;imageOverlayPalette,
                                --palette--;;filePalette'
                        ]
                    ],
                    'columns' => [
                        'uid_local' => [
                            'config' => [
                                'appearance' => [
                                    'elementBrowserAllowed' => 'jpg,jpeg,png'
                                ]
                            ]
                        ]
                    ]
                ],
                'minitems' => 0,
                'maxitems' => 1,
            ], $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'])
        ],
        'file_collections' => [
            'exclude' => true,
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:file_collections',
            'config' => [
                'type' => 'group',
                'internal_type' => 'db',
                'localizeReferencesAtParentLocalization' => true,
                'allowed' => 'sys_file_collection',
                'foreign_table' => 'sys_file_collection',
                'minitems' => 0,
                'size' => 5
            ]
        ],
        'media' => [
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:media',
            'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('media', [
                'appearance' => [
                    'createNewRelationLinkTitle' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:media.addFileReference'
                ],
            ])
        ],
        'filelink_size' => [
            'exclude' => true,
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_size',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
                'items' => [
                    [
                        0 => '',
                        1 => '',
                    ]
                ],
            ]
        ],
        'filelink_sorting' => [
            'exclude' => true,
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting.none', ''],
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting.extension', 'extension'],
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting.name', 'name'],
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting.type', 'type'],
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting.size', 'size'],
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting.creation_date', 'creation_date'],
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting.modification_date', 'modification_date'],
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting.title', 'title'],
                ]
            ]
        ],
        'filelink_sorting_direction' => [
            'exclude' => true,
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting_direction',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['', ''],
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting_direction.ascending', 'asc'],
                    ['LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:filelink_sorting_direction.descending', 'desc'],
                ]
            ]
        ],
        'target' => [
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:target',
            'config' => [
                'type' => 'input',
                'size' => 20,
                'eval' => 'trim',
                'valuePicker' => [
                    'items' => [
                        [ 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:target.I.1', '_blank' ],
                    ],
                ],
                'default' => ''
            ]
        ],
        'uploads_description' => [
            'exclude' => true,
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.uploads_description',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
                'default' => 0,
                'items' => [
                    [
                        0 => '',
                        1 => '',
                    ]
                ],
            ]
        ],
        'uploads_type' => [
            'exclude' => true,
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.uploads_type',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.uploads_type.0', 0],
                    ['LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.uploads_type.1', 1],
                    ['LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.uploads_type.2', 2]
                ],
                'default' => 0
            ]
        ]
    ]
];
