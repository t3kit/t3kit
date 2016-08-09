<?php

switch (\TYPO3\CMS\Core\Utility\GeneralUtility::getApplicationContext()) {
	case 'Development/Vagrant':
		// SetEnv TYPO3_CONTEXT Development/Vagrant
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = FALSE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30711;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 30709;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Vagrant :: t3kit :: TYPO3';
		// Set systemLogLevel to 0 to enable systemLog
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLogLevel'] = 0;
		// Will then appear in http://localhost:28778/ (logio)
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLog'] = 'error_log';
		// Will then appear in http://localhost:1080/ (mailcatcher) and http://localhost:28778/ (logio)
		// Page will load noticably slow when systemLog to "mail" is enabled and a lot of errors occurs.
		// $GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLog'] = 'mail,dummy@t3kit.com;error_log';

	break;
	case 'Development':
		// SetEnv TYPO3_CONTEXT Development
		// $GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = 'dbnamefor_dev';
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = FALSE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Development :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = TRUE;
	break;
	case 'Testing':
		// SetEnv TYPO3_CONTEXT Testing
		// $GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = 'dbnamefor_test';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Testing :: t3kit :: TYPO3';
	break;
	case 'Development/Demo':
		// SetEnv TYPO3_CONTEXT Development/Demo
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = FALSE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30711;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 30709;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Demo :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = 'demo_t3kit';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['username'] = 'demo_t3kit';
	break;
	case 'Development/DemoTestserver':
		// SetEnv TYPO3_CONTEXT Development/DemoTestserver
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = FALSE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30711;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 30709;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'DemoTestserver :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = 'demo_t3kit_tests';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['username'] = 'demo_t3kit_tests';
	break;
	case 'Development/TestingTestserver':
		// SetEnv TYPO3_CONTEXT Development/TestingTestserver
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = FALSE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30711;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 30709;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'TestingTestserver :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = 'test_t3kit_tests';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['username'] = 'test_t3kit_tests';
	break;
	case 'Development/t3kitTestserver':
		// SetEnv TYPO3_CONTEXT Development/t3kitTestserver
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'Testserver :: t3kit :: TYPO3';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = 't3kit_tests';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['username'] = 't3kit_tests';
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
        $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['dyncss']['enableDebugMode'] = FALSE;
    break;
}

?>
