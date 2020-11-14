"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueErrors = exports.minLengthErrors = void 0;
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
exports.uniqueErrors = (err) => {
    if (err.code === '23505') {
        if (err.detail.includes('username')) {
            console.log(err.detail);
            return [{ path: 'username', message: 'Username already taken' }];
        }
        return [{ path: 'email', message: 'Email already registered' }];
    }
    return [];
};
//# sourceMappingURL=formValidations.js.map