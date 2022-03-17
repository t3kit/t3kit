<?php

$EM_CONF['t3kit'] = [
    'title' => 't3kit',
    'description' => 't3kit project. A TYPO3 website starterkit.',
    'version' => '11.0.0',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '11.5.0-11.5.99',
            'php' => '7.4.0-8.0.99'
        ],
        'conflicts' => [
            'css_styled_content' => '*',
            'fluid_styled_content' => '*',
        ],
    ],
    'state' => 'stable',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'author' => 't3kit Community',
    'author_email' => '',
    'author_company' => 't3kit'
];
