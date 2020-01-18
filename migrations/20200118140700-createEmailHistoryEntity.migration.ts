import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

/** tslint:disable-next-line */
export class createEmailHistoryEntity20200118140700 implements MigrationInterface {

    name = 'createEmailHistoryEntity20200118140700';

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'email_history_entity',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'userId',
                    type: 'int',
                },
                {
                    name: 'type',
                    type: 'varchar',
                },
                {
                    name: 'meta',
                    type: 'varchar',
                },
                {
                    name: 'provider',
                    type: 'varchar',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp ',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp ',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp ',
                    isNullable: true,
                },
            ],
        }), true);

        await queryRunner.createIndex('email_history_entity', new TableIndex({
            name: 'IDX_EMAIL_HISTORY_USERID',
            columnNames: ['userId'],
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('email_history_entity');
        await queryRunner.dropIndex('email_history_entity', 'IDX_EMAIL_HISTORY_USERID');
        await queryRunner.dropTable('email_history_entity');
    }

}
