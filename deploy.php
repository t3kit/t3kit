<?php
namespace Deployer;

require 'vendor/deployer/deployer/recipe/common.php';

// Configuration
host('')
    ->user('')
    ->port(22)
    ->forwardAgent(true)
    ->multiplexing(true)
    ->stage('production')
    ->set('deploy_path', '');

// Installation vendors through composer
desc('Installing vendors');
task('deploy:vendors', function () {
    run('cd {{deploy_path}} && {{env_vars}} {{bin/composer}} {{composer_options}}');
});

// TYPO3 Database migration
desc('TYPO3 Database migration(s)');
task('database:migration', function () {
    run('cd {{deploy_path}} && vendor/bin/typo3cms database:updateschema');
});

// Flush TYPO3 cache
desc('TYPO3 Flush cache');
task('flush:cache', function () {
    run('cd {{deploy_path}} && vendor/bin/typo3cms cache:flush');
});

// Bundled deployment chain
task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:vendors',
    'database:migration',
    'flush:cache',
    'deploy:unlock',
    'cleanup',
])->desc('Deploy your project');

// If a deployment is successful
after('deploy', 'success');

// If deploy fails automatically unlock
after('deploy:failed', 'deploy:unlock');