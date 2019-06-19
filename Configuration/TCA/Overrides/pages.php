<?php
defined('TYPO3_MODE') || die();

call_user_func(function()
{
    /*
    * ###########################
    * PageTS for t3kit
    * ===========================
    */
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
        't3kit',
        'Configuration/TsConfig/Page/PageTS.tsconfig',
        't3kit'
    );
});
