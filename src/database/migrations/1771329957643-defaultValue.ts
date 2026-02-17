import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultValue1771329957643 implements MigrationInterface {
    name = 'DefaultValue1771329957643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "dueDate" TIMESTAMP`);

        await queryRunner.query(`
          UPDATE "todo"
          SET "dueDate" = NOW()
          WHERE "dueDate" IS NULL
        `)

        await queryRunner.query(`
          ALTER TABLE "todo"
          ALTER COLUMN "dueDate" SET NOT NULL
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "dueDate"`);
    }

}
