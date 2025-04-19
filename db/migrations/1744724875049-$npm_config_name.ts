import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1744724875049 implements MigrationInterface {
    name = ' $npmConfigName1744724875049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "customerId" integer NOT NULL, "totalAmount" integer NOT NULL, "discount" integer NOT NULL, "orderStatus" character varying NOT NULL, "shippingAddress" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "parent_category" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "parent_category" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "parent_category" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "category" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Product Options" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Product Options" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Product Options" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`ALTER TABLE "Product Options" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "Product Options" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "Product Options" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "parent_category" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "parent_category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "parent_category" DROP COLUMN "created_at"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
