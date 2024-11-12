<?php

defined('TYPO3') || die();

/*
 * #####################################################################
 * #####################################################################
 * TCA Columns
 * =====================================================================
 * =====================================================================
 */


/*
 * ###########################
 * Header
 * ---------------------------
 * header_text
 * header_layout
 * header_style
 * header_position
 * header_link
 * ===========================
 */
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

// override TYPO3 "header_layout" column config (frontend sys. ext.)
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'header_layout' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.1',
                    'value' => '1'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.2',
                    'value' => '2'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.3',
                    'value' => '3'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.4',
                    'value' => '4'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.5',
                    'value' => '5'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_layout.6',
                    'value' => '6'
                ],
                [
                    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_layout.I.6',
                    'value' => '100'
                ]
            ],
            'default' => '2'
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'header_style' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.default',
                    'value' => '0'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.1',
                    'value' => 'h1'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.2',
                    'value' => 'h2'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.3',
                    'value' => 'h3'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.4',
                    'value' => 'h4'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.5',
                    'value' => 'h5'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.6',
                    'value' => 'h6'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.1',
                    'value' => 'large-h1'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.2',
                    'value' => 'large-h2'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.3',
                    'value' => 'large-h3'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.4',
                    'value' => 'large-h4'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.5',
                    'value' => 'large-h5'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.6',
                    'value' => 'large-h6'
                ]
            ],
            'default' => '0'
        ]
    ],
]);

// override TYPO3 "header_position" column config (frontend sys. ext.)
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'header_position' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_position',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_position.left',
                    'value' => '0'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_position.center',
                    'value' => 'center'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_position.right',
                    'value' => 'end'
                ]
            ],
            'default' => '0'
        ]
    ]
]);
// override TYPO3 "header_link" column config (frontend sys. ext.)
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



/*
 * ###########################
 * SubHeader
 * ---------------------------
 * subheader_text
 * subheader_style
 * ===========================
 */
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
    'subheader_style' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:subheader_style',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.default',
                    'value' => '0'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.1',
                    'value' => 'h1'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.2',
                    'value' => 'h2'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.3',
                    'value' => 'h3'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.4',
                    'value' => 'h4'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.5',
                    'value' => 'h5'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.6',
                    'value' => 'h6'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.1',
                    'value' => 'large-h1'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.2',
                    'value' => 'large-h2'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.3',
                    'value' => 'large-h3'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.4',
                    'value' => 'large-h4'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.5',
                    'value' => 'large-h5'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:header_style.large_heading.6',
                    'value' => 'large-h6'
                ]
            ],
            'default' => '0'
        ]
    ],
]);



/*
 * ###########################
 * Bodytext
 * ---------------------------
 * content_position
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'content_position' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_position',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_position.left',
                    'value' => '0'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_position.center',
                    'value' => 'center'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_position.right',
                    'value' => 'end'
                ]
            ],
            'default' => '0',
        ]
    ],
]);



/*
 * ###########################
 * Link/Button
 * ---------------------------
 * link_title
 * link
 * link_position
 * accessible_link_label
 * link_as_button
 * button_size
 * button_style
 * button_full_width
 * button_no_bg
 * ===========================
 */
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
    'link' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link',
        'config' => [
            'type' => 'link',
            'size' => 50,
            'allowedTypes' => ['page', 'file', 'url', 'email', 'record', 'telephone'],
            'appearance' => ['browserTitle' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link', 'allowedOptions' => ['rel']]
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
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_position.left',
                    'value' => '0'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_position.center',
                    'value' => 'center'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_position.right',
                    'value' => 'end'
                ]
            ],
            'default' => '0',
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
    'link_as_button' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_as_button',
        'onChange' => 'reload',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxLabeledToggle',
            'items' => [
                [
                    'label' => '',
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
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_size.default',
                    'value' => 0
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_size.large',
                    'value' => 'btn-lg'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_size.small',
                    'value' => 'btn-sm'
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
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_style.primary',
                    'value' => 'primary'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_style.dark',
                    'value' => 'dark'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button_style.light',
                    'value' => 'light'
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
            'default' => 0,
        ]
    ],
]);



