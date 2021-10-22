<?php

defined('TYPO3_MODE') || die();

/*
 * ###########################
 * 2 columns grid config
 * ===========================
 */
\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (
        new \B13\Container\Tca\ContainerConfiguration(
            '2columns', // CType
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Grid/locallang_2columns.xlf:2columns.title',
            'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Grid/locallang_2columns.xlf:2columns.description',
            [
                [
                    ['name' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Grid/locallang_2columns.xlf:2columns.column1', 'colPos' => 5099],
                    ['name' => 'LLL:EXT:t3kit/Resources/Private/Language/ContentElements/Grid/locallang_2columns.xlf:2columns.column2', 'colPos' => 5098]
                ]
            ]
        )
    )
    ->setIcon('EXT:t3kit/Resources/Public/Icons/ContentElements/ce-2columns.svg')
    ->setSaveAndCloseInNewContentElementWizard(false)
    ->setGroup('grid')
);


/*
 * ###########################
 * Configure element fields to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['2columns']['showitem'] = '
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
        --palette--;;general,
        header;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:content_element_title,
    --div--;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:tab.settings,
        pi_flexform;LLL:EXT:t3kit/Resources/Private/Language/ContentElements/locallang.xlf:flexform.title,
    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
        --palette--;;frames,
        --palette--;;appearanceLinks,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,
        --palette--;;language,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
        --palette--;;hidden,
        --palette--;;access,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:categories,
        categories,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:notes,
        rowDescription,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:extended,
';

/*
 * ###########################
 * Add flexForms for Content Element
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:t3kit/Configuration/FlexForms/2columns.xml',
    '2columns'
);
