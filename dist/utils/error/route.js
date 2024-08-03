"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeWrapper = void 0;
const routeWrapper = (fn) => {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.routeWrapper = routeWrapper;
//# sourceMappingURL=route.js.map