import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriceUnitToOrderItem1716353202798 implements MigrationInterface {
    name = 'AddPriceUnitToOrderItem1716353202798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" ADD "priceUnit" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "priceUnit"`);
    }

}
