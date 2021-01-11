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
exports.ProfileResolver = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_upload_1 = require("graphql-upload");
const apollo_server_express_1 = require("apollo-server-express");
const uploadFile_1 = require("../utils/uploadFile");
const User_1 = require("../entities/User");
let ProfileResolver = class ProfileResolver {
    updateProfile(fullName, file, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            if (!userId) {
                throw new apollo_server_express_1.AuthenticationError('Not Authorized');
            }
            const user = yield User_1.User.findOne(userId);
            if (file) {
                const { isUploaded, imgURL } = yield uploadFile_1.uploadFile(file, 'profile');
                console.log(isUploaded);
                if (isUploaded && user) {
                    user.imgURL = imgURL;
                    console.log(fullName);
                    user.fullName = fullName;
                    yield user.save();
                    return true;
                }
            }
            else {
                if (user) {
                    user.fullName = fullName;
                    yield user.save();
                    return true;
                }
            }
            return false;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('fullName')),
    __param(1, type_graphql_1.Arg('file', () => graphql_upload_1.GraphQLUpload, { nullable: true })),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "updateProfile", null);
ProfileResolver = __decorate([
    type_graphql_1.Resolver()
], ProfileResolver);
exports.ProfileResolver = ProfileResolver;
//# sourceMappingURL=ProfileResolver.js.map