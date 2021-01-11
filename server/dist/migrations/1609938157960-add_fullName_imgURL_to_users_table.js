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
exports.addFullNameImgURLToUsersTable1609938157960 = void 0;
class addFullNameImgURLToUsersTable1609938157960 {
    constructor() {
        this.name = 'addFullNameImgURLToUsersTable1609938157960';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "fullName" character varying NOT NULL DEFAULT ''`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "imgURL" character varying NOT NULL DEFAULT '/user.jpeg'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "imgURL"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullName"`);
        });
    }
}
exports.addFullNameImgURLToUsersTable1609938157960 = addFullNameImgURLToUsersTable1609938157960;
//# sourceMappingURL=1609938157960-add_fullName_imgURL_to_users_table.js.map