<?php

declare(strict_types=1);

namespace T3k\t3kit\Updates;

class SysFileReferencePrepareStringToIntegerUpgradeWizard extends AbstractUpgradeWizard
{
    public const TABLE_NAME = 'sys_file_reference';

    public const IDENTIFIER = 't3kit_sysFileReferencePrepareStringToInteger';

    public const TITLE = 'Remove empty picture_width strings';

    public const DESCRIPTION = 'Changes the value of sys_file_reference.picture_width from "" to "100" '
        . 'to prepare the field for conversion to integer.';

    /**
     * @inheritDoc
     */
    public function executeUpdate(): bool
    {
        $queryBuilder = $this->getQueryBuilder();

        return (bool)$queryBuilder
            ->update(self::TABLE_NAME)
            ->where(
                $queryBuilder->expr()->eq('picture_width', $queryBuilder->createNamedParameter(''))
            )
            ->set('picture_width', '100', false, \PDO::PARAM_STR)
            ->execute();
    }

    /**
     * @inheritDoc
     */
    public function updateNecessary(): bool
    {
        $queryBuilder = $this->getQueryBuilder();

        return (bool)$queryBuilder
            ->count('uid')
            ->from(self::TABLE_NAME)
            ->where(
                $queryBuilder->expr()->eq('picture_width', $queryBuilder->createNamedParameter(''))
            )
            ->execute()
            ->fetchOne();
    }

    /**
     * @inheritDoc
     */
    public function getPrerequisites(): array
    {
        return [];
    }
}
