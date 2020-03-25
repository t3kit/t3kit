<?php
namespace T3k\t3kit\ViewHelpers\Render;

/*                                                                        *
* This script is part of the TYPO3 project - inspiring people to share!  *
*                                                                        *
* TYPO3 is free software; you can redistribute it and/or modify it under *
* the terms of the GNU General Public License version 2 as published by  *
* the Free Software Foundation.                                          *
*                                                                        *
 * This script is distributed in the hope that it will be useful, but     *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHAN-    *
 * TABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General      *
 * Public License for more details.                                       *
 *                                                                        */

use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

class SvgViewHelper extends AbstractViewHelper
{

    /**
     * @var boolean
     */
    protected $escapeChildren = false;

    /**
     * @var boolean
     */
    protected $escapeOutput = false;

    /**
     * Initialize arguments
     *
     * @return void
     */
    public function initializeArguments()
    {
        parent::initializeArguments();
        $this->registerArgument('src', 'string', 'Specifies the source file', true);
        $this->registerArgument('class', 'string', 'Specifies an alternate class for the svg', false);
        $this->registerArgument('width', 'float', 'Specifies a width for the svg', false);
        $this->registerArgument('height', 'float', 'Specifies a height for the svg', false);
        $this->registerArgument('aria-label', 'string', 'Specifies an aria-label for the svg', false);
        $this->registerArgument('aria-hidden', 'bool', 'Specifies aria-hidden for the svg', false);
    }

    /**
     * Generate a list from the content
     *
     */
    public function render()
    {
        $relativeSrc = $this->arguments['src'];
        $absoluteSrc = Environment::getPublicPath() . $this->arguments['src'];

        if (!GeneralUtility::isAllowedAbsPath($absoluteSrc)) {
            return '<!-- unable to open file: ' . $relativeSrc . ' (disallowed) -->';
        }

        $finfo = \mime_content_type($absoluteSrc);
        if (!in_array($finfo, ['image/svg+xml','image/svg'])) {
            return '<!-- unable to open file: ' . $relativeSrc . ' (' . $finfo . ') -->';
        }

        return $this->getInlineSvg($absoluteSrc);
    }

    /**
     * Get xml from SVG
     *
     * @param string $source
     * @return string
     */
    protected function getInlineSvg($source)
    {
        if (!file_exists($source)) {
            return '<!-- unable to open file: ' . $source . ' (missing) -->';
        }

        $svgContent = GeneralUtility::getUrl($source);

        // Try and remove script tags
        $svgContent = preg_replace('/<script[\s\S]*?>[\s\S]*?<\/script>/i', '', $svgContent);

        // Disables the functionality to allow external entities to be loaded when parsing the XML, must be kept
        $previousValueOfEntityLoader = libxml_disable_entity_loader(true);
        $svgElement = simplexml_load_string($svgContent);
        libxml_disable_entity_loader($previousValueOfEntityLoader);

        // Remove xml version tag
        $domXml = dom_import_simplexml($svgElement);

        $domXml->setAttribute('role', 'img');
        if (!empty($this->arguments['aria-label'])) {
            $domXml->setAttribute('aria-label', $this->arguments['aria-label']);
        }
        if (!empty($this->arguments['aria-hidden']) && $this->arguments['aria-hidden'] === true) {
            $domXml->setAttribute('aria-hidden', 'true');
        }
        if (!empty($this->arguments['class'])) {
            $class = empty($domXml->getAttribute('class')) ?
                $this->arguments['class'] :
                $domXml->getAttribute('class') . ' ' . $this->arguments['class'];
            $domXml->setAttribute('class', $class);
        }
        if (!empty($this->arguments['width'])) {
            $domXml->setAttribute('width', $this->arguments['width']);
        }
        if (!empty($this->arguments['height'])) {
            $domXml->setAttribute('height', $this->arguments['height']);
        }
        return $domXml->ownerDocument->saveXML($domXml->ownerDocument->documentElement);
    }
}
