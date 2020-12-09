"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.uniqueErrors = exports.minLengthErrors = void 0;
const minLengthErrors = (field, value, minLength) => {
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
exports.minLengthErrors = minLengthErrors;
const uniqueErrors = (err) => {
    if (err.code === '23505') {
        if (err.detail.includes('username')) {
            console.log(err.detail);
            return [{ path: 'username', message: 'Username already taken' }];
        }
        return [{ path: 'email', message: 'Email already registered' }];
    }
    return [];
};
exports.uniqueErrors = uniqueErrors;
const isEmail = (value) => {
    const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regex.test(value);
};
exports.isEmail = isEmail;
//# sourceMappingURL=formValidations.js.map