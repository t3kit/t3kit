<?php

defined('TYPO3_MODE') || die();

/*
 * ###########################
 * rewrite existed TCA columns for tt_content
 * ===========================
 */
// ----------------
// rewrite "header_link" column config
$GLOBALS['TCA']['tt_content']['columns']['header_link']  = array_replace_recursive(
    $GLOBALS['TCA']['tt_content']['columns']['header_link'],
    [
        'config' => [
            'fieldControl' => [
                'linkPopup' => [
                    'options' => [
                        'blindLinkFields' => 'params, target, class, title',
                        'blindLinkOptions' => 'folder, mail, telephone'
                    ],
                ],
            ],
        ]
    ]
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'header_position' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_position',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_position.left',
                    '0'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_position.center',
                    'center'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_position.right',
                    'right'
                ]
            ],
            'default' => '0'
        ]
    ]
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
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
                ],
                [
                    'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_layout.I.6',
                    '100'
                ]
            ],
            'default' => '2'
        ]
    ],
]);

// rewrite image_zoom column
$GLOBALS['TCA']['tt_content']['columns']['image_zoom']  = array_replace_recursive(
    $GLOBALS['TCA']['tt_content']['columns']['image_zoom'],
    [
        'onChange' => 'reload',
        'config' => [
            'default' => 0
        ]
    ]
);

// rewrite space_before_class column
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'space_before_class' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:space_before_class',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_default',
                    '0'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_5',
                    'margin-top-5'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_10',
                    'margin-top-10'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_15',
                    'margin-top-15'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_20',
                    'margin-top-20'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_25',
                    'margin-top-25'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_30',
                    'margin-top-30'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_40',
                    'margin-top-40'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_50',
                    'margin-top-50'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_60',
                    'margin-top-60'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_70',
                    'margin-top-70'
                ]
            ],
            'default' => '0'
        ]
    ],
]);

// rewrite space_after_class column
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'space_after_class' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:space_after_class',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_default',
                    '0'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_5',
                    'margin-bottom-5'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_10',
                    'margin-bottom-10'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_15',
                    'margin-bottom-15'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_20',
                    'margin-bottom-20'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_25',
                    'margin-bottom-25'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_30',
                    'margin-bottom-30'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_40',
                    'margin-bottom-40'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_50',
                    'margin-bottom-50'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_60',
                    'margin-bottom-60'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_70',
                    'margin-bottom-70'
                ]
            ],
            'default' => '0'
        ]
    ],
]);


 /*
 * ###########################
 * add new TCA columns for tt_content
 * ===========================
 */
// ----------------
// Content element Appearance tab configs
// \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
//     'add_background' => [
//         'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:add_background',
//         'description' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:add_background.description',
//         'exclude' => true,
//         'config' => [
//             'type' => 'check',
//             'items' => [
//                 [
//                     0 => '',
//                     1 => '',
//                 ]
//             ],
//             'default' => 0,
//         ],
//         'onChange' => 'reload',
//     ]
// ]);

// \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
//     'background_color_class' => [
//         'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:background_color_class',
//         'description' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:background_color_class.description',
//         'displayCond' => 'FIELD:add_background:!=:0',
//         'exclude' => true,
//         'config' => [
//             'type' => 'select',
//             'renderType' => 'selectSingle',
//             'items' => [
//                 ['none', 'none'],
//                 ['Primary', 'primary'],
//                 ['Secondary', 'secondary'],
//                 ['Accent #1', 'accent1'],
//                 ['Accent #2', 'accent2'],
//                 ['Accent #3', 'accent3'],
//                 ['White', 'white'],
//                 ['Black', 'black'],
//                 ['Gray', 'gray']
//             ],
//             'default' => 'none',
//         ],
//     ],
// ]);

// \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
//     'background_color' => [
//         'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:background_color',
//         'description' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:background_color.description',
//         'displayCond' => 'FIELD:add_background:!=:0',
//         'exclude' => true,
//         'config' => [
//             'type' => 'input',
//             'renderType' => 'colorpicker',
//             'default' => '#fff',
//         ],
//     ],
// ]);

