<?php
defined('TYPO3_MODE') || die();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'description_align' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:description_align',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'text-left',
                    'text-left'
                ],
                [
                    'text-center',
                    'text-center'
                ],
                [
                    'text-right',
                    'text-right'
                ],
                [
                    'text-justify',
                    'text-justify'
                ],
            ],
            'default' => 'text-left',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'picture_width' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:picture_width',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    '100% of content element',
                    '100'
                ],
                [
                    '90% of content element',
                    '90'
                ],
                [
                    '80% of content element',
                    '80'
                ],
                [
                    '70% of content element',
                    '70'
                ],
                [
                    '60% of content element',
                    '60'
                ],
                [
                    '50% of content element',
                    '50'
                ],
                [
                    '40% of content element',
                    '40'
                ],
                [
                    '30% of content element',
                    '30'
                ],
                [
                    '20% of content element',
                    '20'
                ]
            ],
            'default' => '100',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'picture_border_radius' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:picture_border_radius',
        'exclude' => true,
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'Default',
                    ''
                ],
                [
                    'rounded',
                    'rounded'
                ],
                [
                    'rounded-circle',
                    'rounded-circle'
                ],
                [
                    'rounded-pill',
                    'rounded-pill'
                ],
                [
                    'rounded-top',
                    'rounded-top'
                ],
                [
                    'rounded-right',
                    'rounded-right'
                ],
                [
                    'rounded-bottom',
                    'rounded-bottom'
                ],
                [
                    'rounded-left',
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
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE.xlf:img_thumbnail',
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

$GLOBALS['TCA']['sys_file_reference']['palettes']['imageoverlayPalette'] = [
    'showitem' => '
        alternative,title,
        --linebreak--,description,description_align,
        --linebreak--,link,
        --linebreak--,crop,
        --linebreak--,picture_width,picture_border_radius,img_thumbnail
    '
];
