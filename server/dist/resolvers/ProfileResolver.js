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
exports.ProfileResolver = exports.EditProfileResponse = exports.EditProfileArgs = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_upload_1 = require("graphql-upload");
const types_1 = require("../types");
const apollo_server_express_1 = require("apollo-server-express");
const uploadFile_1 = require("../utils/uploadFile");
const User_1 = require("../entities/User");
const Profile_1 = require("../entities/Profile");
const isAuth_1 = require("../middlewares/isAuth");
const class_validator_1 = require("class-validator");
const formatErrors_1 = require("../utils/formatErrors");
let EditProfileArgs = class EditProfileArgs {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EditProfileArgs.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EditProfileArgs.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EditProfileArgs.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EditProfileArgs.prototype, "website", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EditProfileArgs.prototype, "bio", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EditProfileArgs.prototype, "gender", void 0);
EditProfileArgs = __decorate([
    type_graphql_1.ArgsType()
], EditProfileArgs);
exports.EditProfileArgs = EditProfileArgs;
let EditProfileResponse = class EditProfileResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], EditProfileResponse.prototype, "ok", void 0);
__decorate([
    type_graphql_1.Field(() => [types_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], EditProfileResponse.prototype, "errors", void 0);
EditProfileResponse = __decorate([
    type_graphql_1.ObjectType()
], EditProfileResponse);
exports.EditProfileResponse = EditProfileResponse;
let ProfileResolver = class ProfileResolver {
    gender(profile, { req }) {
        if (req.session.userId == profile.userId) {
            return profile.gender;
        }
        return '';
    }
    name(profile, { req }) {
        if (req.session.userId == profile.userId) {
            return profile.name;
        }
        return '';
    }
    changeProfilePhoto(file, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            if (!userId) {
                throw new apollo_server_express_1.AuthenticationError('Not Authorized');
            }
            const profile = yield Profile_1.Profile.findOne({ where: { userId } });
            if (profile && file) {
                const { isUploaded, imgURL } = yield uploadFile_1.uploadFile(file, 'profile');
                console.log(isUploaded);
                if (isUploaded) {
                    profile.imgURL = imgURL;
                    yield profile.save();
                    return true;
                }
            }
            return false;
        });
    }
    removeProfilePhoto({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield Profile_1.Profile.findOne({
                where: { userId: req.session.userId },
            });
            if (profile) {
                profile.imgURL = '/user.jpg';
                yield profile.save();
                return true;
            }
            return false;
        });
    }
    editProfile({ name, gender, website, bio, email, username }, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const user = yield User_1.User.findOne(userId);
            const profile = yield Profile_1.Profile.findOne({ user });
            if (profile && user) {
                user.email = email;
                user.username = username;
                profile.gender = gender;
                profile.website = website;
                profile.name = name;
                profile.bio = bio;
                try {
                    const userErrors = yield class_validator_1.validate(user);
                    const profileErrors = yield class_validator_1.validate(profile);
                    if (userErrors.length > 0 || profileErrors.length > 0) {
                        const errors = formatErrors_1.formatErrors([...userErrors, ...profileErrors]);
                        return { ok: false, errors };
                    }
                    yield user.save();
                    yield profile.save();
                    return { ok: true };
                }
                catch (err) {
                    console.log(err);
                }
            }
            return {
                ok: false,
                errors: [{ path: 'unknown', message: 'Server Error' }],
            };
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Profile_1.Profile, Object]),
    __metadata("design:returntype", void 0)
], ProfileResolver.prototype, "gender", null);
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Profile_1.Profile, Object]),
    __metadata("design:returntype", void 0)
], ProfileResolver.prototype, "name", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('file', () => graphql_upload_1.GraphQLUpload, { nullable: true })),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "changeProfilePhoto", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "removeProfilePhoto", null);
__decorate([
    type_graphql_1.Mutation(() => EditProfileResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Args()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EditProfileArgs, Object]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "editProfile", null);
ProfileResolver = __decorate([
    type_graphql_1.Resolver(Profile_1.Profile)
], ProfileResolver);
exports.ProfileResolver = ProfileResolver;
//# sourceMappingURL=ProfileResolver.js.map