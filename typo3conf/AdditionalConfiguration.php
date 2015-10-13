<?php

switch (\TYPO3\CMS\Core\Utility\GeneralUtility::getApplicationContext()) {
	case 'Development/Vagrant':
		// SetEnv TYPO3_CONTEXT Development/Vagrant
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = FALSE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'VAGRANT :: TYPOkit';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30711;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 30709;
	break;
	case 'Development':
		// SetEnv TYPO3_CONTEXT Development
		// $GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = 'dbnamefor_dev';
		$GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = TRUE;
		$GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = FALSE;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'DEV :: TYPOkit';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = 1;
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['clearCacheSystem'] = TRUE;
	break;
	case 'Testing':
		// SetEnv TYPO3_CONTEXT Testing
		// $GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = 'dbnamefor_test';
		$GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'TEST :: TYPOkit';
	break;
}

?>
