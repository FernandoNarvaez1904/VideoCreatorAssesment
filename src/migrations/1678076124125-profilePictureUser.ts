import { MigrationInterface, QueryRunner } from "typeorm";

export class profilePictureUser1678076124125 implements MigrationInterface {
    name = 'profilePictureUser1678076124125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "profilePictureUrl"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePictureUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePictureUrl"`);
        await queryRunner.query(`ALTER TABLE "video" ADD "profilePictureUrl" character varying`);
    }

}
