"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    db: {
        username: process.env.DB_USERNAME || 'default_username',
        password: process.env.DB_PASSWORD || 'default_password',
    }
};