/*
 * ###########################
 * Image/Media
 * ---------------------------
 * simple_image
 * svg_image
 * picture
 * advanced_image
 * advanced_media
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'simple_image' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:simple_image',
        'config' => [
            ### !!! Watch out for fieldName different from columnName
            'type' => 'file',
            'allowed' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'],
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
        ]
    ],
]);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'svg_image' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:svg_image',
        'config' => [
            ### !!! Watch out for fieldName different from columnName
            'type' => 'file',
            'allowed' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'],
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
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'picture' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture',
        'config' => [
            ### !!! Watch out for fieldName different from columnName
            'type' => 'file',
            'allowed' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'],
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
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'advanced_image' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:advanced_image',
        'config' => [
            ### !!! Watch out for fieldName different from columnName
            'type' => 'file',
            'allowed' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'],
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
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'advanced_media' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:advanced_media',
        'config' => [
            ### !!! Watch out for fieldName different from columnName
            'type' => 'file',
            'allowed' => $GLOBALS['TYPO3_CONF_VARS']['SYS']['mediafile_ext'],
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
        ]
    ],
]);



/*
 * ###########################
 * Media Adjustments
 * ---------------------------
 * section_container_width
 * image_zoom
 * image_zoom_width
 * textorient
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'section_container_width' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:section_container_width',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:section_container_width.container',
                    'value' => 'container'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:section_container_width.container_fluid',
                    'value' => 'container-fluid'
                ]
            ],
            'default' => 'container',
        ]
    ],
]);

// override TYPO3 "image_zoom" column config (frontend sys. ext.)
$GLOBALS['TCA']['tt_content']['columns']['image_zoom']  = array_replace_recursive(
    $GLOBALS['TCA']['tt_content']['columns']['image_zoom'],
    [
        'onChange' => 'reload',
        'config' => [
            'default' => 0
        ]
    ]
);

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
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.1920',
                    'value' => '1920'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.1440',
                    'value' => '1440'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.1200',
                    'value' => '1200'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.992',
                    'value' => '992'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:image_zoom_width.800',
                    'value' => '800'
                ]
            ],
            'default' => '1920',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'textorient' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:textorient',
        'displayCond' => [
            'OR' => [
                'FIELD:imageorient:=:25',
                'FIELD:imageorient:=:26'
            ],
        ],
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:textorient.default',
                    'value' => 0
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:textorient.auto',
                    'value' => 'textorient-auto'
                ],
            ],
            'default' => 0,
        ]
    ],
]);



/*
 * ###########################
 * Icon
 * ---------------------------
 * icon_source
 * icon
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'icon_source' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:icon_source',
        'exclude' => true,
        'onChange' => 'reload',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [   'label' => 'None',
                    'value' => ''
                ],
                [
                    'label' => 'Bootstrap',
                    'value' => 'EXT:t3kit/Resources/Public/assets/Icons/Bootstrap/'
                ],
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
                [   'label' => 'None',
                    'value' => ''
                ]
            ],
            'maxitems' => 1,
            'size' => '1',
            'default' => '',
        ]
    ]
]);



/*
 * ###########################
 * Appearance
 * ---------------------------
 * space_before_class
 * space_after_class
 * color_class
 * background_color_class
 * ===========================
 */
// override TYPO3 "space_before_class" column config (frontend sys. ext.)
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'space_before_class' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:space_before_class',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_default',
                    'value' => '0'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_5',
                    'value' => 'margin-top-5'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_10',
                    'value' => 'margin-top-10'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_15',
                    'value' => 'margin-top-15'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_20',
                    'value' => 'margin-top-20'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_25',
                    'value' => 'margin-top-25'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_30',
                    'value' => 'margin-top-30'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_40',
                    'value' => 'margin-top-40'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_50',
                    'value' => 'margin-top-50'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_60',
                    'value' => 'margin-top-60'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_70',
                    'value' => 'margin-top-70'
                ]
            ],
            'default' => '0'
        ]
    ],
]);

// override TYPO3 "space_after_class" column config (frontend sys. ext.)
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'space_after_class' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:space_after_class',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_default',
                    'value' => '0'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_5',
                    'value' => 'margin-bottom-5'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_10',
                    'value' => 'margin-bottom-10'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_15',
                    'value' => 'margin-bottom-15'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_20',
                    'value' => 'margin-bottom-20'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_25',
                    'value' => 'margin-bottom-25'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_30',
                    'value' => 'margin-bottom-30'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_40',
                    'value' => 'margin-bottom-40'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_50',
                    'value' => 'margin-bottom-50'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_60',
                    'value' => 'margin-bottom-60'
                ],
                [
                    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:margin_70',
                    'value' => 'margin-bottom-70'
                ]
            ],
            'default' => '0'
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'color_class' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:color_class',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                ['label' => 'none', 'value' => '0'],
                ['label' => 'Primary', 'value' => 'primary-color'],
                ['label' => 'Secondary', 'value' => 'secondary-color'],
                ['label' => 'Dark', 'value' => 'dark-color'],
                ['label' => 'Light', 'value' => 'light-color'],
                ['label' => 'Inverted', 'value' => 'inverted-color']
            ],
            'default' => '0',
        ],
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'background_color_class' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:background_color_class',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                ['label' => 'none', 'value' => '0'],
                ['label' => 'Primary', 'value' => 'primary-bg-color'],
                ['label' => 'Secondary', 'value' => 'secondary-bg-color'],
                ['label' => 'Dark', 'value' => 'dark-bg-color'],
                ['label' => 'Light', 'value' => 'light-bg-color'],
                ['label' => 'Default', 'value' => 'default-bg-color'],
                ['label' => 'Inverted', 'value' => 'inverted-bg-color'],
                ['label' => 'Gray 90', 'value' => 'gray-90-bg-color'],
                ['label' => 'Gray 80', 'value' => 'gray-80-bg-color'],
                ['label' => 'Gray 70', 'value' => 'gray-70-bg-color'],
                ['label' => 'Gray 60', 'value' => 'gray-60-bg-color'],
                ['label' => 'Gray 50', 'value' => 'gray-50-bg-color'],
                ['label' => 'Gray 40', 'value' => 'gray-40-bg-color'],
                ['label' => 'Gray 30', 'value' => 'gray-30-bg-color'],
                ['label' => 'Gray 20', 'value' => 'gray-20-bg-color'],
                ['label' => 'Gray 10', 'value' => 'gray-10-bg-color']
            ],
            'default' => '0',
        ],
    ],
]);



