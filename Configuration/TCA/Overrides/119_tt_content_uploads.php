<?php

defined('TYPO3_MODE') || die();

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
        'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:CType.I.6',
        'uploads',
        'content-special-uploads',
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
$GLOBALS['TCA']['tt_content']['types']['uploads']  = array_replace_recursive(
    $GLOBALS['TCA']['tt_content']['types']['uploads'],
    [
        'columnsOverrides' => [
            'header_link' => [
                'config' => [
                    'fieldControl' => [
                        'linkPopup' => [
                            'options' => [
                                'blindLinkFields' => 'params, target, class, title',
                                'blindLinkOptions' => 'folder, mail, telephone'
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
);


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
