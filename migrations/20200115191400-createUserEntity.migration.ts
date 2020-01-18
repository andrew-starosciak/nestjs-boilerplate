import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

/** tslint:disable-next-line */
export class createUserEntity20200115191400 implements MigrationInterface {

    name = 'createUserEntity20200115191400';

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'user_entity',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'password',
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

        await queryRunner.createIndex('user_entity', new TableIndex({
            name: 'IDX_USER_EMAIL',
            columnNames: ['email'],
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('user_entity');
        await queryRunner.dropIndex('user_entity', 'IDX_USER_EMAIL');
        await queryRunner.dropTable('user_entity');
    }

}
