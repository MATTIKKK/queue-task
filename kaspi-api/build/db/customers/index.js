"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = "Customer";
const CustomerSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cellPhone: { type: String, required: true },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
CustomerSchema.index({ id: 1 });
exports.CustomerModel = __1.MongoDataBase.mainDataBaseConnection.model(COLLECTION_NAME, CustomerSchema, COLLECTION_NAME);
