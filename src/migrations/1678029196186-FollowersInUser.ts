import { MigrationInterface, QueryRunner } from "typeorm";

export class FollowersInUser1678029196186 implements MigrationInterface {
    name = 'FollowersInUser1678029196186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_follows_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_1164fd658af3fb6c24aa37405d9" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_911345dc417fb10f25f7644cc6" ON "user_follows_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_da5eb1d232421542d4fb33ac41" ON "user_follows_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "user_follows_user" ADD CONSTRAINT "FK_911345dc417fb10f25f7644cc60" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_follows_user" ADD CONSTRAINT "FK_da5eb1d232421542d4fb33ac417" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_follows_user" DROP CONSTRAINT "FK_da5eb1d232421542d4fb33ac417"`);
        await queryRunner.query(`ALTER TABLE "user_follows_user" DROP CONSTRAINT "FK_911345dc417fb10f25f7644cc60"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da5eb1d232421542d4fb33ac41"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_911345dc417fb10f25f7644cc6"`);
        await queryRunner.query(`DROP TABLE "user_follows_user"`);
    }

}
