<?php
namespace T3k\t3kit\View;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\PathUtility;

/**
 * Icons for t3kit
 *
 * Creates a list of svg files from a folder e.g. EXT:t3kit/Resources/Public/Images/Icons/Bootstrap/
 *
 * Source folder needs to be selected from another field, default is icon_source,
 * but can be set with iconSourceField.
 *
 * Sample config for iconView in TCA:
 *
 *    'fieldWizard' => [
 *      'selectIcons' => [
 *        // Determines if list should be displayed below select
 *        'disabled' => 0,
 *        // set field name of icon source folder
 *        // this field is required if field name isn't the default icon_source
 *        'iconSourceField' => 'nav_icon_source',
 *      ],
 *    ],
 *    'itemsProcFunc' => 'T3k\t3kit\View\IconView->addIconsFromSource',
 *
 */
class IconView implements \TYPO3\CMS\Core\SingletonInterface
{

    /**
     * Gets Icons for selected icon source.
     *
     * @param array $parameters
     */
    public function addIconsFromSource(array $parameters)
    {
        $iconSourceField =
            $parameters['config']['fieldWizard']['selectIcons']['iconSourceField'] ??
            'icon_source';

        $iconSource =
            is_array($parameters['row'][$iconSourceField]) ?
            $parameters['row'][$iconSourceField][0] :
            $parameters['row'][$iconSourceField] ?? null;

        $icons = [];

        if ($iconSource) {
            $path = GeneralUtility::getFileAbsFileName($iconSource);
            $icons = GeneralUtility::getFilesInDir(
                $path,
                'svg'
            );
        }

        if (!empty($icons)) {
            foreach ($icons as $key => $icon) {
                $absolutePath = $path . $icon;
                $pathInfo = pathinfo($absolutePath);

                $parameters['items'][] = [
                    $pathInfo['filename'],
                    PathUtility::getAbsoluteWebPath($absolutePath),
                    $absolutePath,
                ];
            }
        }
    }
}
