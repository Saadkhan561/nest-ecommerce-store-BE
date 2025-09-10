import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1757532563429 implements MigrationInterface {
    name = ' $npmConfigName1757532563429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "img_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "img_url"`);
    }

}
