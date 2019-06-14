<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 't3kit',
    'description' => 't3kit project. A TYPO3 website starterkit.',
    'version' => '9.0.0',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '9.5.0-9.5.99',
        ],
        'conflicts' => [
            'css_styled_content' => '*',
            'fluid_styled_content' => '*',
        ],
    ],
    'state' => 'alpha',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'author' => 't3kit Community',
    'author_email' => '',
    'author_company' => 't3kit',
    'autoload' => [
        'psr-4' => [
            'T3k\\t3kit\\' => 'Classes'
        ],
    ],
];
