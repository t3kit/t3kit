<?php

defined('TYPO3_MODE') || die();

/*
 * ###########################
 * Add Content Element to Type list
 * ===========================
 */
// all "items" have four parts (fourth being optional)
// 0 => label
// 1 => value
// 2 => icon
// 3 => groupID
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.CType',
        'siteHeader',
        'ce-siteHeader',
        'special'
    ]
);


/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['siteHeader'] = 'ce-siteHeader';


/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['siteHeader'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            header;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header.ALT.html_formlabel,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.tabs.settings,
            --palette--;;headerTop,
            --palette--;;headerMiddle,
            --palette--;;mainNavigation,
            --palette--;;accessibility,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.logo,
        image,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
            --palette--;;frames,
            --palette--;;appearanceLinks,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,
            --palette--;;language,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
            --palette--;;hidden,
            --palette--;;access,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:categories,
            categories,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:notes,
            rowDescription,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:extended,
    '
];


/*
 * ###########################
 * Add new palettes for a Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['palettes']['accessibility'] = array(
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.palette.accessibility',
    'showitem' => '
        skipLinks_mainNavigation, skipLinks_mainContent, --linebreak--,
    ',
);

$GLOBALS['TCA']['tt_content']['palettes']['headerTop'] = array(
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.palette.headerTop',
    'showitem' => '
        headerTop, --linebreak--,
        headerTopContacts, --linebreak--,
        phone_link, phone_text, --linebreak--,
        phone_title, phone_icon, phone_show_title, --linebreak--,
        email_address, email_title, email_icon, email_show_title, --linebreak--,
        headerTopNavigation, --linebreak--,
        headerTopLangMenu, --linebreak--,
        headerTopSearch,
        ',
    );

$GLOBALS['TCA']['tt_content']['palettes']['headerMiddle'] = array(
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.palette.headerMiddle',
    'showitem' => '
        headerMiddle, --linebreak--,
        headerMiddleLogo, headerMiddleLangMenu, headerMiddleSearch, --linebreak--,
',
);

$GLOBALS['TCA']['tt_content']['palettes']['mainNavigation'] = array(
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.palette.mainNavigation',
    'showitem' => '
        mainNavigation, --linebreak--,
        mainNavigationLogo, mainNavigationLangMenu, mainNavigationSearch, --linebreak--,
    ',
  );


/*
 * ###########################
 * Add new columns/fields for a Content Element
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'headerTop' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.showHeaderTop',
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
    'mainNavigationLogo' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.logo',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'mainNavigationLangMenu' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.language',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'mainNavigationSearch' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.search',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'headerMiddle' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.showHeaderMiddle',
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
    'headerMiddleLogo' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.logo',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'headerMiddleLangMenu' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.language',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'headerMiddleSearch' => [
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.search',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ]
    ],
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'headerTopContacts' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.headerTopContacts',
        'displayCond' => 'FIELD:headerTop:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ],
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'headerTopLangMenu' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.headerTopLangMenu',
        'displayCond' => 'FIELD:headerTop:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'headerTopSearch' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.headerTopSearch',
        'displayCond' => 'FIELD:headerTop:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'headerTopNavigation' => [
        'exclude' => true,
        'label' =>
        'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.headerTopNavigation',
        'displayCond' => 'FIELD:headerTop:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'email_address' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.email_address',
        'displayCond' => [
            'AND' => [
                'FIELD:headerTop:!=:0',
                'FIELD:headerTopContacts:!=:0',
            ],
        ],
        'config' => [
            'type' => 'input',
            'renderType' => 'inputLink',
            'fieldControl' => [
                'linkPopup' => [
                    'options' => [
                        'blindLinkOptions' => 'page, file, folder, url',
                    ],
                ],
            ],
            'size' => 50,
            'max' => 255,
            'eval' => 'trim,email',
            'softref' => 'email'
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'email_title' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.email_title',
        'displayCond' => [
            'AND' => [
                'FIELD:headerTop:!=:0',
                'FIELD:headerTopContacts:!=:0',
            ],
        ],
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255,
            'eval' => 'required,trim',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'email_icon' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.email_icon',
        'displayCond' => [
            'AND' => [
                'FIELD:headerTop:!=:0',
                'FIELD:headerTopContacts:!=:0',
            ],
        ],
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'email_show_title' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.email_show_title',
        'displayCond' => [
            'AND' => [
                'FIELD:headerTop:!=:0',
                'FIELD:headerTopContacts:!=:0',
            ],
        ],
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'phone_link' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.phone_link',
        'displayCond' => [
            'AND' => [
                'FIELD:headerTop:!=:0',
                'FIELD:headerTopContacts:!=:0',
            ],
        ],
        'config' => [
            'type' => 'input',
            'renderType' => 'inputLink',
            'fieldControl' => [
                'linkPopup' => [
                    'options' => [
                        'blindLinkOptions' => 'page, file, folder, mail, url',
                    ],
                ],
            ],
            'size' => 50,
            'max' => 255,
            'eval' => 'trim',
            'softref' => 'typolink'
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'phone_text' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.phone_text',
        'displayCond' => [
            'AND' => [
                'FIELD:headerTop:!=:0',
                'FIELD:headerTopContacts:!=:0',
            ],
        ],
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 50,
            'eval' => 'trim',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'phone_title' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.phone_title',
        'displayCond' => [
            'AND' => [
                'FIELD:headerTop:!=:0',
                'FIELD:headerTopContacts:!=:0',
            ],
        ],
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255,
            'eval' => 'required,trim',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'phone_icon' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.phone_icon',
        'displayCond' => [
            'AND' => [
                'FIELD:headerTop:!=:0',
                'FIELD:headerTopContacts:!=:0',
            ],
        ],
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'phone_show_title' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.phone_show_title',
        'displayCond' => [
            'AND' => [
                'FIELD:headerTop:!=:0',
                'FIELD:headerTopContacts:!=:0',
            ],
        ],
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'skipLinks_mainNavigation' => [
        'exclude' => true,
        'label' =>
        'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.skipLinks_mainNavigation',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255,
            'eval' => 'trim',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'skipLinks_mainContent' => [
        'exclude' => true,
        'label' =>
        'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteHeader.skipLinks_mainContent',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 255,
            'eval' => 'trim',
        ]
    ],
]);


/*
 * ###########################
 * Add flexForms for Content Element
 * ===========================
 */
// \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
//     '*',
//     'FILE:EXT:t3kit/Configuration/FlexForms/name.xml',
//     'name'
// );
