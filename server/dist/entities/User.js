"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.User = void 0;
const argon2_1 = require("argon2");
const class_validator_1 = require("class-validator");
const argon2_2 = require("argon2");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
const BaseColumns_1 = require("./BaseColumns");
const Profile_1 = require("./Profile");
const Follow_1 = require("./Follow");
let User = class User extends BaseColumns_1.BaseColumns {
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield argon2_1.hash(this.password);
        });
    }
    verifyPassword(password) {
        return argon2_2.verify(this.password, password);
    }
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsAlphanumeric(undefined, { message: 'Username must be alphanumeric' }),
    class_validator_1.MinLength(3, { message: 'Username must be atleast 3 characters long' }),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsEmail(undefined, { message: 'Invalid Email Address' }),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.MinLength(6, { message: 'Password must be atleast 6 characters long' }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(() => [Post_1.Post]),
    typeorm_1.OneToMany(() => Post_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    type_graphql_1.Field(() => Profile_1.Profile),
    typeorm_1.OneToOne(() => Profile_1.Profile, (profile) => profile.user, { eager: true }),
    __metadata("design:type", Profile_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    type_graphql_1.Field(() => [Follow_1.Follow]),
    typeorm_1.OneToMany(() => Follow_1.Follow, (follow) => follow.following),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    type_graphql_1.Field(() => [Follow_1.Follow]),
    typeorm_1.OneToMany(() => Follow_1.Follow, (follow) => follow.follower),
    __metadata("design:type", Array)
], User.prototype, "followings", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('users')
], User);
exports.User = User;
//# sourceMappingURL=User.js.map