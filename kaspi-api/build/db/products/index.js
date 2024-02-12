"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = "Product";
const ProductSchema = new mongoose_1.Schema({
    id: { type: String, unique: true },
    code: { type: String },
    name: { type: String },
    category: { type: String },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
exports.ProductModel = __1.MongoDataBase.mainDataBaseConnection.model(COLLECTION_NAME, ProductSchema, COLLECTION_NAME);
