<?php

declare(strict_types=1);

namespace T3k\t3kit\Backend\EventListener;

use TYPO3\CMS\Backend\Preview\StandardContentPreviewRenderer;
use TYPO3\CMS\Backend\View\Event\PageContentPreviewRenderingEvent;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;

final class SliderCEPreviewListener extends StandardContentPreviewRenderer
{
    public function __invoke(PageContentPreviewRenderingEvent $event): void
    {
        if ($event->getTable() !== 'tt_content') {
            return;
        }
        if ($event->getRecord()['CType'] === 'slider') {
            $itemContent = $event->getPreviewContent();
            $row = $event->getRecord();
            if ($row['tx_t3kit_slider_item']) {
                $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)
                    ->getQueryBuilderForTable('tx_t3kit_slider_item');
                $queryBuilder->getRestrictions()->removeAll();
                $slides = $queryBuilder->select('*')
                    ->from('tx_t3kit_slider_item')->where($queryBuilder->expr()->eq(
                        'tt_content',
                        $queryBuilder->createNamedParameter($row['uid'], \PDO::PARAM_INT)
                    ))->executeQuery()->fetchAllAssociative();

                foreach ($slides as $key => $slide) {
                    $itemContent .= $this->linkEditContent($this->getThumbCodeUnlinked($slide, 'tx_t3kit_slider_item', 'picture'), $row);
                }
                $event->setPreviewContent($itemContent);
            }
        }
    }
}
