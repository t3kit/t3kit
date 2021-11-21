<?php

declare(strict_types=1);

namespace T3k\t3kit\Updates;

use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\QueryBuilder;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Install\Updates\UpgradeWizardInterface;

abstract class AbstractUpgradeWizard implements UpgradeWizardInterface
{
    public const TABLE_NAME = '';

    public const IDENTIFIER = 't3kit_';

    public const TITLE = '';

    public const DESCRIPTION = '';

    /**
     * @inheritDoc
     */
    final public function getIdentifier(): string
    {
        return static::IDENTIFIER;
    }

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return static::TITLE;
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return static::DESCRIPTION;
    }


    /**
     * Returns the QueryBuilder with all restrictions removed.
     *
     * @return QueryBuilder
     */
    protected function getQueryBuilder(): QueryBuilder
    {
        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)
            ->getConnectionForTable(static::TABLE_NAME)
            ->createQueryBuilder();

        $queryBuilder->getRestrictions()->removeAll();

        return $queryBuilder;
    }
}
