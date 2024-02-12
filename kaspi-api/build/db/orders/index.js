"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = "Order";
const OrderSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    totalPrice: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    originAddressId: { type: String, required: false },
    plannedDeliveryDate: { type: Date, required: false },
    creationDate: { type: Date, required: true },
    isKaspiDelivery: { type: Boolean, required: true },
    deliveryMode: { type: String, required: true },
    signatureRequired: { type: Boolean, required: true },
    creditTerm: { type: Number, required: false },
    preOrder: { type: Boolean, required: false },
    assembled: { type: Boolean, required: false },
    pickUpPointId: { type: String, required: false },
    state: { type: String, required: true },
    status: { type: String, required: true },
    approvedByBankDate: { type: Date, required: false },
    deliveryCostForSeller: { type: Number, required: false },
    deliveryCost: { type: Number, required: false },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
OrderSchema.index({ id: 1 });
exports.OrderModel = __1.MongoDataBase.mainDataBaseConnection.model(COLLECTION_NAME, OrderSchema, COLLECTION_NAME);
