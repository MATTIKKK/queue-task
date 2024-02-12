"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePointModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = "ServicePoint";
const ServicePointSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    displayName: { type: String },
    address: {
        streetName: { type: String, required: true },
        streetNumber: { type: String, required: true },
        town: { type: String, required: true },
        district: { type: String },
        building: { type: String },
        apartment: { type: String },
        formattedAddress: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    cityId: { type: String },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
exports.ServicePointModel = __1.MongoDataBase.mainDataBaseConnection.model(COLLECTION_NAME, ServicePointSchema, COLLECTION_NAME);