// \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
//     'background' => [
//         'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:background',
//         'description' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:background.description',
//         'displayCond' => 'FIELD:add_background:!=:0',
//         'exclude' => true,
//         'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('background', [
//             'appearance' => [
//                 'createNewRelationLinkTitle' => '
//                 LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.asset_references.addFileReference
//                 ',
//             ],
//             'overrideChildTca' => [
//                 'types' => [
//                     '0' => [
//                         'showitem' => '
//                         --palette--;;imageoverlayPalette,
//                         --palette--;;filePalette'
//                     ],
//                     \TYPO3\CMS\Core\Resource\File::FILETYPE_TEXT => [
//                         'showitem' => '
//                         --palette--;;imageoverlayPalette,
//                         --palette--;;filePalette'
//                     ],
//                     \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
//                         'showitem' => '
//                         --palette--;;imageoverlayPalette,
//                         --palette--;;filePalette'
//                     ],
//                     \TYPO3\CMS\Core\Resource\File::FILETYPE_AUDIO => [
//                         'showitem' => '
//                         --palette--;;audioOverlayPalette,
//                         --palette--;;filePalette'
//                     ],
//                     \TYPO3\CMS\Core\Resource\File::FILETYPE_VIDEO => [
//                         'showitem' => '
//                         --palette--;;videoOverlayPalette,
//                         --palette--;;filePalette'
//                     ],
//                     \TYPO3\CMS\Core\Resource\File::FILETYPE_APPLICATION => [
//                         'showitem' => '
//                         --palette--;;imageoverlayPalette,
//                         --palette--;;filePalette'
//                     ]
//                 ],
//                 'columns' => [
//                     'uid_local' => [
//                         'config' => [
//                             'appearance' => [
//                                 'elementBrowserAllowed' => 'jpg,jpeg,png,svg,youtube'
//                             ]
//                         ]
//                     ]
//                 ]
//             ],
//             'minitems' => 0,
//             'maxitems' => 1,

//         ], $GLOBALS['TYPO3_CONF_VARS']['SYS']['mediafile_ext'])
//     ],
// ]);

// \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
//     'background_parallax' => [
//         'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:background_parallax',
//         'description' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:background_parallax.description',
//         'displayCond' => 'FIELD:add_background:!=:0',
//         'exclude' => true,
//         'config' => [
//             'type' => 'check',
//             'items' => [
//                 [
//                     0 => '',
//                     1 => '',
//                 ]
//             ],
//             'default' => 0,
//         ]
//     ]
// ]);

// \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
//     'full_width_background' => [
//         'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:full_width_background',
//         'description' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:full_width_background.description',
//         'displayCond' => 'FIELD:add_background:!=:0',
//         'exclude' => true,
//         'config' => [
//             'type' => 'check',
//             'items' => [
//                 [
//                     0 => '',
//                     1 => '',
//                 ]
//             ],
//             'default' => 0,
//         ]
//     ]
// ]);

