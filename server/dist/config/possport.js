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
exports.FacebookOAuthSetup = void 0;
const passport_facebook_1 = require("passport-facebook");
const constants_1 = require("../constants");
const User_1 = require("../entities/User");
const FacebookOAuthSetup = (passport) => {
    passport.use(new passport_facebook_1.Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: `${constants_1.EXPRESS_ENDPOINT}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'emails', 'gender'],
    }, (accessToken, _refreshToken, profile, _done) => __awaiter(void 0, void 0, void 0, function* () {
        const imgURL = `https://graph.facebook.com/${profile.id}/picture?width=250&height=250&access_token=${accessToken}`;
        console.log(profile);
    })));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne(id);
            done(null, user);
        }
        catch (err) {
            done(err, false);
        }
    }));
};
exports.FacebookOAuthSetup = FacebookOAuthSetup;
//# sourceMappingURL=possport.js.map