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
exports.createAddress = void 0;
const addresses_1 = require("../../data/addresses");
function createAddress(id, o) {
    return __awaiter(this, void 0, void 0, function* () {
        let AddressInstance = {
            id,
            streetName: o.streetName.trim(),
            streetNumber: o.streetNumber.trim(),
            town: o.town.trim(),
            district: o.district,
            building: o.building,
            apartment: o.apartment,
            formattedAddress: o.formattedAddress.trim(),
            latitude: o.latitude,
            longitude: o.longitude,
        };
        yield addresses_1.AddressData.saveAddress(AddressInstance);
    });
}
exports.createAddress = createAddress;
