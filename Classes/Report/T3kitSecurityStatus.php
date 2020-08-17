<?php

namespace T3k\t3kit\Report;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Crypto\PasswordHashing\InvalidPasswordHashException;
use TYPO3\CMS\Core\Crypto\PasswordHashing\PasswordHashFactory;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\Restriction\DeletedRestriction;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Reports\RequestAwareStatusProviderInterface;
use TYPO3\CMS\Reports\Status as ReportStatus;

/**
 * Performs several checks about the system's health
 */
class T3kitSecurityStatus implements RequestAwareStatusProviderInterface
{
    /**
     * @var ServerRequestInterface
     */
    protected $request;

    /**
     * Determines the security of this TYPO3 installation
     *
     * @param ServerRequestInterface|null $request
     * @return ReportStatus[] List of statuses
     */
    public function getStatus(ServerRequestInterface $request = null)
    {
        $statuses = [
            't3kitadminUserAccount' => $this->getT3kitAdminAccountStatus(),
            't3kitInstallToolPassword' => $this->getT3kitInstallToolPasswordStatus(),
        ];
        return $statuses;
    }

    /**
     * Checks whether a BE user account named admin with default t3kit password exists.
     *
     * @return ReportStatus An object representing whether a t3kit default admin account exists
     */
    protected function getT3kitAdminAccountStatus(): ReportStatus
    {
        $value = $this->getLanguageService()->getLL('status_ok');
        $message = '';
        $severity = ReportStatus::OK;
        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)->getQueryBuilderForTable('be_users');
        $queryBuilder->getRestrictions()
            ->removeAll()
            ->add(GeneralUtility::makeInstance(DeletedRestriction::class));

        $row = $queryBuilder
            ->select('uid', 'username', 'password')
            ->from('be_users')
            ->where(
                $queryBuilder->expr()->eq(
                    'username',
                    $queryBuilder->createNamedParameter('admin', \PDO::PARAM_STR)
                )
            )
            ->execute()
            ->fetch();

        if (!empty($row)) {
            try {
                $hashInstance = GeneralUtility::makeInstance(PasswordHashFactory::class)->get($row['password'], 'BE');
                if ($hashInstance->checkPassword('admin1234', $row['password'])) {
                    $uriBuilder = GeneralUtility::makeInstance(UriBuilder::class);
                    $value = $this->getLanguageService()->getLL('status_insecure');
                    $severity = ReportStatus::ERROR;
                    $editUserAccountUrl = (string)$uriBuilder->buildUriFromRoute(
                        'record_edit',
                        [
                            'edit[be_users][' . $row['uid'] . ']' => 'edit',
                            'returnUrl' => (string)$uriBuilder->buildUriFromRoute('system_reports')
                        ]
                    );
                    $message = sprintf(
                        $this
                        ->getLanguageService()
                        ->sL('LLL:EXT:t3kit/Resources/Private/Language/StatusReport/locallang.xlf:warning.backend_default_admin_user'),
                        '<a class="t3kit-status-report-link" href="' . htmlspecialchars($editUserAccountUrl) . '">',
                        '</a>'
                    );
                }
            } catch (InvalidPasswordHashException $e) {
                // No hash class handling for current hash could be found. Not good, but ok in this case.
            }
        }
        return GeneralUtility::makeInstance(
            ReportStatus::class,
            $this->getLanguageService()->sL('LLL:EXT:t3kit/Resources/Private/Language/StatusReport/locallang.xlf:status_admin_user_account'),
            $value,
            $message,
            $severity
        );
    }

    /**
     * Checks whether the Install Tool password in t3kit is set to its default value.
     *
     * @return ReportStatus An object representing whether a t3kit default install tool password exists
     */
    protected function getT3kitInstallToolPasswordStatus(): ReportStatus
    {
        $value = $this->getLanguageService()->getLL('status_ok');
        $message = '';
        $severity = ReportStatus::OK;
        $isDefaultPassword = false;
        $installToolPassword = $GLOBALS['TYPO3_CONF_VARS']['BE']['installToolPassword'];
        $hashInstance = null;
        $hashFactory = GeneralUtility::makeInstance(PasswordHashFactory::class);
        try {
            $hashInstance = $hashFactory->get($installToolPassword, 'BE');
        } catch (InvalidPasswordHashException $e) {
            // $hashInstance stays null
            $value = $this->getLanguageService()->getLL('status_wrongValue');
            $message = $e->getMessage();
            $severity = ReportStatus::ERROR;
        }
        if ($installToolPassword !== '' && $hashInstance !== null) {
            $isDefaultPassword = $hashInstance->checkPassword('admin1234', $installToolPassword);
        }
        if ($isDefaultPassword) {
            $value = $this->getLanguageService()->getLL('status_insecure');
            $severity = ReportStatus::ERROR;
            $uriBuilder = GeneralUtility::makeInstance(UriBuilder::class);
            $changeInstallToolPasswordUrl = (string)$uriBuilder->buildUriFromRoute('tools_toolssettings');
            $message = sprintf(
                $this->getLanguageService()->sL('LLL:EXT:t3kit/Resources/Private/Language/StatusReport/locallang.xlf:warning.installtool_default_password'),
                '<a class="t3kit-status-report-link" href="' . htmlspecialchars($changeInstallToolPasswordUrl) . '">',
                '</a>'
            );
        }
        return GeneralUtility::makeInstance(
            ReportStatus::class,
            $this->getLanguageService()->sL('LLL:EXT:t3kit/Resources/Private/Language/StatusReport/locallang.xlf:status_installtool_password'),
            $value,
            $message,
            $severity
        );
    }

    /**
     * Returns LanguageService
     *
     * @return \TYPO3\CMS\Core\Localization\LanguageService
     */
    protected function getLanguageService(): LanguageService
    {
        return $GLOBALS['LANG'];
    }
}
