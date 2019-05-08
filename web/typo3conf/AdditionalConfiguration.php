<?php

switch (\TYPO3\CMS\Core\Utility\GeneralUtility::getApplicationContext()) {

    case 'Development/Docker': // =========================================================================
        // SetEnv TYPO3_CONTEXT Development/Docker
        // DB
        $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['host'] = getenv('DB_CONTAINER_NAME');
        $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['dbname'] = getenv('DB_NAME');
        $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['user'] = getenv('DB_USER');
        $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['password'] = getenv('DB_PASSWORD');

        // BE
        $GLOBALS['TYPO3_CONF_VARS']['BE']['sessionTimeout'] = 28800;
        $GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = true;

        // FE
        $GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = false;

        // MAIL
        $GLOBALS['TYPO3_CONF_VARS']['MAIL']['transport'] = 'smtp';
        $GLOBALS['TYPO3_CONF_VARS']['MAIL']['transport_smtp_server'] = getenv('MAILHOG_CONTAINER_NAME') . ':1025';

        // SYS
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'TYPO3 :: t3kit8 :: Dev mode *(localEnv/Docker)';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['trustedHostsPattern'] = '.*';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';

        $GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLogLevel'] = '0';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30466; // Default = 30466
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['belogErrorReporting'] = 30711; // Default = 30711
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 12290; // Default = 4096
    break; //______________________________________________________________________________________________


    case 'Development/ddev': // ===========================================================================
        // SetEnv TYPO3_CONTEXT Development/ddev
        // DB
        $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['host'] = getenv('DB_CONTAINER_NAME');
        $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['dbname'] = getenv('DB_NAME');
        $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['user'] = getenv('DB_USER');
        $GLOBALS['TYPO3_CONF_VARS']['DB']['Connections']['Default']['password'] = getenv('DB_PASSWORD');

        // BE
        $GLOBALS['TYPO3_CONF_VARS']['BE']['sessionTimeout'] = 28800;
        $GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = true;

        // FE
        $GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = false;

        // MAIL
        $GLOBALS['TYPO3_CONF_VARS']['MAIL']['transport'] = 'smtp';
        $GLOBALS['TYPO3_CONF_VARS']['MAIL']['transport_smtp_server'] = getenv('MAILHOG_CONTAINER_NAME') . ':1025';

        // SYS
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'TYPO3 :: t3kit8 :: Dev mode *(localEnv/ddev)';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['trustedHostsPattern'] = '.*';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';

        $GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLogLevel'] = '0';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30466; // Default = 30466
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['belogErrorReporting'] = 30711; // Default = 30711
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 12290; // Default = 4096
    break; //____________________________________________________________________________________________________


    case 'Development': // ======================================================================================
        // SetEnv TYPO3_CONTEXT Development
        // BE
        $GLOBALS['TYPO3_CONF_VARS']['BE']['sessionTimeout'] = 28800;
        $GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = true;

        // FE
        $GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = true;

        // SYS
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['sitename'] = 'TYPO3 :: t3kit8 :: Dev mode';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';

        $GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLogLevel'] = '0';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = 30466; // Default = 30466
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['belogErrorReporting'] = 30711; // Default = 30711
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 12290; // Default = 4096

    break; //__________________________________________________________________________________________________________


    case 'Production': // =============================================================================================
        // SetEnv TYPO3_CONTEXT Production
        // BE
        $GLOBALS['TYPO3_CONF_VARS']['BE']['sessionTimeout'] = 3600;
        $GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = false;

        // FE
        $GLOBALS['TYPO3_CONF_VARS']['FE']['debug'] = false;
        $GLOBALS['TYPO3_CONF_VARS']['FE']['disableNoCacheParameter'] = 1;

        // SYS
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '';

        $GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLogLevel'] = '3';
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 0;
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['belogErrorReporting'] = 0; // Default = 30711
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = 4096; // // Default = 4096

        // Disable debug mode for dyncss
        if (isset($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['dyncss'])) {
            $dynCssConfiguration = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['dyncss']);
            $dynCssConfiguration['enableDebugMode'] = false;
            $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['dyncss'] = $dynCssConfiguration;
        }

        // disable the deprecation log in TYPO3 9 LTS for production. (var/log/typo3_deprecations_<hash>.log)
        $GLOBALS['TYPO3_CONF_VARS']['LOG']['TYPO3']['CMS']['deprecations']['writerConfiguration'][\TYPO3\CMS\Core\Log\LogLevel::NOTICE] = [];

        // disable INFO/WARNING logs in TYPO3 9 LTS for production. (var/log/typo3_<hash>.log)
        $GLOBALS['TYPO3_CONF_VARS']['LOG']['TYPO3']['CMS']['writerConfiguration'][\TYPO3\CMS\Core\Log\LogLevel::INFO] = [];
        $GLOBALS['TYPO3_CONF_VARS']['LOG']['TYPO3']['CMS']['writerConfiguration'][\TYPO3\CMS\Core\Log\LogLevel::WARNING] = [];
    break; //____________________________________________________________________________________________________________
}
