<?php

defined('TYPO3') || die();

/*
 * ###########################
 * override existed TCA columns for sys_file_reference
 * ===========================
 */
// override "link" column config
$GLOBALS['TCA']['sys_file_reference']['columns']['link']  = array_replace_recursive(
    $GLOBALS['TCA']['sys_file_reference']['columns']['link'],
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
 * add new TCA columns for sys_file_reference
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'description_position' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:description_position',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:description_position.left',
                    'start'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:description_position.center',
                    'center'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:description_position.right',
                    'end'
                ]
            ],
            'default' => 'start',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'picture_width' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.100',
                    100
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.90',
                    90
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.80',
                    80
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.70',
                    70
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.60',
                    60
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.50',
                    50
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.40',
                    40
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.30',
                    30
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.20',
                    20
                ]
            ],
            'default' => 100,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'picture_border_radius' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.default',
                    ''
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.rounded',
                    'rounded'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.rounded_circle',
                    'rounded-circle'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.rounded_pill',
                    'rounded-pill'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.rounded_top',
                    'rounded-top'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.rounded_right',
                    'rounded-end'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.rounded_bottom',
                    'rounded-bottom'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.rounded_left',
                    'rounded-start'
                ]
            ],
            'default' => '',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'aspect_ratio' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:aspect_ratio',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:aspect_ratio.16-9',
                    '16x9'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:aspect_ratio.21-9',
                    '21x9'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:aspect_ratio.4-3',
                    '4x3'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:aspect_ratio.1-1',
                    '1x1'
                ]
            ],
            'default' => '16x9',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'svg_width' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:svg_width',
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


/*
 * ###########################
 * Palettes for sys_file_reference
 * ===========================
 */

$GLOBALS['TCA']['sys_file_reference']['palettes']['imageOverlayPalette'] = [
    'showitem' => '
        alternative,
        --linebreak--,description,description_position,
        --linebreak--,link,
        --linebreak--,crop
    '
];

$GLOBALS['TCA']['sys_file_reference']['palettes']['svgImageOverlayPalette'] = [
    'showitem' => '
        alternative,
        --linebreak--,description,description_position,
        --linebreak--,link,svg_width
    '
];


$GLOBALS['TCA']['sys_file_reference']['palettes']['advancedImageOverlayPalette'] = [
    'showitem' => '
        alternative,
        --linebreak--,description,description_position,
        --linebreak--,link,
        --linebreak--,crop,
        --linebreak--,picture_width,picture_border_radius
    '
];

$GLOBALS['TCA']['sys_file_reference']['palettes']['videoOverlayPalette'] = [
    'showitem' => '
        description,description_position,
        --linebreak--,autoplay,aspect_ratio,title
    '
];

$GLOBALS['TCA']['sys_file_reference']['palettes']['audioOverlayPalette'] = [
    'showitem' => '
        description,description_position,
        --linebreak--,autoplay
    '
];
