import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVideoData1677695472918 implements MigrationInterface {
    name = 'AddVideoData1677695472918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" ADD "url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "video" ADD "thumbnailUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "video" ADD "isPublished" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "video" ADD "creationDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "video" ADD "lastUpdateDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "video" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "video" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "lastUpdateDate"`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "creationDate"`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "isPublished"`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "thumbnailUrl"`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "url"`);
    }

}
