<?php
defined('TYPO3_MODE') or die();

call_user_func(function() {

    $customContentElementIconFilePrefix = 'fileadmin/templates/theme_t3kit/custom_content_elements/Resources/Public/Backend/Icons/CustomContentElements/';

    //
    // Register Icons
    //
    if (TYPO3_MODE === 'BE') {
        /** @var \TYPO3\CMS\Core\Imaging\IconRegistry $iconRegistry */
        $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);

        // twbsButton
        $iconRegistry->registerIcon(
            'custom-content-elements-twbsButton',
            \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
            [
                'source' => $customContentElementIconFilePrefix . 'customElement.svg'
            ]
        );
    }

});
