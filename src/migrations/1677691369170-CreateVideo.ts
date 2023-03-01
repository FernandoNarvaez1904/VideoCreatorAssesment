import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVideo1677691369170 implements MigrationInterface {
    name = 'CreateVideo1677691369170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "video" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "video"`);
    }

}
