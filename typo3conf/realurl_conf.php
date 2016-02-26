<?php

/*
$coreRealUrlConfiguration = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath('pxa_core') . "Configuration/RealUrl/realurl_conf.php";
if (file_exists($coreRealUrlConfiguration)) {
    require_once ($coreRealUrlConfiguration);
}
*/
$TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['init'] = array(
    'enableCHashCache' => '1',
    'appendMissingSlash' => 'ifNotFile',
    'enableUrlDecodeCache' => '1',
    'enableUrlEncodeCache' => '1'
);

$TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['pagePath'] = array(
    'type' => 'user',
    'userFunc' => 'EXT:realurl/class.tx_realurl_advanced.php:&tx_realurl_advanced->main',
    'spaceCharacter' => '-',
    'languageGetVar' => 'L',
    'expireDays' => '90',
    'rootpage_id' => 1,
    'encodeTitle_userProc' => 'T3kit\T3kitExtensionTools\Hooks\URLEncode->encodeTitle'
);

$TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['preVars']['language'] = array(
    'GETvar' => 'L',
    'valueMap' => array(
        'sv' => '1',
        'de' => '2',
        'ro' => '3',
        'ua' => '4',
    ),
    'noMatch' => 'bypass',
);


if (\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded('news')) {

    // news detail configuration
    $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article'] = array(
        array(
            'GETvar' => 'tx_news_pi1[action]',
            'noMatch' => 'bypass'
        ),
        array(
            'GETvar' => 'tx_news_pi1[controller]',
            'noMatch' => 'bypass'
        ),
        array(
            'GETvar' => 'tx_news_pi1[news]',
            'lookUpTable' => array(
                'table' => 'tx_news_domain_model_news',
                'id_field' => 'uid',
                'alias_field' => 'IF(path_segment!="",path_segment,title)',
                'addWhereClause' => ' AND NOT deleted',
                'useUniqueCache' => 1,
                'useUniqueCache_conf' => array(
                    'strtolower' => 1,
                    'spaceCharacter' => '-',
                    'encodeTitle_userProc' => 'T3kit\T3kitExtensionTools\Hooks\URLEncode->encodeTitle'
                ),
                'languageGetVar' => 'L',
                'languageExceptionUids' => '',
                'languageField' => 'sys_language_uid',
                'transOrigPointerField' => 'l10n_parent',
                'autoUpdate' => 1,
                'expireDays' => 180,
            )
        )
    );

    // news categories configuration
    $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article_category'] = array(
        array(
            'GETvar' => 'tx_news_pi1[overwriteDemand][categories]',
            'lookUpTable' => array(
                'table' => 'sys_category',
                'id_field' => 'uid',
                'alias_field' => 'title',
                'addWhereClause' => ' AND NOT deleted',
                'useUniqueCache' => 1,
                'useUniqueCache_conf' => array(
                    'strtolower' => 1,
                    'spaceCharacter' => '-',
                    'encodeTitle_userProc' => 'T3kit\T3kitExtensionTools\Hooks\URLEncode->encodeTitle'
                )
            )
        )
    );

    // news tag configuration
    $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article_tag'] = array(
        array(
            'GETvar' => 'tx_news_pi1[overwriteDemand][tags]',
            'lookUpTable' => array(
                'table' => 'tx_news_domain_model_tag',
                'id_field' => 'uid',
                'alias_field' => 'title',
                'addWhereClause' => ' AND NOT deleted',
                'useUniqueCache' => 1,
                'useUniqueCache_conf' => array(
                    'strtolower' => 1,
                    'spaceCharacter' => '-',
                    'encodeTitle_userProc' => 'T3kit\T3kitExtensionTools\Hooks\URLEncode->encodeTitle'
                )
            )
        )
    );

    // news page configuration
    $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['page'] = array(
        array(
            'GETvar' => 'tx_news_pi1[@widget_0][currentPage]',
        ),
    );

    // news date configuration
    $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article_date'] = array(
        array(
            'GETvar' => 'tx_news_pi1[controller]',
            'noMatch' => 'bypass',
        ),
        array(
            'GETvar' => 'tx_news_pi1[overwriteDemand][year]'
        ),
        array(
            'GETvar' => 'tx_news_pi1[overwriteDemand][month]',
        ),
        array(
            'GETvar' => 'tx_news_pi1[overwriteDemand][day]',
            'noMatch' => 'bypass',
        )
    );

    // Fixed pages, (shorter url)
    $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['fixedPostVars']['42'] = $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article'];
    $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['fixedPostVars']['66'] = $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article_date'];
    $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['fixedPostVars']['67'] = $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article_tag'];
    $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['fixedPostVars']['68'] = $TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['postVarSets']['_DEFAULT']['article_category'];
}
$TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT']['fileName']['index']['robots.txt']['keyValues']['type'] = 777;
?>
