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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
require("colors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const graphql_upload_1 = require("graphql-upload");
const redis_1 = require("redis");
const passport_1 = __importDefault(require("passport"));
const constants_1 = require("./constants");
const imageRoute_1 = __importDefault(require("./routes/imageRoute"));
const fb_oauth_1 = __importDefault(require("./routes/fb-oauth"));
const possport_1 = require("./config/possport");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
    const app = express_1.default();
    app.use(cors_1.default({
        origin: constants_1.__prod__ ? process.env.FRONTEND_URL : 'http://localhost:3000',
        credentials: true,
    }));
    console.log(constants_1.EXPRESS_ENDPOINT);
    app.use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
    app.use('/images', imageRoute_1.default);
    app.use('/auth', fb_oauth_1.default);
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    possport_1.FacebookOAuthSetup(passport_1.default);
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.createClient();
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({ client: redisClient, disableTouch: true }),
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: 'lax',
        },
        secret: constants_1.__prod__ ? process.env.SESSION_SECRET : 'secretForYa',
        resave: false,
        saveUninitialized: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [`${__dirname}/resolvers/**/*.{ts,js}`],
        }),
        context: ({ req, res }) => ({ req, res }),
        uploads: false,
    });
    apolloServer.applyMiddleware({ app, cors: false });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Graph API is running at http://localhost:${PORT}${apolloServer.graphqlPath}`
            .blue.bold);
    });
});
main().catch((err) => console.log('Root Error: ', err));
//# sourceMappingURL=index.js.map