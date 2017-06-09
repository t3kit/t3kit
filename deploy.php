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

desc('Installing vendors');
task('deploy:vendors', function () {
    run('cd {{deploy_path}} && {{env_vars}} {{bin/composer}} {{composer_options}}');
});

desc('TYPO3 Database migration(s)');
task('database:migration', function () {
    run('cd {{deploy_path}} && vendor/bin/typo3cms database:updateschema');
});

desc('TYPO3 Flush cache');
task('flush:cache', function () {
    run('cd {{deploy_path}} && vendor/bin/typo3cms cache:flush');
});

task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:vendors',
    'database:migration',
    'flush:cache',
    'deploy:unlock',
    'cleanup',
])->desc('Deploy your project');

after('deploy', 'success');

// If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');