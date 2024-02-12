"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntryModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = "OrderEntry";
const OrderEntrySchema = new mongoose_1.Schema({
    id: { type: String, },
    orderId: { type: String, },
    productId: { type: String, },
    quantity: { type: Number, },
    totalPrice: { type: Number, },
    entryNumber: { type: Number, },
    deliveryCost: { type: Number, },
    basePrice: { type: Number, },
    servicePointId: { type: String, },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
exports.OrderEntryModel = __1.MongoDataBase.mainDataBaseConnection.model(COLLECTION_NAME, OrderEntrySchema, COLLECTION_NAME);
