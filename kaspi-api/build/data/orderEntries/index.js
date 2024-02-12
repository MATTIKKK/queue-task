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
exports.OrderEntryData = void 0;
const orderEntries_1 = require("../../db/orderEntries");
class OrderEntryData {
    static saveOrderEntry(orderEntryData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a new instance of the OrderEntryModel with the provided data
                const orderEntry = new orderEntries_1.OrderEntryModel(orderEntryData);
                // Save the new order entry to the database
                const savedDocument = yield orderEntry.save();
                if (savedDocument) {
                    console.log('Order entry saved successfully:', savedDocument);
                    return savedDocument;
                }
                else {
                    console.log('Failed to save order entry.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error in saveOrderEntry:', error);
                return null;
            }
        });
    }
}
exports.OrderEntryData = OrderEntryData;
