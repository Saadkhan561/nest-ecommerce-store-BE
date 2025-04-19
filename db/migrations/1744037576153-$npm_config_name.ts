import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1744037576153 implements MigrationInterface {
    name = ' $npmConfigName1744037576153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "Product Options" DROP COLUMN "option_name"`);
        await queryRunner.query(`ALTER TABLE "Product Options" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43"`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "parentCategoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Product Options" DROP CONSTRAINT "FK_b561abbf2f35947f16809d780c8"`);
        await queryRunner.query(`ALTER TABLE "Product Options" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY ("parentCategoryId") REFERENCES "parent_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product Options" ADD CONSTRAINT "FK_b561abbf2f35947f16809d780c8" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product Options" DROP CONSTRAINT "FK_b561abbf2f35947f16809d780c8"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43"`);
        await queryRunner.query(`ALTER TABLE "Product Options" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Product Options" ADD CONSTRAINT "FK_b561abbf2f35947f16809d780c8" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "parentCategoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY ("parentCategoryId") REFERENCES "parent_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product Options" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "Product Options" ADD "option_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "color" character varying`);
    }

}
