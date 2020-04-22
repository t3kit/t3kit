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
    'ce-bigIconTextLink',
    'ce-iconTextLink',
    'ce-imageTextLink',
    'ce-quote',
    'ce-button',
    'ce-video',
    'ce-element',
    'ce-heroImage',
    'ce-contactCard',
    'ce-dividerIcon'
];
foreach ($contentElementIcons as $icon) {
    $iconRegistry->registerIcon(
        $icon,
        \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        ['source' => $contentElementIconFilePath . $icon . '.svg']
    );
}
