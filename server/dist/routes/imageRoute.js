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
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.Router();
router.get('/:imageURN', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.readFile(path_1.default.join(`${__dirname}/../../images/${req.params.imageURN}`), (err, data) => {
        if (err || !data) {
            console.log(err);
            return res.status(404).send('Image Not Found');
        }
        console.log(data);
        res.setHeader('Content-Type', 'image/jpeg');
        return res.send(data);
    });
}));
exports.default = router;
//# sourceMappingURL=imageRoute.js.map