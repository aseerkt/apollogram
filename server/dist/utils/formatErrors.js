"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrors = void 0;
const formatErrors = (errors) => {
    let formatedErrors = [];
    errors.forEach(({ property, constraints }) => {
        formatedErrors.push({
            path: property,
            message: Object.values(constraints)[0],
        });
    });
    return formatedErrors;
};
exports.formatErrors = formatErrors;
//# sourceMappingURL=formatErrors.js.map