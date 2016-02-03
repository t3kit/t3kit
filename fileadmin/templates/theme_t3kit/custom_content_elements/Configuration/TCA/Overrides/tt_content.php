<?php
defined('TYPO3_MODE') or die();

call_user_func(function() {

    // Shorter paths to localization files
    $customContentElementFilePrefix = 'LLL:fileadmin/templates/theme_t3kit/custom_content_elements/Resources/Private/Language/CustomContentElements.xlf:';
    $contentElementLanguageFilePrefix = 'LLL:EXT:theme_t3kit/Resources/Private/Language/ContentElements.xlf:';
    $frontendLanguageFilePrefix = 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:';
    $cmsLanguageFilePrefix = 'LLL:EXT:cms/locallang_ttc.xlf:';
    $customContentElementIconFilePrefix = 'fileadmin/templates/theme_t3kit/custom_content_elements/Resources/Public/Backend/Images/';

    //
    // Register Icons
    //
    if (TYPO3_MODE === 'BE') {
        /** @var \TYPO3\CMS\Core\Imaging\IconRegistry $iconRegistry */
        $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);

        // twbsButton
        $iconRegistry->registerIcon(
            'custom-content-elements-twbsButton',
            \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
            ['source' => $customContentElementIconFilePrefix . 'twbsButton.png']
        );
    }

    //
    // CTypes
    //
    // "twbsButton"
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
        'tt_content',
        'CType',
        [
            $customContentElementFilePrefix . 'twbsButton.title',
            'twbsButton',
            'content-elements-accordion'
        ],
        'login',
        'after'
    );
    $GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['twbsButton'] = 'custom-content-elements-twbsButton';

    //
    // Types
    //
    // "twbsButton"
    $GLOBALS['TCA']['tt_content']['types']['twbsButton'] = [
        'showitem' => '
                --palette--;' . $frontendLanguageFilePrefix . 'palette.general;general,
                header;' . $customContentElementFilePrefix . 'twbsButton.header_label,
                 --linebreak--, header_link;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_link_formlabel,
                 --linebreak--,pi_flexform;' . $contentElementLanguageFilePrefix . 'tt_content.tabs.settings,
            --div--;' . $frontendLanguageFilePrefix . 'tabs.appearance,
                --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.frames;frames,
                --palette--;' . $frontendLanguageFilePrefix . 'palette.appearanceLinks;appearanceLinks,
            --div--;' . $frontendLanguageFilePrefix . 'tabs.access,
                hidden;' . $frontendLanguageFilePrefix . 'field.default.hidden,
                --palette--;' . $frontendLanguageFilePrefix . 'palette.access;access,
            --div--;' . $frontendLanguageFilePrefix . 'tabs.extended
        '
    ];

    //
    // Flexforms
    //
    // "twbsButton"
    $GLOBALS['TCA']['tt_content']['columns']['pi_flexform']['config']['ds']['*,twbsButton'] = 'FILE:fileadmin/templates/theme_t3kit/custom_content_elements/Configuration/FlexForms/flexform_twbsButton.xml';

    // The "divider" the custom content elements
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
        'tt_content',
        'CType',
        [
            $customContentElementFilePrefix . 'tab.customContentElements',
            '--div--',
            null
        ],
        'twbsButton',
        'before'
    );
});
