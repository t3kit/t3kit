<?php

$EM_CONF['t3kit'] = [
    'title' => 't3kit',
    'description' => 't3kit project. A TYPO3 website starterkit.',
    'version' => '11.1.2',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '12.4.0-12.4.99',
            'php' => '8.1.0-8.2.99'
        ],
        'conflicts' => [
            'css_styled_content' => '*',
            'fluid_styled_content' => '*',
        ],
    ],
    'state' => 'stable',
    'author' => 't3kit Community',
    'author_email' => '',
    'author_company' => 't3kit'
];
