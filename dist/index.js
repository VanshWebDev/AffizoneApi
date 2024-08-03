"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load environment variables from .env file
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Third-Party Middleware
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
// Core Dependencies and Libraries
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// Importing Routes
const auth_route_1 = __importDefault(require("./routes/auth.route"));
// Configuration
const optionObj_1 = require("./constant/optionObj/optionObj");
const errorClass_1 = require("./utils/error/errorClass");
// Environment variable
const cookieSecret = process.env.COOKIE_SECRET;
const mongodbUrl = process.env.MONGODB_URL || "";
// Initialize Express App
const app = (0, express_1.default)();
const port = 3000;
// Database Connection
mongoose_1.default
    .connect(mongodbUrl)
    .then(() => console.log("connected to the server🍀"))
    .catch((err) => {
    throw new errorClass_1.OurErr({
        status: 500,
        message: "Server not connected🐞",
        forFrontend: true,
    });
});
// Middleware Configuration
app.use((0, cors_1.default)(optionObj_1.corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)(cookieSecret));
app.use((0, express_session_1.default)(optionObj_1.expressSessionOptions));
app.use(express_1.default.json());
//Routes prefix
app.use("/auth", auth_route_1.default);
app.use((err, req, res, next) => {
    const { status = 500, message = "some error occured", forFrontend } = err;
    if (forFrontend)
        res.status(status).json({ message: message });
    console.log("🐞 Err Middlaware:", message);
    next();
});
// Start Server
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map