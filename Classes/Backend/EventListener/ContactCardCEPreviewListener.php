<?php

declare(strict_types=1);

namespace T3k\t3kit\Backend\EventListener;

use TYPO3\CMS\Backend\Preview\StandardContentPreviewRenderer;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\Event\PageContentPreviewRenderingEvent;
use TYPO3\CMS\Core\Service\FlexFormService;
use TYPO3\CMS\Core\Utility\GeneralUtility;

final class ContactCardCEPreviewListener extends StandardContentPreviewRenderer
{
    public function __invoke(PageContentPreviewRenderingEvent $event): void
    {
        if ($event->getTable() !== 'tt_content') {
            return;
        }
        if ($event->getRecord()['CType'] === 'contactCard') {
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
            if ($row['pi_flexform']) {
                $flexformService = GeneralUtility::makeInstance(FlexFormService::class);
                $itemContent .= $flexformService->convertFlexFormContentToArray($row['pi_flexform'])['name'] ?? null;
            }
            $event->setPreviewContent($itemContent);
        }
    }
}
