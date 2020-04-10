<?php
defined('TYPO3_MODE') || die();


/*
 * ###########################
 * Add Content Element to Type list
 * ===========================
 */


// /*
//  * ###########################
//  * Add icon for Content Element
//  * ===========================
//  */


/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */

$GLOBALS['TCA']['tt_content']['types']['textpic'] = array_replace_recursive(
    $GLOBALS['TCA']['tt_content']['types']['textpic'],
    [
        'columnsOverrides' => [
            'image' => [
                'config' => [
                    'filter' => [
                        0 => [
                            'parameters' => [
                                'allowedFileExtensions' => 'jpg,jpeg,png,svg'
                            ]
                        ]
                    ],
                    'overrideChildTca' => [
                        'columns' => [
                            'uid_local' => [
                                'config' => [
                                    'appearance' => [
                                        'elementBrowserAllowed' => 'jpg,jpeg,png,svg'
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ],
            'header_link' => [
                'config' => [
                    'fieldControl' => [
                        'linkPopup' => [
                            'options' => [
                                'blindLinkFields' => 'params, target, class',
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
