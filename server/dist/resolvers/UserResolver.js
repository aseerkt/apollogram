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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const User_1 = require("../entities/User");
const userTypes_1 = require("../types/userTypes");
const formatErrors_1 = require("../utils/formatErrors");
const constants_1 = require("../constants");
const Profile_1 = require("../entities/Profile");
let UserResolver = class UserResolver {
    email(user, { req }) {
        if (req.session.userId === user.id) {
            return user.email;
        }
        return '';
    }
    me({ req }) {
        return User_1.User.findOne({
            where: { id: req.session.userId },
            relations: ['followers', 'followings'],
        });
    }
    getUser(username) {
        return User_1.User.findOne({
            where: { username },
            relations: [
                'posts',
                'posts.likes',
                'posts.comments',
                'posts.comments.user',
                'followers',
                'followings',
            ],
        });
    }
    register({ email, username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = [];
            const emailUser = yield User_1.User.findOne({ email });
            const usernameUser = yield User_1.User.findOne({ username });
            if (emailUser)
                errors.push({ path: 'email', message: 'Email already registered' });
            if (usernameUser)
                errors.push({ path: 'username', message: 'Username already taken' });
            if (errors.length > 0)
                return {
                    ok: false,
                    errors,
                };
            const user = User_1.User.create({ username, email, password });
            errors = yield class_validator_1.validate(user);
            if (errors.length > 0) {
                console.log(errors);
                return { ok: false, errors: formatErrors_1.formatErrors(errors) };
            }
            try {
                yield user.save();
                yield Profile_1.Profile.create({ userId: user.id }).save();
                return { ok: true };
            }
            catch (err) {
                console.log(err);
                try {
                    yield user.remove();
                }
                catch (err) { }
                return {
                    ok: false,
                    errors: [{ path: 'unknown', message: 'Server Error' }],
                };
            }
        });
    }
    login(username, password, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ username });
                if (!user) {
                    return {
                        ok: false,
                        errors: [{ path: 'username', message: 'User does not exist' }],
                    };
                }
                const valid = yield user.verifyPassword(password);
                if (!valid) {
                    return {
                        ok: false,
                        errors: [{ path: 'password', message: 'Incorrect Password' }],
                    };
                }
                req.session.userId = user.id;
                return { ok: true, user };
            }
            catch (err) {
                return { ok: false };
            }
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => {
            req.session.destroy((err) => {
                if (err) {
                    resolve(false);
                }
                res.clearCookie(constants_1.COOKIE_NAME);
                resolve(true);
            });
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "email", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUser", null);
__decorate([
    type_graphql_1.Mutation(() => userTypes_1.RegisterResponse),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userTypes_1.RegisterVars]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => userTypes_1.LoginResponse),
    __param(0, type_graphql_1.Arg('username')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map