<?php

defined('TYPO3_MODE') || die();

/*
 * ###########################
 * Add t3kit PageTS config
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
    '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:' . $_EXTKEY . '/Configuration/TsConfig/Page/page.tsconfig">'
);

/*
 * ################################################
 * Add t3kit system info to System toolbar item
 * ===============================================
 */
$signalSlotDispatcher = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Extbase\SignalSlot\Dispatcher::class);
$signalSlotDispatcher->connect(
        \TYPO3\CMS\Backend\Backend\ToolbarItems\SystemInformationToolbarItem::class,
        'getSystemInformation',
        \T3k\t3kit\Backend\ToolbarItems\SystemInformationToolbar\T3kitToolbarItems::class,
        'addSeparator'
);
$signalSlotDispatcher->connect(
        \TYPO3\CMS\Backend\Backend\ToolbarItems\SystemInformationToolbarItem::class,
        'getSystemInformation',
        \T3k\t3kit\Backend\ToolbarItems\SystemInformationToolbar\T3kitToolbarItems::class,
        'getT3kitVersion'
);
$signalSlotDispatcher->connect(
        \TYPO3\CMS\Backend\Backend\ToolbarItems\SystemInformationToolbarItem::class,
        'getSystemInformation',
        \T3k\t3kit\Backend\ToolbarItems\SystemInformationToolbar\T3kitToolbarItems::class,
        'getT3kitMode'
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
    ['source' => 'EXT:t3kit/Resources/Public/Icons/bmp.svg']
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
        ['source' => $contentElementIconFilePrefix . $icon . '.svg']
    );
}
