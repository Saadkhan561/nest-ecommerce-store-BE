import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1757540873524 implements MigrationInterface {
    name = ' $npmConfigName1757540873524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_img_urls" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_da83926a839b5b48a2d1433218c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "img_url"`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "img_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_img_urls" ADD CONSTRAINT "FK_61749fc496f6e21c34b7064b131" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_img_urls" DROP CONSTRAINT "FK_61749fc496f6e21c34b7064b131"`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "img_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "img_url" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "product_img_urls"`);
    }

}
