<?php

namespace T3k\t3kit\Hooks\PageLayoutView;

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

use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\PageLayoutView;
use TYPO3\CMS\Backend\View\PageLayoutViewDrawItemHookInterface;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Contains a preview rendering for the page module of CType="image"
 * @internal this is a concrete TYPO3 hook implementation and solely used for EXT:frontend and not part of TYPO3's Core API.
 */
class SliderCEPreviewRenderer implements PageLayoutViewDrawItemHookInterface
{
    /**
     * Preprocesses the preview rendering of the content element "image".
     *
     * @param \TYPO3\CMS\Backend\View\PageLayoutView $parentObject Calling parent object
     * @param bool $drawItem Whether to draw the item using the default functionalities
     * @param string $headerContent Header content
     * @param string $itemContent Item content
     * @param array $row Record row of tt_content
     */
    public function preProcess(
        PageLayoutView &$parentObject,
        &$drawItem,
        &$headerContent,
        &$itemContent,
        array &$row
    ) {
        if ($row['CType'] === 'slider') {
            if ($row['tx_t3kit_slider_item']) {
                $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)
                    ->getQueryBuilderForTable('tx_t3kit_slider_item');
                $queryBuilder->getRestrictions()->removeAll();
                $slides = $queryBuilder->select('*')
                    ->from('tx_t3kit_slider_item')
                    ->where(
                        $queryBuilder->expr()->eq(
                            'tt_content',
                            $queryBuilder->createNamedParameter($row['uid'], \PDO::PARAM_INT)
                        )
                    )
                    ->execute()
                    ->fetchAll();
                
                foreach ($slides as $key => $slide) {
                    $itemContent .= $parentObject->linkEditContent($parentObject->getThumbCodeUnlinked($slide, 'tx_t3kit_slider_item', 'picture'), $row);
                    /*
                    $header = $slide['header'] . PHP_EOL . $slide['subheader_text'];
                    if ($header !== null && $header !== '') {
                        $linkedContent .= htmlspecialchars($header);
                        $linkedContent = '<span class="t3kit-ce-image-description">' . $linkedContent . '</span>';
                    }
                    $itemContent .= $parentObject->linkEditContent($linkedContent, $row);
                    unset($linkedContent);
                    */
                }
            }

            $drawItem = false;
        }
    }
}
