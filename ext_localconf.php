<?php

defined('TYPO3_MODE') || die();

$GLOBALS['TYPO3_CONF_VARS']['SYS']['fluid']['namespaces']['t3kit'][] = 'T3k\\t3kit\\ViewHelpers';

/*
 * ###########################
 * Include default t3kit PageTS config
 * ===========================
 */
// General Content Elements configuration
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
    "@import 'EXT:t3kit/Configuration/TSconfig/Page/Mod/Wizards/TYPO3DefaultContentElements.tsconfig'"
);
$t3kitextConf = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \TYPO3\CMS\Core\Configuration\ExtensionConfiguration::class
)->get('t3kit');

// BE layouts
if (!(bool) $t3kitextConf['disableBELayouts']) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        "@import 'EXT:t3kit/Configuration/TSconfig/Page/Mod/WebLayout/BackendLayouts.tsconfig'"
    );
}
// Content Elements
if (!(bool) $t3kitextConf['disableContentElements']) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        "@import 'EXT:t3kit/Configuration/TSconfig/Page/Mod/Wizards/T3kitContentElements.tsconfig'"
    );
}
// RTE
if (!(bool) $t3kitextConf['disableRTE']) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        "@import 'EXT:t3kit/Configuration/TSconfig/Page/RTE.tsconfig'"
    );
}
// TCAdefaults
if (!(bool) $t3kitextConf['disableTCAdefaults']) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        "@import 'EXT:t3kit/Configuration/TSconfig/Page/TCAdefaults.tsconfig'"
    );
}
// TCEFORM
if (!(bool) $t3kitextConf['disableTCEFORM']) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        "@import 'EXT:t3kit/Configuration/TSconfig/Page/TCEFORM.tsconfig'"
    );
}
// TCEMAIN
if (!(bool) $t3kitextConf['disableTCEMAIN']) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        "@import 'EXT:t3kit/Configuration/TSconfig/Page/TCEMAIN.tsconfig'"
    );
}

// USERTS
if (!(bool) $t3kitextConf['disableUserTSoptions']) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig(
        "@import 'EXT:t3kit/Configuration/TSconfig/User/Options.tsconfig'"
    );
}

// Define TypoScript as content rendering template
$GLOBALS['TYPO3_CONF_VARS']['FE']['contentRenderingTemplates'][] = 't3kit/Configuration/TypoScript/';

/*
 * ###########################
 * Register Icons
 * ===========================
 */
$iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
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

/*
 * ###########################
 * Register for hooks to show preview of tt_content elements in page module
 * ===========================
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['image'] =
\T3k\t3kit\Hooks\PageLayoutView\ImageCEPreviewRenderer::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['textmedia'] =
\T3k\t3kit\Hooks\PageLayoutView\TextmediaCEPreviewRenderer::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['textpic'] =
\T3k\t3kit\Hooks\PageLayoutView\TextpicCEPreviewRenderer::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['video'] =
\T3k\t3kit\Hooks\PageLayoutView\VideoCEPreviewRenderer::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['imageTextLink'] =
\T3k\t3kit\Hooks\PageLayoutView\ImageTextLinkCEPreviewRenderer::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['audio'] =
\T3k\t3kit\Hooks\PageLayoutView\AudioCEPreviewRenderer::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['heroImage'] =
\T3k\t3kit\Hooks\PageLayoutView\HeroImageCEPreviewRenderer::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['contactCard'] =
\T3k\t3kit\Hooks\PageLayoutView\ContactCardCEPreviewRenderer::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['simpleSiteHeader'] =
\T3k\t3kit\Hooks\PageLayoutView\SimpleSiteHeaderCEPreviewRenderer::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['siteFooter'] =
\T3k\t3kit\Hooks\PageLayoutView\SiteFooterCEPreviewRenderer::class;

// Register RTE presets
if (empty($GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['t3kit_default'])) {
    $GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['t3kit_default'] = 'EXT:t3kit/Configuration/RTE/Default.yaml';
}

// Register report module additions
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['reports']['tx_reports']['status']['providers']['security'][] = \T3k\t3kit\Report\T3kitSecurityStatus::class;
