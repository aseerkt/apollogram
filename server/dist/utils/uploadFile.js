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
exports.uploadFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
function uploadFile(file, pathPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        const { filename, createReadStream } = yield file;
        const uploadTime = new Date().toISOString();
        const pathName = path_1.default.join(__dirname, '../images', pathPrefix, `${uploadTime}_${filename}`);
        const dirname = path_1.default.dirname(pathName);
        if (!fs_1.existsSync(dirname)) {
            fs_1.mkdirSync(dirname, { recursive: true });
        }
        const imgURL = `/images/${pathPrefix}/${uploadTime}_${filename}`;
        const writeStream = fs_1.createWriteStream(pathName);
        const isUploaded = yield new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            return createReadStream()
                .pipe(writeStream)
                .on('close', () => {
                console.log('closed');
                res(true);
            })
                .on('error', (err) => {
                console.log(err);
                rej(false);
            });
        }));
        return { isUploaded, imgURL };
    });
}
exports.uploadFile = uploadFile;
//# sourceMappingURL=uploadFile.js.map