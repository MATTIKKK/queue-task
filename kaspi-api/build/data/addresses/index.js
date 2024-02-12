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
exports.AddressData = void 0;
const addresses_1 = require("../../db/addresses");
class AddressData {
    static findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return addresses_1.AddressModel.findOne(options);
        });
    }
    static saveAddress(addressData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = new addresses_1.AddressModel(addressData);
                const savedDocument = yield address.save();
                if (savedDocument) {
                    console.log('Address saved successfully:', savedDocument);
                    return savedDocument;
                }
                else {
                    console.log('Failed to save address.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error in saveAddress:', error);
                return null;
            }
        });
    }
}
exports.AddressData = AddressData;
