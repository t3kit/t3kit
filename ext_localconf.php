<?php

defined('TYPO3_MODE') || die();

$GLOBALS['TYPO3_CONF_VARS']['SYS']['fluid']['namespaces']['t3kit'][] = 'T3k\\t3kit\\ViewHelpers';

/*
 * ###########################
 * Add t3kit PageTS config
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
    "@import 'EXT:t3kit/Configuration/TSconfig/Import.tsconfig'"
);

// Define TypoScript as content rendering template
$GLOBALS['TYPO3_CONF_VARS']['FE']['contentRenderingTemplates'][] = 't3kit/Configuration/TypoScript/';

/*
 * ################################################
 * Add t3kit system info to System toolbar item
 * ===============================================
 */
$signalSlotDispatcher = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \TYPO3\CMS\Extbase\SignalSlot\Dispatcher::class
);
$signalSlotDispatcher->connect(
    \TYPO3\CMS\Backend\Backend\ToolbarItems\SystemInformationToolbarItem::class,
    'getSystemInformation',
    \T3k\t3kit\Backend\ToolbarItems\SystemInformationToolbarItem\T3kitToolbarItems::class,
    'addSeparator'
);
$signalSlotDispatcher->connect(
    \TYPO3\CMS\Backend\Backend\ToolbarItems\SystemInformationToolbarItem::class,
    'getSystemInformation',
    \T3k\t3kit\Backend\ToolbarItems\SystemInformationToolbarItem\T3kitToolbarItems::class,
    'getT3kitVersion'
);

/*
 * ###########################
 * Register Icons
 * ===========================
 */
$iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
// System information icons
$iconRegistry->registerIcon(
    'systeminformation-t3kit',
    \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
    ['source' => 'EXT:t3kit/Resources/Public/Icons/t3kit.svg']
);
// Content Elements icons
$contentElementIconFilePath = 'EXT:t3kit/Resources/Public/Icons/ContentElements/';
$contentElementIcons = [
    'ce-slider',
    'ce-bigIconTextButton',
    'ce-iconTextButton',
    'ce-imageTextLink',
    'ce-logoCarousel',
    'ce-quote',
    'ce-fullWidthImage',
    'ce-responsiveVideo',
    'ce-socialIcons',
    'ce-copyrightText',
    'ce-contacts',
    'ce-button',
    'ce-heroImage',
    'ce-contactsCard'
];
foreach ($contentElementIcons as $icon) {
    $iconRegistry->registerIcon(
        $icon,
        \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        ['source' => $contentElementIconFilePath . $icon . '.svg']
    );
}
