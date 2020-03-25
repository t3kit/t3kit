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
        $iconSource = $parameters['row']['icon_source'][0] ?? null;
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
