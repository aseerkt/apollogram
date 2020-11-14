"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minLengthErrors = void 0;
exports.minLengthErrors = (field, value, minLength) => {
    if (value.length < minLength) {
        return [
            {
                path: field,
                message: `${field[0].toUpperCase()}${field.slice(1)} must be ${minLength} or more characters long`,
            },
        ];
    }
    else {
        return [];
    }
};
//# sourceMappingURL=registerFormValidation.js.map