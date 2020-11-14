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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = exports.UserResponse = void 0;
const User_1 = require("../entity/User");
const type_graphql_1 = require("type-graphql");
const types_1 = require("../types");
const argon2_1 = __importDefault(require("argon2"));
const formValidations_1 = require("../utils/formValidations");
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], UserResponse.prototype, "ok", void 0);
__decorate([
    type_graphql_1.Field(() => [types_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
exports.UserResponse = UserResponse;
let UserResolver = class UserResolver {
    hello() {
        return 'hi';
    }
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user1 = yield User_1.User.findOne({ email });
            if (user1) {
                return {
                    ok: false,
                    errors: [{ path: 'email', message: 'Email already registered' }],
                };
            }
            const user2 = yield User_1.User.findOne({ username });
            if (user2) {
                return {
                    ok: false,
                    errors: [{ path: 'username', message: 'Username is taken' }],
                };
            }
            let errors = [];
            errors.push(...formValidations_1.minLengthErrors('username', username, 3), ...formValidations_1.minLengthErrors('password', password, 6));
            if (errors.length > 0) {
                return { ok: false, errors };
            }
            const hashedPassword = yield argon2_1.default.hash(password);
            const user = User_1.User.create({ username, email, password: hashedPassword });
            try {
                yield user.save();
                return { ok: true };
            }
            catch (err) {
                console.log(err.code);
                let errors = formValidations_1.uniqueErrors(err);
                if (errors.length > 0)
                    return { ok: false, errors };
                return { ok: false };
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
                const valid = yield argon2_1.default.verify(user.password, password);
                if (!valid) {
                    return {
                        ok: false,
                        errors: [{ path: 'password', message: 'Invalid Password' }],
                    };
                }
                req.session.userId = user.id;
                return { ok: true };
            }
            catch (err) {
                return { ok: false };
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg('username')),
    __param(1, type_graphql_1.Arg('email')),
    __param(2, type_graphql_1.Arg('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg('username')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map