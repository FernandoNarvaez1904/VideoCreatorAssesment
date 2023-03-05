import { MigrationInterface, QueryRunner } from "typeorm";

export class LikeCount1678001644338 implements MigrationInterface {
    name = 'LikeCount1678001644338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" ADD "likesCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "likesCount"`);
    }

}