/*
 * ###########################
 * Other
 * ---------------------------
 * page_links_1
 * page_links_2
 * page_links_3
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'page_links_1' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:page_links',
        'config' => [
            'type' => 'group',
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
            'allowed' => 'pages',
            'size' => 3,
            'maxitems' => 30,
            'minitems' => 0
        ]
    ],
]);




/*
 * #####################################################################
 * #####################################################################
 * TCA Palettes
 * =====================================================================
 * =====================================================================
 */

/*
 * ###########################
 * Header palettes
 * ---------------------------
 * header -> TYPO3 core header palette = layout + position + date + link
 * headers
 * header_only
 * header_position
 * header_layout
 * header_layout_position
 * header_layout_position_subheader
 * header_layout_position_link_subheader
 * ===========================
 */
// override TYPO3 "headers" palette config (frontend sys. ext.)
$GLOBALS['TCA']['tt_content']['palettes']['headers'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.headers',
    'showitem' => '
        header,
        --linebreak--,
        header_layout,
        header_style,
        header_position,
        date,
        --linebreak--,
        header_link,
        --linebreak--,
        subheader,
        subheader_style
    '
];

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



/*
 * ###########################
 * Header with line breaks palettes
 * ---------------------------
 * headertext_only
 * headertext_position
 * headertext_layout
 * headertext_layout_position
 * headertext_layout_position_subheadertext
 * headertext_layout_position_link_subheadertext
 * ===========================
 */
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



/*
 * ###########################
 * Bodytext palettes
 * ---------------------------
 * bodytext_position
 * ===========================
 */
// add new palette bodytext_position
$GLOBALS['TCA']['tt_content']['palettes']['bodytext_position'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:bodytext.palette',
    'showitem' => '
        bodytext,content_position
    '
];



/*
 * ###########################
 * Link palettes
 * ---------------------------
 * title_link_position
 * title_link
 * ===========================
 */
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



/*
 * ###########################
 * Button palettes
 * ---------------------------
 * button
 * ===========================
 */
// add new palette button
$GLOBALS['TCA']['tt_content']['palettes']['button'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button.palette',
    'showitem' => '
        link_as_button,
        --linebreak--,
        button_size,button_style,button_full_width,button_no_bg
    '
];



/*
 * ###########################
 * Media Adjustments palettes
 * ---------------------------
 * imagelinks
 * mediaAdjustments
 * gallerySettings
 * ===========================
 */
// override TYPO3 "imagelinks" palette config (frontend sys. ext.)
$GLOBALS['TCA']['tt_content']['palettes']['imagelinks'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.imagelinks',
    'showitem' => '
        image_zoom;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:image_zoom_formlabel,
        image_zoom_width
    '
];



// override TYPO3 "mediaAdjustments" palette config (frontend sys. ext.)
$GLOBALS['TCA']['tt_content']['palettes']['mediaAdjustments'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.palette.mediaAdjustments',
    'showitem' => '
        section_container_width
    '
];

// override TYPO3 "gallerySettings" palette config (frontend sys. ext.)
$GLOBALS['TCA']['tt_content']['palettes']['gallerySettings'] = [
    'label' => 'LLL:EXT:frontend/Resources/Private/Language/Database.xlf:tt_content.palette.gallerySettings',
    'showitem' => '
        imageorient,
        imagecols,
        textorient
    '
];



/*
 * ###########################
 * Icon palettes
 * ---------------------------
 * icon
 * ===========================
 */
// add icon palette
$GLOBALS['TCA']['tt_content']['palettes']['icon'] = [
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:icon.palette',
    'showitem' => '
        icon_source,
        --linebreak--,
        icon
    '
];



/*
 * ###########################
 * Appearance palettes
 * ---------------------------
 * frames
 * ===========================
 */
// override TYPO3 "frames" palette config (frontend sys. ext.)
$GLOBALS['TCA']['tt_content']['palettes']['frames'] = [
    'showitem' => '
        space_before_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:space_before_class_formlabel,
        space_after_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:space_after_class_formlabel,
        --linebreak--,
        layout;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:layout_formlabel,
        frame_class;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:frame_class_formlabel,
        --linebreak--,
        color_class,
        background_color_class
    '
];
