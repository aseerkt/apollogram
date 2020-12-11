"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/postImage', (req, res) => {
    const { userId } = req.session;
    console.log(userId);
    res.send(userId);
});
exports.default = router;
//# sourceMappingURL=uploadFile.js.map