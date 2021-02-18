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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const BaseColumns_1 = require("./BaseColumns");
const Comment_1 = require("./Comment");
const Like_1 = require("./Like");
const User_1 = require("./User");
let Post = class Post extends BaseColumns_1.BaseColumns {
    sortComments() {
        var _a;
        (_a = this.comments) === null || _a === void 0 ? void 0 : _a.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.MinLength(3, { message: 'Post caption must be minimum 3 characters long' }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "caption", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "imgURL", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.posts, {
        onDelete: 'CASCADE',
        eager: true,
        nullable: false,
    }),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Comment_1.Comment]),
    typeorm_1.OneToMany(() => Comment_1.Comment, (comment) => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    type_graphql_1.Field(() => [Like_1.Like]),
    typeorm_1.OneToMany(() => Like_1.Like, (like) => like.post),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Post.prototype, "sortComments", null);
Post = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('posts')
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map