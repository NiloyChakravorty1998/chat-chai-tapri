"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
//INITIALIZE SERVER AND OTHER CONFIGS
//CONFIG
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || '5000';
app.use((0, cors_1.default)());
//MIDDLEWARES
app.use(express_1.default.json());
app.use(helmet_1.default.crossOriginResourcePolicy({
    policy: "cross-origin"
}));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
//START SERVER
app.listen(port, () => {
    app.get('/api/chat/health', (req, res) => {
        res.send(`<html><body><center> Server is UP and Running </center></body></html>`);
    });
    console.log(`Server started at http://localhost:${port}`);
});