// ----------------
// Content element custom t3kit configs
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
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
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'subheader_style' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:subheader_style',
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
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'content_position' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_position',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_position.left',
                    '0'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_position.center',
                    'center'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_position.right',
                    'right'
                ]
            ],
            'default' => '0',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'link_title' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_title',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'accessible_link_label' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:accessible_link_label',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'link' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link',
        'config' => [
            'type' => 'input',
            'renderType' => 'inputLink',
            'size' => 50,
            'max' => 1024,
            'eval' => 'trim',
            'fieldControl' => [
                'linkPopup' => [
                    'options' => [
                        'title' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link',
                        'blindLinkFields' => 'params, target, class, title',
                        'blindLinkOptions' => 'folder'
                    ],
                ],
            ],
            'softref' => 'typolink'
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'link_position' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_position',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_position.left',
                    '0'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_position.center',
                    'center'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_position.right',
                    'right'
                ]
            ],
            'default' => '0',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'section_container_width' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:section_container_width',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:section_container_width.container',
                    'container'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:section_container_width.container_fluid',
                    'container-fluid'
                ]
            ],
            'default' => 'container',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'image_zoom_width' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width',
        'exclude' => true,
        'displayCond' => 'FIELD:image_zoom:!=:0',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.1920',
                    '1920'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.1440',
                    '1440'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.1200',
                    '1200'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.992',
                    '992'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.800',
                    '800'
                ]
            ],
            'default' => '1920',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'simple_image' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:simple_image',
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('simple_image', [
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
                    ],
                    'crop' => [
                        'config' => [
                            'cropVariants' => [
                                'mobile' => [
                                    'disabled' => true
                                ],
                            ],
                        ],
                    ],
                ]
            ],
        ], $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'])
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'svg_image' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:svg_image',
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('svg_image', [
            'appearance' => [
                'createNewRelationLinkTitle' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:images.addFileReference'
            ],
            'overrideChildTca' => [
                'types' => [
                    '0' => [
                        'showitem' => '
                            --palette--;;svgImageOverlayPalette,
                            --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_TEXT => [
                        'showitem' => '
                            --palette--;;svgImageOverlayPalette,
                            --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                        'showitem' => '
                            --palette--;;svgImageOverlayPalette,
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
                            --palette--;;svgImageOverlayPalette,
                            --palette--;;filePalette'
                    ]
                ],
                'columns' => [
                    'uid_local' => [
                        'config' => [
                            'appearance' => [
                                'elementBrowserAllowed' => 'svg'
                            ]
                        ]
                    ]
                ]
            ],
        ], $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'])
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
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
        ], $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'])
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'advanced_image' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:advanced_image',
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('advanced_image', [
            'appearance' => [
                'createNewRelationLinkTitle' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:images.addFileReference'
            ],
            'overrideChildTca' => [
                'types' => [
                    '0' => [
                        'showitem' => '
                            --palette--;;advancedImageOverlayPalette,
                            --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_TEXT => [
                        'showitem' => '
                            --palette--;;advancedImageOverlayPalette,
                            --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                        'showitem' => '
                            --palette--;;advancedImageOverlayPalette,
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
                            --palette--;;advancedImageOverlayPalette,
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
        ], $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'])
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'advanced_media' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:advanced_media',
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('advanced_media', [
            'appearance' => [
                'createNewRelationLinkTitle' =>
                'LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.asset_references.addFileReference'
            ],
            'overrideChildTca' => [
                'types' => [
                    '0' => [
                        'showitem' => '
                            --palette--;;advancedImageOverlayPalette,
                            --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_TEXT => [
                        'showitem' => '
                            --palette--;;advancedImageOverlayPalette,
                            --palette--;;filePalette'
                    ],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                        'showitem' => '
                            --palette--;;advancedImageOverlayPalette,
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
                            --palette--;;advancedImageOverlayPalette,
                            --palette--;;filePalette'
                    ]
                ],
                'columns' => [
                    'uid_local' => [
                        'config' => [
                            'appearance' => [
                                'elementBrowserAllowed' => 'jpg,jpeg,png,mp4,webm,youtube,vimeo,mp3'
                            ]
                        ]
                    ]
                ]
            ],
        ], $GLOBALS['TYPO3_CONF_VARS']['GFX']['mediafile_ext'])
    ],
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'height' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:height',
        'config' => [
            'type' => 'input',
            'size' => 4,
            'max' => 4,
            'eval' => 'int',
            'range' => [
                'upper' => 1999,
                'lower' => 0,
            ],
            'default' => 0
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'icon_source' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:icon_source',
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

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'icon_class' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:icon_class',
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

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'icon' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:icon',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'fieldWizard' => [
                'selectIcons' => [
                    'disabled' => 0,
                ],
            ],
            'itemsProcFunc' => 'T3k\t3kit\View\IconView->addIconsFromSource',
            'items' => [
                [   'None',
                    ''
                ]
            ],
            'maxitems' => 1,
            'size' => '1',
            'default' => '',
        ]
    ]
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'header_text' => [
        'exclude' => true,
        'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header',
        'config' => [
            'type' => 'text',
            'cols' => 80,
            'rows' => 5
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'subheader_text' => [
        'exclude' => true,
        'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.subheader',
        'config' => [
            'type' => 'text',
            'cols' => 80,
            'rows' => 5
        ]
    ],
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'link_as_button' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_as_button',
        'onChange' => 'reload',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxLabeledToggle',
            'items' => [
                [
                   0 => '',
                   1 => '',
                   'labelChecked' => 'Enabled',
                   'labelUnchecked' => 'Disabled',
                ]
            ],
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'button_size' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_size',
        'displayCond' => 'FIELD:link_as_button:!=:0',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_size.default',
                    0
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_size.large',
                    'btn-lg'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_size.small',
                    'btn-sm'
                ]
            ],
            'default' => 0,
        ]
    ],
]);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'button_style' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_style',
        'displayCond' => 'FIELD:link_as_button:!=:0',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_style.primary',
                    'primary'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_style.dark',
                    'dark'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_style.light',
                    'light'
                ]
            ],
            'default' => 'primary',
        ]
    ],
]);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'button_full_width' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_full_width',
        'displayCond' => 'FIELD:link_as_button:!=:0',
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
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'button_no_bg' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_no_bg',
        'displayCond' => 'FIELD:link_as_button:!=:0',
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

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'page_links_1' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:page_links',
        'config' => [
            'type' => 'group',
            'internal_type' => 'db',
            'allowed' => 'pages',
            'size' => 3,
            'maxitems' => 30,
            'minitems' => 0
        ]
    ],
]);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'page_links_2' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:page_links',
        'config' => [
            'type' => 'group',
            'internal_type' => 'db',
            'allowed' => 'pages',
            'size' => 3,
            'maxitems' => 30,
            'minitems' => 0
        ]
    ],
]);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'page_links_3' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:page_links',
        'config' => [
            'type' => 'group',
            'internal_type' => 'db',
            'allowed' => 'pages',
            'size' => 3,
            'maxitems' => 30,
            'minitems' => 0
        ]
    ],
]);

