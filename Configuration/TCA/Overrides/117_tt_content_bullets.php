<?php

defined('TYPO3') || die();

/*
 * ###########################
 * Add Content Element to Type list
 * ===========================
 */
// all "items" have four parts (fourth being optional)
// 0 => label
// 1 => value
// 2 => icon
// 3 => groupID
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.I.4',
        'bullets',
        'content-bullets',
        'default'
    ]
);


/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */


/*
 * ###########################
 * Configure element fields (types) to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['bullets']['columnsOverrides']['bodytext'] = [
    'config' => [
        'enableFrontendRichtext' => true,
        'frontendRichtextConfiguration' => 'listonly',
    ],
];


/*
* ###########################
* Add columns for Content Element
* ===========================
*/


/*
 * ###########################
 * Add new palettes for a Content Element
 * ===========================
 */


/*
 * ###########################
 * Add flexForms for Content Element
 * ===========================
 */
