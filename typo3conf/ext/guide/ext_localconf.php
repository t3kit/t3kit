<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
if (TYPO3_MODE === 'BE') {
	// Add tour libraries
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] = 
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Hooks/PageRenderer.php:Tx\\Guide\\Hooks\\PageRenderer->addJSCSS';
	// Add AJAX
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerAjaxHandler (
		'GuideController::ajaxRequest',
		'Tx\\Guide\\Controller\\GuideController->ajaxRequest'
	);
	// Add page typoscript tours
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('<INCLUDE_TYPOSCRIPT: source="FILE:EXT:' . $_EXTKEY . '/Configuration/PageTS/tsconfig.txt">');
}