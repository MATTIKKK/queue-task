"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = "Address";
const AddressSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    streetName: { type: String, required: true },
    streetNumber: { type: String, required: true },
    town: { type: String, required: false },
    district: { type: String, required: false },
    building: { type: String, required: false },
    apartment: { type: String, required: false },
    formattedAddress: { type: String, required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
AddressSchema.index({ id: 1 });
exports.AddressModel = __1.MongoDataBase.mainDataBaseConnection.model(COLLECTION_NAME, AddressSchema, COLLECTION_NAME);
