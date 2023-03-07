import { MigrationInterface, QueryRunner } from "typeorm";

export class emailInUserRequired1678168598537 implements MigrationInterface {
    name = 'emailInUserRequired1678168598537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
    }

}
