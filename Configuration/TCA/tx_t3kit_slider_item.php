<?php

return [
    'ctrl' => [
        'label' => 'header_text',
        'sortby' => 'sorting',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'cruser_id' => 'cruser_id',
        'title' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_slider.xlf:slider.item',
        'delete' => 'deleted',
        'versioningWS' => true,
        'origUid' => 't3_origuid',
        'hideAtCopy' => true,
        'prependAtCopy' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.prependAtCopy',
        'transOrigPointerField' => 'l18n_parent',
        'transOrigDiffSourceField' => 'l18n_diffsource',
        'languageField' => 'sys_language_uid',
        'enablecolumns' => [
            'disabled' => 'hidden',
            'starttime' => 'starttime',
            'endtime' => 'endtime',
        ],
        'typeicon_classes' => [
            'default' => 'ce-image-slider'
        ]
    ],
    'interface' => [
        'showRecordFieldList' => '
            hidden,
            tt_content
        ',
    ],
    'types' => [
        '1' => [
            'showitem' => '
            --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
                --palette--;;general,
                --palette--;;headertext_layout_position_link_subheadertext,
                --palette--;;bodytext_position,
                --palette--;;title_link_position,
                --palette--;;button,
            --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.images,
                picture,
                image_overlay,
            --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
                --palette--;;hidden,
                --palette--;;access,
                --palette--;;hiddenLanguagePalette,
            '
        ],
    ],
    'palettes' => [
        '1' => [
            'showitem' => ''
        ],
        'general' => [
            'showitem' => '
                tt_content,
                item_type;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType_formlabel,
            '
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
        // hidden but needs to be included all the time, so sys_language_uid is set correctly
        'hiddenLanguagePalette' => [
            'showitem' => 'sys_language_uid, l18n_parent',
            'isHiddenPalette' => true,
        ],

        'headertext_layout_position_link_subheadertext' => [
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
        ],
        'bodytext_position' => [
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:bodytext.palette',
            'showitem' => '
                bodytext,content_position
            '
        ],
        'title_link_position' => [
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link.palette',
            'showitem' => '
                link_title,link,link_position,
                --linebreak--,
                accessible_link_label
            '
        ],
        'button' => [
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:button.palette',
            'showitem' => '
                link_as_button,
                --linebreak--,
                button_size,button_style,button_full_width,button_no_bg
            '
        ],
    ],
    'columns' => [
        'tt_content' => [
            'exclude' => true,
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_slider.xlf:slider.title',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'foreign_table' => 'tt_content',
                'foreign_table_where' => 'AND tt_content.pid=###CURRENT_PID### AND tt_content.CType="slider"',
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
                'foreign_table' => 'sys_language',
                'foreign_table_where' => 'ORDER BY sys_language.title',
                'items' => [
                    [
                        'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.allLanguages',
                        -1
                    ],
                    [
                        'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.default_value',
                        0
                    ]
                ],
                'allowNonIdValues' => true,
            ]
        ],
        'l18n_parent' => [
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
                'foreign_table' => 'tx_t3kit_slider_item',
                'foreign_table_where' => 'AND tx_t3kit_slider_item.pid=###CURRENT_PID### AND tx_t3kit_slider_item.sys_language_uid IN (-1,0)',
                'default' => 0
            ]
        ],
        'l18n_diffsource' => [
            'config' => [
                'type' => 'passthrough',
                'default' => ''
            ]
        ],

        'header_text' => [
            'exclude' => true,
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header',
            'config' => [
                'type' => 'text',
                'cols' => 80,
                'rows' => 5
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
                    ],
                    [
                        'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_layout.I.6',
                        '100'
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
        ],
        'header_link' => [
            'exclude' => true,
            'label' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_link',
            'config' => [
                'type' => 'input',
                'renderType' => 'inputLink',
                'size' => 50,
                'max' => 1024,
                'eval' => 'trim',
                'fieldControl' => [
                    'linkPopup' => [
                        'options' => [
                            'title' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_link_formlabel',
                        ],
                    ],
                ],
                'softref' => 'typolink'
            ]
        ],
        'subheader_text' => [
            'exclude' => true,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.subheader',
            'config' => [
                'type' => 'text',
                'cols' => 80,
                'rows' => 5
            ]
        ],
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
        'bodytext' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.text',
            'l10n_mode' => 'prefixLangTitle',
            'config' => [
                'type' => 'text',
                'cols' => 80,
                'rows' => 5,
                'softref' => 'typolink_tag,images,email[subst],url',
                'enableRichtext' => false
            ],
        ],
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
        'link_title' => [
            'exclude' => true,
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:link_title',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'max' => 255
            ]
        ],
        'accessible_link_label' => [
            'exclude' => true,
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:accessible_link_label',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'max' => 255
            ]
        ],
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
        'image_overlay' => [
            'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_slider.xlf:slider.overlay',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_slider.xlf:slider.overlay_disable',
                        '0'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_slider.xlf:slider.overlay_primary',
                        'overlay-primary'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_slider.xlf:slider.overlay_secondary',
                        'overlay-secondary'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_slider.xlf:slider.overlay_dark',
                        'overlay-dark'
                    ],
                    [
                        'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Dynamic/locallang_slider.xlf:slider.overlay_light',
                        'overlay-light'
                    ]
                ],
                'default' => '0',
            ]
        ]
    ]
];
