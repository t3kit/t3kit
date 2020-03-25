<?php
defined('TYPO3_MODE') || die();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'add_background' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.label',
        'description' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description',
        'exclude' => true,
        'config' => [
            'type' => 'check',
            'items' => [
                [
                    0 => '',
                    1 => '',
                ]
            ],
            'default' => 0,
        ],
        'onChange' => 'reload',
    ]
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'background_color_class' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.label',
        'description' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description',
        'displayCond' => 'FIELD:add_background:!=:0',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                ['none', 'none'],
                ['Primary', 'primary'],
                ['Secondary', 'secondary'],
                ['Accent #1', 'accent1'],
                ['Accent #2', 'accent2'],
                ['Accent #3', 'accent3'],
                ['White', 'white'],
                ['Black', 'black'],
                ['Gray', 'gray']
            ],
            'default' => 'none',
        ],
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'background_color' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.label',
        'description' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description',
        'displayCond' => 'FIELD:add_background:!=:0',
        'exclude' => true,
        'config' => [
            'type' => 'input',
            'renderType' => 'colorpicker',
            'default' => '#fff',
        ],
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'background' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.label',
        'description' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description',
        'displayCond' => 'FIELD:add_background:!=:0',
        'exclude' => true,
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('background', [
            'appearance' => [
                'createNewRelationLinkTitle' => '
                LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.asset_references.addFileReference
                ',
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
                                'elementBrowserAllowed' => 'jpg,jpeg,png,svg,youtube'
                            ]
                        ]
                    ]
                ]
            ],
            'minitems' => 0,
            'maxitems' => 1,

        ], $GLOBALS['TYPO3_CONF_VARS']['SYS']['mediafile_ext'])
    ],
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'background_parallax' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.label',
        'description' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description',
        'displayCond' => 'FIELD:add_background:!=:0',
        'exclude' => true,
        'config' => [
            'type' => 'check',
            'items' => [
                [
                    0 => '',
                    1 => '',
                ]
            ],
            'default' => 0,
        ]
    ]
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'full_width_background' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.label',
        'description' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description',
        'displayCond' => 'FIELD:add_background:!=:0',
        'exclude' => true,
        'config' => [
            'type' => 'check',
            'items' => [
                [
                    0 => '',
                    1 => '',
                ]
            ],
            'default' => 0,
        ]
    ]
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'content_alignment' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:content_alignment',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.left',
                    'left'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.center',
                    'center'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.right',
                    'right'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.justify',
                    'justify'
                ]
            ],
            'default' => 'left',
        ]
    ],
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'content_alignment_center' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:content_alignment',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.center',
                    'center'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.left',
                    'left'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.right',
                    'right'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.justify',
                    'justify'
                ]
            ],
            'default' => 'center',
        ]
    ],
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'link_title' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:link_title',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255,
        ]
    ],
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'link' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:link',
        'config' => [
            'type' => 'input',
            'renderType' => 'inputLink',
            'size' => 50,
            'max' => 1024,
            'eval' => 'trim',
            'softref' => 'typolink'
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'custom_header' => [
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255,
        ],
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'custom_subheader' => [
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'author_name' => [
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'work_title' => [
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'section_container_width' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:section_container_width',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:section_container_width.container',
                    'container'
                ],
                [
                    '
                    LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:section_container_width.container-fluid
                    ',
                    'container-fluid'
                ]
            ],
            'default' => 'container',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'icon_source' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:icon_source',
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
                    'EXT:t3kit/Resources/Public/Images/Icons/Bootstrap/'
                ],
            ],
            'default' => '',
        ]
    ]
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'icon_class' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:icon_class',
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
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:icon',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' =>'selectSingle',
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
    'header_position' => [
        'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_position',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.left',
                    'left'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.center',
                    'center'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.justify',
                    'justify'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:header_position.right',
                    'right'
                ]
            ],
            'default' => 'left'
        ]
    ],
]);


$GLOBALS['TCA']['tt_content']['columns']['layout']['description'] =
'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description';
$GLOBALS['TCA']['tt_content']['columns']['space_before_class']['description'] =
'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description';
$GLOBALS['TCA']['tt_content']['columns']['space_after_class']['description'] =
'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:columns.description';


$GLOBALS['TCA']['tt_content']['palettes']['frames'] = [
    'showitem' => '
        space_before_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:space_before_class_formlabel,
        space_after_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:space_after_class_formlabel,
        --linebreak--,
        layout;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:layout_formlabel,
        frame_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:frame_class_formlabel,
        --linebreak--,
        add_background,
        --linebreak--,
        background_color_class,
        background_color,
        --linebreak--,
        background,
        --linebreak--,
        background_parallax,
        full_width_background
    '
];


$GLOBALS['TCA']['tt_content']['palettes']['mediaAdjustments'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.palette.mediaAdjustments',
    'showitem' => '
        section_container_width
    '
];

$GLOBALS['TCA']['tt_content']['palettes']['icon'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_TCA_ttc.xlf:icon',
    'showitem' => '
        icon_source, icon_class,
        --linebreak--,
        icon
    '
];
