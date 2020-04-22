"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationError extends Error {
    constructor(message) {
        super(`Auth Exception: ${message}`);
    }
}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=auth.error.js.map