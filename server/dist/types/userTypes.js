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
exports.RegisterVars = exports.LoginResponse = exports.RegisterResponse = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const types_1 = require("../types");
let RegisterResponse = class RegisterResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], RegisterResponse.prototype, "ok", void 0);
__decorate([
    type_graphql_1.Field(() => [types_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], RegisterResponse.prototype, "errors", void 0);
RegisterResponse = __decorate([
    type_graphql_1.ObjectType()
], RegisterResponse);
exports.RegisterResponse = RegisterResponse;
let LoginResponse = class LoginResponse extends RegisterResponse {
};
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
exports.LoginResponse = LoginResponse;
let RegisterVars = class RegisterVars {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterVars.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterVars.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterVars.prototype, "password", void 0);
RegisterVars = __decorate([
    type_graphql_1.ArgsType()
], RegisterVars);
exports.RegisterVars = RegisterVars;
//# sourceMappingURL=userTypes.js.map