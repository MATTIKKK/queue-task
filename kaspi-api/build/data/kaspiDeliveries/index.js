"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KaspiDeliveryData = void 0;
const kaspiDeliveries_1 = require("../../db/kaspiDeliveries");
class KaspiDeliveryData {
    static saveKaspiDelivery(kaspiDeliveryData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a delivery with the same unique identifier already exists
                const existingDelivery = yield kaspiDeliveries_1.KaspiDeliveryModel.findOne({ waybill: kaspiDeliveryData.waybill }).exec();
                if (existingDelivery) {
                    console.log('Kaspi delivery already exists:', existingDelivery);
                    return existingDelivery; // or handle as needed
                }
                // If not, save the new delivery
                const savedDocument = yield new kaspiDeliveries_1.KaspiDeliveryModel(kaspiDeliveryData).save();
                console.log('Kaspi delivery saved successfully:', savedDocument);
                return savedDocument;
            }
            catch (error) {
                console.error('Error in saveKaspiDelivery:', error);
                return null;
            }
        });
    }
}
exports.KaspiDeliveryData = KaspiDeliveryData;
