<?php
defined('TYPO3_MODE') || die();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'description_align' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:description_align',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:description_align.left',
                    'left'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:description_align.center',
                    'center'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:description_align.right',
                    'right'
                ]
            ],
            'default' => 'left',
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
                    '100'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.90',
                    '90'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.80',
                    '80'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.70',
                    '70'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.60',
                    '60'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.50',
                    '50'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.40',
                    '40'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.30',
                    '30'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_width.20',
                    '20'
                ]
            ],
            'default' => '100',
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
                    'rounded-right'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.rounded_bottom',
                    'rounded-bottom'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:picture_border_radius.rounded_left',
                    'rounded-left'
                ]
            ],
            'default' => '',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'img_thumbnail' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:img_thumbnail',
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
                    '16by9'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:aspect_ratio.21-9',
                    '21by9'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:aspect_ratio.4-3',
                    '4by3'
                ],
                [
                    'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:aspect_ratio.1-1',
                    '1by1'
                ]
            ],
            'default' => '16by9',
        ]
    ],
]);

$GLOBALS['TCA']['sys_file_reference']['palettes']['imageoverlayPalette'] = [
    'showitem' => '
        alternative,title,
        --linebreak--,description,description_align,
        --linebreak--,link,
        --linebreak--,crop,
        --linebreak--,picture_width,picture_border_radius,img_thumbnail
    '
];

$GLOBALS['TCA']['sys_file_reference']['palettes']['videoOverlayPalette'] = [
    'showitem' => '
        title,description,description_align,
        --linebreak--,autoplay,aspect_ratio
    '
];

$GLOBALS['TCA']['sys_file_reference']['palettes']['audioOverlayPalette'] = [
    'showitem' => '
        title,description,description_align,
        --linebreak--,autoplay
    '
];
