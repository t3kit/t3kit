<?php

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (
        new \B13\Container\Tca\ContainerConfiguration(
            '2cols', // CType
            '2 Column', // label
            'Description', // description
            [
                [
                    ['name' => 'col-1', 'colPos' => 5099],
                    ['name' => 'col-2', 'colPos' => 5098]
                ]
            ]
        )
    )
    ->setIcon('EXT:container/Resources/Public/Icons/container-2col.svg')
    ->setSaveAndCloseInNewContentElementWizard(false)
    ->setGroup('grid')
);
