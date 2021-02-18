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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.PostResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const class_validator_1 = require("class-validator");
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const types_1 = require("../types");
const formatErrors_1 = require("../utils/formatErrors");
const uploadFile_1 = require("../utils/uploadFile");
let CreatePostResponse = class CreatePostResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CreatePostResponse.prototype, "ok", void 0);
__decorate([
    type_graphql_1.Field(() => Post_1.Post, { nullable: true }),
    __metadata("design:type", Post_1.Post)
], CreatePostResponse.prototype, "post", void 0);
__decorate([
    type_graphql_1.Field(() => types_1.FieldError, { nullable: true }),
    __metadata("design:type", types_1.FieldError)
], CreatePostResponse.prototype, "error", void 0);
CreatePostResponse = __decorate([
    type_graphql_1.ObjectType()
], CreatePostResponse);
let PostResolver = class PostResolver {
    getPosts() {
        return Post_1.Post.find({
            order: { createdAt: 'DESC' },
            relations: ['user', 'likes', 'comments', 'likes.user', 'comments.user'],
        });
    }
    getSinglePost(postId) {
        return Post_1.Post.findOne({
            where: { id: postId },
            relations: ['user', 'likes', 'comments', 'likes.user', 'comments.user'],
        });
    }
    addPost(caption, { req }, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ id: req.session.userId });
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError('Unauthorized');
            }
            const { isUploaded, imgURL } = yield uploadFile_1.uploadFile(file, 'posts');
            if (isUploaded) {
                const post = Post_1.Post.create({ caption, imgURL, user });
                const errors = yield class_validator_1.validate(post);
                if (errors.length > 0) {
                    return { ok: false, error: formatErrors_1.formatErrors(errors)[0] };
                }
                yield post.save();
                return { ok: true, post };
            }
            return { ok: false, error: { path: 'file', message: 'File Upload Fail' } };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Post_1.Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "getPosts", null);
__decorate([
    type_graphql_1.Query(() => Post_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "getSinglePost", null);
__decorate([
    type_graphql_1.Mutation(() => CreatePostResponse),
    __param(0, type_graphql_1.Arg('caption')),
    __param(1, type_graphql_1.Ctx()),
    __param(2, type_graphql_1.Arg('file', () => graphql_upload_1.GraphQLUpload)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "addPost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=PostResolver.js.map