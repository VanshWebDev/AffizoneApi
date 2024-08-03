"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OurErr = void 0;
/**
 * Custom Error Class to handle application-specific errors.
 * Extends the built-in JavaScript `Error` class.
 */
class OurErr extends Error {
    /**
     * Creates an instance of OurErr.
     *
     * @param ErrObj - An object containing error details.
     * @param ErrObj.status - The HTTP status code representing the error type (e.g., 404 for Not Found).
     * @param ErrObj.message - The error message providing more details about the error.
     * @param ErrObj.forFrontend - True if you want to send error message to the frontend.
     */
    constructor(ErrObj) {
        const { status, message, forFrontend } = ErrObj;
        super();
        this.status = status;
        this.message = message;
        this.forFrontend = forFrontend;
    }
}
exports.OurErr = OurErr;
//# sourceMappingURL=errorClass.js.map