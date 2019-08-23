<?php
namespace T3k\t3kit\Backend\ToolbarItems\SystemInformationToolbar;

/*
 * This file is part of the t3kit project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The t3kit project
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\CMS\Backend\Backend\ToolbarItems\SystemInformationToolbarItem;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use \TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Backend\Toolbar\Enumeration\InformationStatus;

/**
 * Render t3kit system info to System toolbar item
 */
class T3kitToolbarItems
{
    /**
     * Called by the system information toolbar signal/slot dispatch.
     *
     * @param SystemInformationToolbarItem $systemInformation
     */

    /**
     * t3kit version
     */
    public function getT3kitVersion(SystemInformationToolbarItem $systemInformation)
    {
        $systemInformation->addSystemInformation(
            't3kit',
            ExtensionManagementUtility::getExtensionVersion('t3kit'),
            'systeminformation-t3kit',
            InformationStatus::STATUS_INFO
        );
    }

    /**
     * t3kit mode
     */
    public function getT3kitMode(SystemInformationToolbarItem $systemInformation)
    {
        $configurationManager = GeneralUtility::makeInstance(
            'TYPO3\\CMS\\Extbase\\Configuration\\BackendConfigurationManager'
        );
        $configurationManager->getDefaultBackendStoragePid();
        $tsSetup = $configurationManager->getTypoScriptSetup();
        $isProduction = $tsSetup['plugin.']['tx_t3kit.']['settings.']['production'];

        $systemInformation->addSystemInformation(
            't3kit Mode',
            $isProduction ? 'Production' : 'Development',
            'systeminformation-t3kit',
            $isProduction ? InformationStatus::STATUS_OK : InformationStatus::STATUS_WARNING
        );
    }

    /**
     * add separator
     */
    public function addSeparator(SystemInformationToolbarItem $systemInformation)
    {
        $systemInformation->addSystemInformation(
            '______________',
            '______________',
            ''
        );
    }
}
