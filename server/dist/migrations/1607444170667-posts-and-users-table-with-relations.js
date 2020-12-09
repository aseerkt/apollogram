"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsAndUsersTableWithRelations1607444170667 = void 0;
class postsAndUsersTableWithRelations1607444170667 {
    constructor() {
        this.name = 'postsAndUsersTableWithRelations1607444170667';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e"`);
            yield queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "posts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "userId"`);
            yield queryRunner.query(`ALTER TABLE "posts" ADD "userId" uuid`);
            yield queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
            yield queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "userId"`);
            yield queryRunner.query(`ALTER TABLE "posts" ADD "userId" integer`);
            yield queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e"`);
            yield queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "posts" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
}
exports.postsAndUsersTableWithRelations1607444170667 = postsAndUsersTableWithRelations1607444170667;
//# sourceMappingURL=1607444170667-posts-and-users-table-with-relations.js.map