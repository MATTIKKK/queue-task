"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../controllers/orders");
const setupOrdersRoutes = (router) => {
    router.post("/orders", orders_1.getOrders);
};
exports.default = setupOrdersRoutes;
