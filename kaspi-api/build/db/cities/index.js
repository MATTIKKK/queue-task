"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = "City";
const CitySchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    name: { type: String, },
    active: { type: Boolean, },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
CitySchema.index({ id: 1 });
exports.CityModel = __1.MongoDataBase.mainDataBaseConnection.model(COLLECTION_NAME, CitySchema, COLLECTION_NAME);
