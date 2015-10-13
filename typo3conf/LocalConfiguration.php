<?php
return array(
	'BE' => array(
		'debug' => FALSE,
		'explicitADmode' => 'explicitAllow',
		'installToolPassword' => '$P$CoQoJHDiVRLGjuMQpOeAdPa6Vwag4o0',
		'loginSecurityLevel' => 'rsa',
		'versionNumberInFilename' => '0',
	),
	'DB' => array(
		'database' => 'typokit',
		'host' => 'localhost',
		'password' => 'typokit1234',
		'socket' => '',
		'username' => 'typokit',
	),
	'EXT' => array(
		'extConf' => array(
			'dyncss' => 'a:2:{s:5:"state";s:0:"";s:15:"enableDebugMode";s:0:"";}',
			'dyncss_less' => 'a:0:{}',
			'extension_tools' => 'a:0:{}',
			'news' => 'a:17:{s:29:"removeListActionFromFlexforms";s:1:"2";s:20:"pageModuleFieldsNews";s:317:"LLL:EXT:news/Resources/Private/Language/locallang_be.xlf:pagemodule_simple=title,datetime;LLL:EXT:news/Resources/Private/Language/locallang_be.xlf:pagemodule_advanced=title,datetime,teaser,categories;LLL:EXT:news/Resources/Private/Language/locallang_be.xlf:pagemodule_complex=title,datetime,teaser,categories,archive;";s:24:"pageModuleFieldsCategory";s:17:"title,description";s:11:"archiveDate";s:4:"date";s:13:"prependAtCopy";s:1:"1";s:6:"tagPid";s:1:"1";s:25:"showMediaDescriptionField";s:1:"0";s:12:"rteForTeaser";s:1:"0";s:22:"contentElementRelation";s:1:"0";s:13:"manualSorting";s:1:"0";s:19:"categoryRestriction";s:0:"";s:34:"categoryBeGroupTceFormsRestriction";s:1:"0";s:6:"useFal";s:1:"1";s:12:"showImporter";s:1:"0";s:18:"storageUidImporter";s:1:"1";s:22:"resourceFolderImporter";s:12:"/news_import";s:24:"showAdministrationModule";s:1:"1";}',
			'rsaauth' => 'a:1:{s:18:"temporaryDirectory";s:0:"";}',
			'saltedpasswords' => 'a:2:{s:3:"BE.";a:4:{s:21:"saltedPWHashingMethod";s:41:"TYPO3\\CMS\\Saltedpasswords\\Salt\\PhpassSalt";s:11:"forceSalted";i:0;s:15:"onlyAuthService";i:0;s:12:"updatePasswd";i:1;}s:3:"FE.";a:5:{s:7:"enabled";i:1;s:21:"saltedPWHashingMethod";s:41:"TYPO3\\CMS\\Saltedpasswords\\Salt\\PhpassSalt";s:11:"forceSalted";i:0;s:15:"onlyAuthService";i:0;s:12:"updatePasswd";i:1;}}',
			'static_info_tables' => 'a:2:{s:13:"enableManager";s:1:"0";s:5:"dummy";s:1:"0";}',
			'theme_core' => 'a:0:{}',
			'themes' => 'a:3:{s:17:"themesIndependent";s:1:"1";s:16:"categoriesToShow";s:230:"theme,languages,colors,container,pages,footer,header,menu,meta,font,socialmedia,forms,extension,bootstrap,theme,siteConstants,site colors,site layout,colors,languages,font,meta,metaDefaults,pages,container,menu,header,footer,forms";s:15:"constantsToHide";s:36:"dateFormat,timeFormat,dateTimeFormat";}',
			'yaml_parser' => 'a:0:{}',
		),
	),
	'FE' => array(
		'debug' => FALSE,
		'loginSecurityLevel' => 'rsa',
	),
	'GFX' => array(
		'colorspace' => 'RGB',
		'im' => 1,
		'im_mask_temp_ext_gif' => 1,
		'im_path' => '/usr/bin/',
		'im_path_lzw' => '/usr/bin/',
		'im_v5effects' => -1,
		'im_version_5' => 'gm',
		'image_processing' => 1,
		'jpg_quality' => '80',
	),
	'INSTALL' => array(
		'wizardDone' => array(
			'TYPO3\CMS\Install\Updates\BackendUserStartModuleUpdate' => 1,
			'TYPO3\CMS\Install\Updates\FileListIsStartModuleUpdate' => 1,
			'TYPO3\CMS\Install\Updates\FilesReplacePermissionUpdate' => 1,
			'TYPO3\CMS\Install\Updates\LanguageIsoCodeUpdate' => 1,
			'TYPO3\CMS\Install\Updates\MigrateShortcutUrlsAgainUpdate' => 1,
			'TYPO3\CMS\Install\Updates\PageShortcutParentUpdate' => 1,
			'TYPO3\CMS\Install\Updates\ProcessedFileChecksumUpdate' => 1,
			'TYPO3\CMS\Install\Updates\TableFlexFormToTtContentFieldsUpdate' => 1,
			'TYPO3\CMS\Rtehtmlarea\Hook\Install\DeprecatedRteProperties' => 1,
			'TYPO3\CMS\Rtehtmlarea\Hook\Install\RteAcronymButtonRenamedToAbbreviation' => 1,
		),
	),
	'MAIL' => array(
		'transport_sendmail_command' => '/usr/bin/env catchmail -f test@local.dev',
	),
	'SYS' => array(
		'UTF8filesystem' => '1',
		'caching' => array(
			'cacheConfigurations' => array(
				'extbase_object' => array(
					'backend' => 'TYPO3\\CMS\\Core\\Cache\\Backend\\Typo3DatabaseBackend',
					'frontend' => 'TYPO3\\CMS\\Core\\Cache\\Frontend\\VariableFrontend',
					'groups' => array(
						'system',
					),
					'options' => array(
						'defaultLifetime' => 0,
					),
				),
			),
		),
		'clearCacheSystem' => FALSE,
		'devIPmask' => '',
		'displayErrors' => 0,
		'enableDeprecationLog' => FALSE,
		'encryptionKey' => '710ba8e4edb2782cda0df7721fac87fd326b96300a24e6899c50e66021eb63bcfb344ace69cca30a4a2096ecdc0bd395',
		'exceptionalErrors' => 28674,
		'isInitialDatabaseImportDone' => TRUE,
		'isInitialInstallationInProgress' => FALSE,
		'sitename' => 'TYPO3 TYPOkit',
		'sqlDebug' => 0,
		'systemLocale' => 'sv_SE.UTF-8',
		'systemLogLevel' => 2,
		't3lib_cs_convMethod' => 'mbstring',
		't3lib_cs_utils' => 'mbstring',
	),
);
?>