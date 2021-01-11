import {MigrationInterface, QueryRunner} from "typeorm";

export class addFullNameImgURLToUsersTable1609938157960 implements MigrationInterface {
    name = 'addFullNameImgURLToUsersTable1609938157960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "fullName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "imgURL" character varying NOT NULL DEFAULT '/user.jpeg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "imgURL"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullName"`);
    }

}
