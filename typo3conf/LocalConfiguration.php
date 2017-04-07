<?php
return [
    'BE' => [
        'debug' => true,
        'explicitADmode' => 'explicitAllow',
        'installToolPassword' => '$pbkdf2-sha256$25000$VWvddMstBQNUc5PCZtfxFg$HduEyn4hcpIS5UV6T45OiHq3st5VHCMwmRrC/JH2/40',
        'loginSecurityLevel' => 'rsa',
    ],
    'DB' => [
        'Connections' => [
            'Default' => [
                'charset' => 'utf8',
                'dbname' => 't3kit',
                'driver' => 'mysqli',
                'host' => 'db',
                'password' => 't3kit1234',
                'port' => 3306,
                'user' => 't3kit',
            ],
        ],
    ],
    'EXT' => [
        'extConf' => [
            'backend' => 'a:5:{s:9:"loginLogo";s:0:"";s:19:"loginHighlightColor";s:7:"#288fb4";s:20:"loginBackgroundImage";s:0:"";s:11:"backendLogo";s:0:"";s:14:"backendFavicon";s:0:"";}',
            'dyncss' => 'a:2:{s:5:"state";s:0:"";s:15:"enableDebugMode";s:1:"0";}',
            'dyncss_less' => 'a:0:{}',
            'filemetadata' => 'a:0:{}',
            'go_maps_ext' => 'a:3:{s:15:"include_library";s:1:"0";s:16:"include_manually";s:1:"0";s:8:"footerJS";s:1:"1";}',
            'gridelements' => 'a:2:{s:20:"additionalStylesheet";s:0:"";s:19:"nestingInListModule";s:1:"0";}',
            'news' => 'a:14:{s:13:"prependAtCopy";s:1:"1";s:6:"tagPid";s:1:"1";s:12:"rteForTeaser";s:1:"0";s:22:"contentElementRelation";s:1:"0";s:13:"manualSorting";s:1:"0";s:19:"categoryRestriction";s:4:"none";s:34:"categoryBeGroupTceFormsRestriction";s:1:"0";s:19:"dateTimeNotRequired";s:1:"0";s:11:"archiveDate";s:4:"date";s:24:"showAdministrationModule";s:1:"1";s:35:"hidePageTreeForAdministrationModule";s:1:"0";s:12:"showImporter";s:1:"0";s:18:"storageUidImporter";s:1:"1";s:22:"resourceFolderImporter";s:12:"/news_import";}',
            'pxa_cookie_bar' => 'a:0:{}',
            'pxa_newsletter_subscription' => 'a:0:{}',
            'realurl' => 'a:5:{s:10:"configFile";s:26:"typo3conf/realurl_conf.php";s:14:"enableAutoConf";s:1:"1";s:14:"autoConfFormat";s:1:"0";s:12:"enableDevLog";s:1:"0";s:10:"moduleIcon";s:1:"0";}',
            'rsaauth' => 'a:1:{s:18:"temporaryDirectory";s:0:"";}',
            'saltedpasswords' => 'a:2:{s:3:"BE.";a:4:{s:21:"saltedPWHashingMethod";s:41:"TYPO3\\CMS\\Saltedpasswords\\Salt\\Pbkdf2Salt";s:11:"forceSalted";i:0;s:15:"onlyAuthService";i:0;s:12:"updatePasswd";i:1;}s:3:"FE.";a:5:{s:7:"enabled";i:1;s:21:"saltedPWHashingMethod";s:41:"TYPO3\\CMS\\Saltedpasswords\\Salt\\Pbkdf2Salt";s:11:"forceSalted";i:0;s:15:"onlyAuthService";i:0;s:12:"updatePasswd";i:1;}}',
            'seo_basics' => 'a:1:{s:10:"xmlSitemap";s:1:"1";}',
            'solr' => 'a:4:{s:35:"useConfigurationFromClosestTemplate";s:1:"0";s:43:"useConfigurationTrackRecordsOutsideSiteroot";s:1:"1";s:29:"useConfigurationMonitorTables";s:0:"";s:27:"allowSelfSignedCertificates";s:1:"0";}',
            'static_info_tables' => 'a:1:{s:13:"enableManager";s:1:"0";}',
            't3kit_extension_tools' => 'a:3:{s:20:"additionalCharacters";s:0:"";s:31:"fixedPostVarsConfigurationfFile";s:91:"typo3conf/ext/t3kit_extension_tools/Configuration/Realurl/predefined_fixedPostVars_conf.php";s:25:"fixedPostVarsSaveFilePath";s:40:"typo3conf/realurl_fixedPostVars_conf.php";}',
            'theme_t3kit' => 'a:0:{}',
            'themes' => 'a:2:{s:16:"categoriesToShow";s:118:"theme,languages,socialmedia,forms,extension,bootstrap,colors,font,meta,metaDefaults,pages,container,menu,header,footer";s:15:"constantsToHide";s:36:"dateFormat,timeFormat,dateTimeFormat";}',
        ],
    ],
    'EXTCONF' => [
        'lang' => [
            'availableLanguages' => [],
        ],
    ],
    'FE' => [
        'debug' => true,
        'loginSecurityLevel' => 'rsa',
    ],
    'GFX' => [
        'jpg_quality' => '80',
        'processor' => 'GraphicsMagick',
        'processor_allowTemporaryMasksAsPng' => false,
        'processor_colorspace' => 'RGB',
        'processor_effects' => -1,
        'processor_enabled' => true,
        'processor_path' => '/usr/bin/',
        'processor_path_lzw' => '/usr/bin/',
    ],
    'MAIL' => [
        'transport' => 'sendmail',
        'transport_sendmail_command' => '/usr/sbin/sendmail -t -i ',
        'transport_smtp_encrypt' => '',
        'transport_smtp_password' => '',
        'transport_smtp_server' => '',
        'transport_smtp_username' => '',
    ],
    'SYS' => [
        'caching' => [
            'cacheConfigurations' => [
                'extbase_object' => [
                    'backend' => 'TYPO3\\CMS\\Core\\Cache\\Backend\\Typo3DatabaseBackend',
                    'frontend' => 'TYPO3\\CMS\\Core\\Cache\\Frontend\\VariableFrontend',
                    'groups' => [
                        'system',
                    ],
                    'options' => [
                        'defaultLifetime' => 0,
                    ],
                ],
            ],
        ],
        'devIPmask' => '*',
        'displayErrors' => 1,
        'enableDeprecationLog' => 'file',
        'encryptionKey' => '08034aff2437e4465b9cad897321c4da03cd2568197d23ab6a0a815837e793a2141f19d11f2e8a2a241b08e328c873db',
        'exceptionalErrors' => 28674,
        'isInitialDatabaseImportDone' => true,
        'isInitialInstallationInProgress' => false,
        'sitename' => 'Docker :: t3kit :: TYPO3',
        'sqlDebug' => 1,
        'systemLogLevel' => 0,
    ],
];
