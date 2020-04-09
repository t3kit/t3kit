<?php
defined('TYPO3_MODE') || die();


/*
 * ###########################
 * Add Content Element to Type list
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.CType',
        'siteFooter',
        'ce-siteFooter'
    ],
    'html',
    'after'
);


/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['siteFooter'] = 'ce-siteFooter';


/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['siteFooter'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            footer;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:footer.ALT.div_formlabel,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.tabs.settings,
            --palette--;;footerTop,
            --palette--;;footerMiddle,
            --palette--;;footerBottom,
        --div--;LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.logo,
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


$GLOBALS['TCA']['tt_content']['palettes']['footerTop'] = array(
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.palette.footerTop',
    'showitem' => '
        footerTop, --linebreak--,
        phone_title, phone_icon, phone_show_title, --linebreak--,
        email_address, email_title, email_icon, email_show_title, --linebreak--,
        footerTopNavigation, --linebreak--,
        footerTopLangMenu, --linebreak--,
        ',
    );

$GLOBALS['TCA']['tt_content']['palettes']['footerMiddle'] = array(
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.palette.footerMiddle',
    'showitem' => '
        footerMiddle, --linebreak--,
        footerMiddleFirstHeader, footerMiddleFirstLogo, --linebreak--,
        footerMiddleFirstText, --linebreak--,
        footerMiddleSecondHeader, footerMiddleThirdHeader, --linebreak--,
        footerMiddleSecondLinks, footerMiddleThirdLinks, --linebreak--,
        footerMiddleFourthHeader, footerMiddleFourthForm, --linebreak--,
    ',
);

$GLOBALS['TCA']['tt_content']['palettes']['footerBottom'] = array(
    'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.palette.footerBottom',
    'showitem' => '
      footerBottom, --linebreak--,
      footerBottomCopyright, --linebreak--,
      footerBottomLinks, --linebreak--,
',
);




/*
 * ###########################
 * Add new columns/fields for a Content Element
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerTop' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.showFooterTop',
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
    'footerMiddle' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.showFooterMiddle',
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
    'footerBottom' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.showFooterBottom',
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
    'footerMiddleFirstHeader' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.middleFirstHeader',
        'displayCond' => 'FIELD:footerMiddle:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 50,
            'eval' => 'trim',
        ]
    ],
]);


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerMiddleFirstLogo' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.middleFirstLogo',
        'displayCond' => 'FIELD:footerMiddle:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerMiddleFirstText' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.middleFirstText',
        'displayCond' => 'FIELD:footerMiddle:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'text',
            'enableRichtext' => true,
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerMiddleSecondHeader' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.middleSecondHeader',
        'displayCond' => 'FIELD:footerMiddle:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 50,
            'eval' => 'trim',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerMiddleSecondLinks' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.middleSecondLinks',
        'displayCond' => 'FIELD:footerMiddle:!=:0',
        'config' => [
            'type' => 'group',
            'internal_type' => 'db',
            'allowed' => 'pages',
            'size' => 3,
            'maxitems' => 50,
            'minitems' => 0
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerMiddleThirdHeader' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.middleThirdHeader',
        'displayCond' => 'FIELD:footerMiddle:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 50,
            'eval' => 'trim',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerMiddleThirdLinks' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.middleThirdLinks',
        'displayCond' => 'FIELD:footerMiddle:!=:0',
        'config' => [
            'type' => 'group',
            'internal_type' => 'db',
            'allowed' => 'pages',
            'size' => 3,
            'maxitems' => 50,
            'minitems' => 0
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerMiddleFourthHeader' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.middleFourthHeader',
        'displayCond' => 'FIELD:footerMiddle:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 50,
            'eval' => 'trim',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerMiddleFourthForm' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.middleFourthForm',
        'displayCond' => 'FIELD:footerMiddle:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerBottomCopyright' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.bottomCopyright',
        'displayCond' => 'FIELD:footerBottom:!=:0',
        'onChange' => 'reload',
        'config' => [
            'type' => 'input',
            'size' => 50,
            'max' => 50,
            'eval' => 'trim',
        ]
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'footerBottomLinks' => [
        'exclude' => true,
        'label' => 'LLL:EXT:t3kit/Resources/Private/Language/locallang_BE_CE_special.xlf:siteFooter.bottomLinks',
        'displayCond' => 'FIELD:footerBottom:!=:0',
        'config' => [
            'type' => 'group',
            'internal_type' => 'db',
            'allowed' => 'pages',
            'size' => 3,
            'maxitems' => 50,
            'minitems' => 0
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
