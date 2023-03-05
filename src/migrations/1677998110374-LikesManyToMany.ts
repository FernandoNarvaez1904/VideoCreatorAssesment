import { MigrationInterface, QueryRunner } from "typeorm";

export class LikesManyToMany1677998110374 implements MigrationInterface {
    name = 'LikesManyToMany1677998110374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_liked_videos_video" ("userId" integer NOT NULL, "videoId" integer NOT NULL, CONSTRAINT "PK_790ad99f53493514bd5a8b1a045" PRIMARY KEY ("userId", "videoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43ac4fa88fa99db3024852035c" ON "user_liked_videos_video" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b37e27f93a951d7df719520ce6" ON "user_liked_videos_video" ("videoId") `);
        await queryRunner.query(`ALTER TABLE "user_liked_videos_video" ADD CONSTRAINT "FK_43ac4fa88fa99db3024852035cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_liked_videos_video" ADD CONSTRAINT "FK_b37e27f93a951d7df719520ce65" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_liked_videos_video" DROP CONSTRAINT "FK_b37e27f93a951d7df719520ce65"`);
        await queryRunner.query(`ALTER TABLE "user_liked_videos_video" DROP CONSTRAINT "FK_43ac4fa88fa99db3024852035cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b37e27f93a951d7df719520ce6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_43ac4fa88fa99db3024852035c"`);
        await queryRunner.query(`DROP TABLE "user_liked_videos_video"`);
    }

}
