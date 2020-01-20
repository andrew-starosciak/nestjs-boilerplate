import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

/** tslint:disable-next-line */
export class createPasswordResetEntity20200119223500 implements MigrationInterface {

    public name = 'createPasswordResetEntity20200119223500';
    public table: string = 'password_reset_entity';

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: this.table,
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
                    name: 'code',
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

        await queryRunner.createIndex(this.table, new TableIndex({
            name: 'IDX_PASSWORD_RESET_USERID',
            columnNames: ['userId'],
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable(this.table);
        await queryRunner.dropIndex(this.table, 'IDX_PASSWORD_RESET_USERID');
        await queryRunner.dropTable(this.table);
    }

}
