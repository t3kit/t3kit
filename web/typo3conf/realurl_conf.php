<?php

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['init'] = [
    'enableCHashCache' => '1',
    'appendMissingSlash' => 'ifNotFile',
    'enableUrlDecodeCache' => '1',
    'enableUrlEncodeCache' => '1'
];

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['pagePath'] = [
    'type' => 'user',
    'spaceCharacter' => '-',
    'languageGetVar' => 'L',
    'expireDays' => '90',
    // 'rootpage_id' => 1,
];

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['preVars']['language'] = [
    'GETvar' => 'L',
    'valueMap' => [
        'sv' => '1',
        'de' => '2',
    ],
    'noMatch' => 'bypass',
];


if (\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded('news')) {

    // news detail configuration
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article'] = [
        [
            'GETvar' => 'tx_news_pi1[action]',
            'noMatch' => 'bypass'
        ],
        [
            'GETvar' => 'tx_news_pi1[controller]',
            'noMatch' => 'bypass'
        ],
        [
            'GETvar' => 'tx_news_pi1[news]',
            'lookUpTable' => [
                'table' => 'tx_news_domain_model_news',
                'id_field' => 'uid',
                'alias_field' => 'IF(path_segment!="",path_segment,title)',
                'addWhereClause' => ' AND NOT deleted',
                'useUniqueCache' => 1,
                'useUniqueCache_conf' => [
                    'strtolower' => 1,
                    'spaceCharacter' => '-'
                ],
                'languageGetVar' => 'L',
                'languageExceptionUids' => '',
                'languageField' => 'sys_language_uid',
                'transOrigPointerField' => 'l10n_parent',
                'autoUpdate' => 1,
                'expireDays' => 180,
            ]
        ]
    ];

    // news categories configuration
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article_category'] = [
        [
            'GETvar' => 'tx_news_pi1[overwriteDemand][categories]',
            'lookUpTable' => [
                'table' => 'sys_category',
                'id_field' => 'uid',
                'alias_field' => 'title',
                'addWhereClause' => ' AND NOT deleted',
                'useUniqueCache' => 1,
                'useUniqueCache_conf' => [
                    'strtolower' => 1,
                    'spaceCharacter' => '-'
                ]
            ]
        ]
    ];

    // news tag configuration
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article_tag'] = [
        [
            'GETvar' => 'tx_news_pi1[overwriteDemand][tags]',
            'lookUpTable' => [
                'table' => 'tx_news_domain_model_tag',
                'id_field' => 'uid',
                'alias_field' => 'title',
                'addWhereClause' => ' AND NOT deleted',
                'useUniqueCache' => 1,
                'useUniqueCache_conf' => [
                    'strtolower' => 1,
                    'spaceCharacter' => '-'
                ]
            ]
        ]
    ];

    // news page configuration
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['page'] = [
        [
            'GETvar' => 'tx_news_pi1[@widget_0][currentPage]',
        ],
    ];

    // news date configuration
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article_date'] = [
        [
            'GETvar' => 'tx_news_pi1[overwriteDemand][year]'
        ],
        [
            'GETvar' => 'tx_news_pi1[overwriteDemand][month]',
        ]
    ];
}

// Fixed pages, dynamically created (shorter url)
$fixedPostVarsConfigurationUtility = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \T3kit\themeT3kit\Utility\FixedPostVarsConfigurationUtility::class
);
$fixedPostVarsFile = $fixedPostVarsConfigurationUtility->getSaveFilePath();
if (file_exists($fixedPostVarsFile)) {
    \TYPO3\CMS\Core\Utility\GeneralUtility::requireOnce($fixedPostVarsFile);
}

// cs_seo sitemap.xml and robots.txt
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['fileName']['index']['robots.txt']['keyValues']['type'] = 656;
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT']['fileName']['index']['sitemap.xml']['keyValues']['type'] = 655;

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl_404_multilingual'] = array(
    '_DEFAULT' => array(
         'errorPage' => '404/',
         'unauthorizedPage' => 'login/'
    ),
);
