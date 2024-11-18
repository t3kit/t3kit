<?php

declare(strict_types=1);

namespace T3k\t3kit\Backend\EventListener;

use TYPO3\CMS\Backend\Preview\StandardContentPreviewRenderer;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\Event\PageContentPreviewRenderingEvent;

final class ImageTextLinkCEPreviewListener extends StandardContentPreviewRenderer
{
    public function __invoke(PageContentPreviewRenderingEvent $event): void
    {
        if ($event->getTable() !== 'tt_content') {
            return;
        }
        if ($event->getRecord()['CType'] === 'imageTextLink') {
            $itemContent = $event->getPreviewContent();
            $row = $event->getRecord();
            if ($row['picture']) {
                $itemContent .= $this->linkEditContent($this->getThumbCodeUnlinked($row, 'tt_content', 'picture'), $row);

                $fileReferences = BackendUtility::resolveFileReferences('tt_content', 'picture', $row);

                if (!empty($fileReferences)) {
                    $linkedContent = '';

                    foreach ($fileReferences as $fileReference) {
                        $description = $fileReference->getDescription();
                        if ($description !== null && $description !== '') {
                            $linkedContent .= htmlspecialchars($description);
                            $linkedContent = '<span class="t3kit-ce-image-description">' . $linkedContent . '</span>';
                        }
                    }

                    $itemContent .= $this->linkEditContent($linkedContent, $row);

                    unset($linkedContent);
                }
            }

            if ($row['svg_image']) {
                $itemContent .= $this->linkEditContent($this->getThumbCodeUnlinked($row, 'tt_content', 'svg_image'), $row);

                $fileReferences = BackendUtility::resolveFileReferences('tt_content', 'svg_image', $row);

                if (!empty($fileReferences)) {
                    $linkedContent = '';

                    foreach ($fileReferences as $fileReference) {
                        $description = $fileReference->getDescription();
                        if ($description !== null && $description !== '') {
                            $linkedContent .= htmlspecialchars($description);
                            $linkedContent = '<span class="t3kit-ce-image-description">' . $linkedContent . '</span>';
                        }
                    }

                    $itemContent .= $this->linkEditContent($linkedContent, $row);

                    unset($linkedContent);
                }
            }
            $event->setPreviewContent($itemContent);
        }
    }
}
