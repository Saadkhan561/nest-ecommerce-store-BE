import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1745330372724 implements MigrationInterface {
    name = ' $npmConfigName1745330372724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "otp" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "otpExpirationDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otpExpirationDate"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otp"`);
    }

}
