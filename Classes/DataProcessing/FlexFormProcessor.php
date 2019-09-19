<?php
namespace T3k\t3kit\DataProcessing;

/*
 * This file is part of the t3kit project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The t3kit project
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\CMS\Core\Service\FlexFormService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

/**
 * This data processor can be used for processing data for the content elem-s which have flexform contents in one field
 *
 * Example TypoScript configuration:
 * 10 = T3k\t3kit\DataProcessing\FlexFormProcessor
 * 10 {
 *   fieldName = pi_flexform
 *   as = flexform
 * }
 *
 * whereas "flexform" can be used as a variable {flexform} inside Fluid to fetch values.
 *
 */
class FlexFormProcessor implements DataProcessorInterface
{

    /**
     * Process flexform field data to an array
     *
     * @param ContentObjectRenderer $cObj The data of the content element or page
     * @param array $contentObjectConfiguration The configuration of Content Object
     * @param array $processorConfiguration The configuration of this processor
     * @param array $processedData Key/value store of processed data (e.g. to be passed to a Fluid View)
     * @return array the processed data as key/value store
     */
    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData
    ) {
        if (isset($processorConfiguration['if.']) && !$cObj->checkIf($processorConfiguration['if.'])) {
            return $processedData;
        }

        // The field name to process
        $fieldName = $cObj->stdWrapValue('fieldName', $processorConfiguration);
        if (empty($fieldName)) {
            return $processedData;
        }

        // Set the target variable
        $targetVariableName = $cObj->stdWrapValue('as', $processorConfiguration, $fieldName);

        // parse flexform
        $flexformService = GeneralUtility::makeInstance(FlexFormService::class);
        $processedData[$targetVariableName] = $flexformService->convertFlexFormContentToArray($cObj->data[$fieldName]);

        return $processedData;
    }
}