/*
 * ###########################
 * Additional palettes for tt_content
 * ===========================
 */

// rewrite "frames" palette
// $GLOBALS['TCA']['tt_content']['palettes']['frames'] = [
//     'showitem' => '
//         space_before_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:space_before_class_formlabel,
//         space_after_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:space_after_class_formlabel,
//         --linebreak--,
//         layout;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:layout_formlabel,
//         frame_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:frame_class_formlabel,
//         --linebreak--,
//         add_background,
//         --linebreak--,
//         background_color_class,
//         background_color,
//         --linebreak--,
//         background,
//         --linebreak--,
//         background_parallax,
//         full_width_background
//     '
// ];
$GLOBALS['TCA']['tt_content']['palettes']['frames'] = [
    'showitem' => '
        space_before_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:space_before_class_formlabel,
        space_after_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:space_after_class_formlabel,
        --linebreak--,
        layout;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:layout_formlabel,
        frame_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:frame_class_formlabel
    '
];

// rewrite imagelinks palette
$GLOBALS['TCA']['tt_content']['palettes']['imagelinks'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.imagelinks',
    'showitem' => '
        image_zoom;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:image_zoom_formlabel,
        image_zoom_width
    '
];

// rewrite mediaAdjustments palette
$GLOBALS['TCA']['tt_content']['palettes']['mediaAdjustments'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.palette.mediaAdjustments',
    'showitem' => '
        section_container_width
    '
];
// add mediaAdjustments_height palette
$GLOBALS['TCA']['tt_content']['palettes']['mediaAdjustments_height'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.palette.mediaAdjustments',
    'showitem' => '
        section_container_width,height;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:height.image
    '
];


