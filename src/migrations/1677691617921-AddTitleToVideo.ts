import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleToVideo1677691617921 implements MigrationInterface {
    name = 'AddTitleToVideo1677691617921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "title"`);
    }

}
