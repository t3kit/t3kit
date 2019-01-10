<?php

switch (\TYPO3\CMS\Core\Utility\GeneralUtility::getApplicationContext()) {
	case 'Development/Docker':
		// SetEnv TYPO3_CONTEXT Development
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['host'] = getenv('DB_CONTAINER_NAME');
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['dbname'] = getenv('DB_NAME');
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['user'] = getenv('DB_USER');
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['password'] = getenv('DB_PASSWORD');
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = true;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = false;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Docker :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = true;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['trustedHostsPattern'] = '.*';
		$GLOBALS['TYPO3_CONF_VARS']['MAIL']['transport'] = 'smtp';
		$GLOBALS['TYPO3_CONF_VARS']['MAIL']['transport_smtp_server'] = getenv('MAILHOG_CONTAINER_NAME') . ':1025';
        // $GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLogLevel'] = 0;
        // $GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 28674;
		// Page will load noticably slow when systemLog to "mail" is enabled and a lot of errors occurs.
		// $GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLog'] = 'mail,dummy@t3kit.com;';
	break;
	case 'Development':
		// SetEnv TYPO3_CONTEXT Development
		// $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['dbname'] = 'dbnamefor_dev';
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = true;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = false;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Development :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = true;
	break;
	case 'Testing':
		// SetEnv TYPO3_CONTEXT Testing
		// $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['dbname'] = 'dbnamefor_test';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Testing :: t3kit :: TYPO3';
	break;
	case 'Development/Demo':
		// SetEnv TYPO3_CONTEXT Development/Demo
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = true;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = false;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = true;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30711;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 30709;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Demo :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['dbname'] = 'demo_t3kit';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['user'] = 'demo_t3kit';
	break;
	case 'Development/DemoTestserver':
		// SetEnv TYPO3_CONTEXT Development/DemoTestserver
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = true;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = false;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = true;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30711;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 30709;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'DemoTestserver :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['dbname'] = 'demo_t3kit_tests';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['user'] = 'demo_t3kit_tests';
	break;
	case 'Development/TestingTestserver':
		// SetEnv TYPO3_CONTEXT Development/TestingTestserver
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = true;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = false;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = true;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30711;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 30709;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'TestingTestserver :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['dbname'] = 'test_t3kit_tests';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['user'] = 'test_t3kit_tests';
	break;
	case 'Development/t3kitTestserver':
		// SetEnv TYPO3_CONTEXT Development/t3kitTestserver
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Testserver :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['dbname'] = 't3kit_tests';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['user'] = 't3kit_tests';
	break;
    case 'Production':
        // SetEnv TYPO3_CONTEXT Production
        $GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = 0;
        $GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = 0;
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 0;
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['enableDeprecationLog'] = '';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 0;
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = 0;
        $GLOBALS['TYPO3_CONF_VARS']['FE']['disableNoCacheParameter'] = 1;
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30466; // Default = 30466
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 20480; // Default = 20480
        // Allow errors to be logged to systemLog if enabled.
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['syslogErrorReporting'] = 30711; // Default = 30711
        // Prevent some "simple" errors to be logged to sys_log
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['belogErrorReporting'] = 4437; // Default = 30711
        // Disable debug mode for dyncss
        if (isset($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['dyncss'])) {
            $dynCssConfiguration = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['dyncss']);
            $dynCssConfiguration['enableDebugMode'] = false;
            $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['dyncss'] = $dynCssConfiguration;
        }
    break;
}
