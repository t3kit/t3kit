<?php

// Configure a "theme" field to have the possibility to choose
$GLOBALS['SiteConfiguration']['site']['columns']['theme'] = [
    'label' => 'Site Theme',
    'config' => [
        'type' => 'select',
        'renderType' => 'selectSingle',
        'items' => [
            ['Theme t3kit', 't3kit']
        ],
    ],
];

// add a new palette for custom fields for t3kit specific options
$GLOBALS['SiteConfiguration']['site']['palettes']['t3kit'] = [
    'showitem' => 'theme'
];

$GLOBALS['SiteConfiguration']['site']['types']['0']['showitem'] = str_replace(
    'base,',
    'base,--palette--;;t3kit,',
    $GLOBALS['SiteConfiguration']['site']['types']['0']['showitem']
);

// TODO: use it in sub-theme to extend theme select box
// $GLOBALS['SiteConfiguration']['site']['columns']['theme']['config']['items'] = array_replace_recursive(
//     $GLOBALS['SiteConfiguration']['site']['columns']['theme']['config']['items'],
//     [ ['New Project', 'project_name'] ]
// );
