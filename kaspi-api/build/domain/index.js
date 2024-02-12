"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("../db");
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
// app.post('/add-shop-request', async (req, res) => {
//   try {
//     const { merchantId, orderState } = req.body; 
//     await addShopTask({ merchantId, orderState });
//     res.status(200).json({ message: 'Shop request added to queue.' });
//   } catch (error) {
//     console.error('Failed to add shop request:', error);
//     res.status(403 || 500).json({ error: 'Failed to add shop request to queue.' });
//   }
// });
app.use(router);
const server = http_1.default.createServer(app);
db_1.MongoDataBase.initMainDataBaseConnection();
server.listen(8080, () => {
    console.log('Server running on port http://localhost:8080/');
});
