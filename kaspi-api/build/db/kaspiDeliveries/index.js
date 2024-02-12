"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KaspiDeliveryModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = "KaspiDelivery";
const KaspiDeliverySchema = new mongoose_1.Schema({
    id: { type: String },
    waybill: { type: String },
    courierTransmissionDate: { type: Date },
    courierTransmissionPlanningDate: { type: Date },
    waybillNumber: { type: String },
    express: { type: Boolean },
    returnedToWarehouse: { type: Boolean },
    firstMileCourier: { type: String },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
exports.KaspiDeliveryModel = __1.MongoDataBase.mainDataBaseConnection.model(COLLECTION_NAME, KaspiDeliverySchema, COLLECTION_NAME);