// add icon palette
$GLOBALS['TCA']['tt_content']['palettes']['icon'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:icon.palette',
    'showitem' => '
        icon_source,
        --linebreak--,
        icon
    '
];

// -------------------
// Link palettes
// -------------------
// add new palette title_link_position
$GLOBALS['TCA']['tt_content']['palettes']['title_link_position'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link.palette',
    'showitem' => '
        link_title,link,link_position,
        --linebreak--,
        accessible_link_label
    '
];
// add new palette title_link
$GLOBALS['TCA']['tt_content']['palettes']['title_link'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link.palette',
    'showitem' => '
        link_title,link,
        --linebreak--,
        accessible_link_label
    '
];

// -------------------
// Button palette
// -------------------
// add new palette button
$GLOBALS['TCA']['tt_content']['palettes']['button'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button.palette',
    'showitem' => '
        link_as_button,
        --linebreak--,
        button_size,button_style,button_full_width,button_no_bg
    '
];

// -------------------
// Bodytext palette
// -------------------
// add new palette bodytext_position
$GLOBALS['TCA']['tt_content']['palettes']['bodytext_position'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:bodytext.palette',
    'showitem' => '
        bodytext,content_position
    '
];


// -------------------
// Header palettes
// -------------------
// TYPO3 core header palette = header + layout + position + date + link
// TYPO3 core headers palette = header + layout + position + date + link + subheader

// add new palette header_only
$GLOBALS['TCA']['tt_content']['palettes']['header_only'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header
    '
];
// add new palette header_position
$GLOBALS['TCA']['tt_content']['palettes']['header_position'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header,
        --linebreak--,
        header_position
    '
];
// add new palette header_layout
$GLOBALS['TCA']['tt_content']['palettes']['header_layout'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header,
        --linebreak--,
        header_layout,
        header_style
    '
];
// add new palette header_layout_position
$GLOBALS['TCA']['tt_content']['palettes']['header_layout_position'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header,
        --linebreak--,
        header_layout,
        header_style,
        header_position
    '
];
// add new palette header_layout_position_subheader
$GLOBALS['TCA']['tt_content']['palettes']['header_layout_position_subheader'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header,
        --linebreak--,
        header_layout,
        header_style,
        header_position,
        --linebreak--,
        subheader,
        subheader_style
    '
];
// add new palette header_layout_position_link_subheader
$GLOBALS['TCA']['tt_content']['palettes']['header_layout_position_link_subheader'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header,
        --linebreak--,
        header_layout,
        header_style,
        header_position,
        --linebreak--,
        header_link,
        --linebreak--,
        subheader,
        subheader_style
    '
];

// -------------------
// Header in several rows
// -------------------
// add new palette headertext_only
$GLOBALS['TCA']['tt_content']['palettes']['headertext_only'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header_text
    '
];
// add new palette headertext_position
$GLOBALS['TCA']['tt_content']['palettes']['headertext_position'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header_text,
        --linebreak--,
        header_position
    '
];
// add new palette headertext_layout
$GLOBALS['TCA']['tt_content']['palettes']['headertext_layout'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header_text,
        --linebreak--,
        header_layout,
        header_style
    '
];
// add new palette headertext_layout_position
$GLOBALS['TCA']['tt_content']['palettes']['headertext_layout_position'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header_text,
        --linebreak--,
        header_layout,
        header_style,
        header_position
    '
];
// add new palette headertext_layout_position_subheadertext
$GLOBALS['TCA']['tt_content']['palettes']['headertext_layout_position_subheadertext'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header_text,
        --linebreak--,
        header_layout,
        header_style,
        header_position,
        --linebreak--,
        subheader_text,
        subheader_style
    '
];
// add new palette headertext_layout_position_link_subheadertext
$GLOBALS['TCA']['tt_content']['palettes']['headertext_layout_position_link_subheadertext'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.header',
    'showitem' => '
        header_text,
        --linebreak--,
        header_layout,
        header_style,
        header_position,
        --linebreak--,
        header_link,
        --linebreak--,
        subheader_text,
        subheader_style
    '
];
