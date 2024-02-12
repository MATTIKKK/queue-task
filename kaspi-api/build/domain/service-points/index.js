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
exports.createOriginAddress = void 0;
const service_points_1 = require("../../data/service-points");
const cities_1 = require("../cities");
function createOriginAddress(o) {
    return __awaiter(this, void 0, void 0, function* () {
        let isExisting = yield service_points_1.ServicePointData.findOne({ id: o.id });
        if (isExisting) {
            console.log(`Service point with ID ${o.id} already exists.`);
            return;
        }
        let originAddressInstance = {
            id: o.id,
            displayName: o.displayName,
            address: {
                streetName: o.address.streetName.trim(),
                streetNumber: o.address.streetNumber.trim(),
                town: o.address.town.trim(),
                district: o.address.district,
                building: o.address.building,
                apartment: o.address.apartment,
                formattedAddress: o.address.formattedAddress.trim(),
                latitude: o.address.latitude,
                longitude: o.address.longitude,
            },
            cityId: o.city.id,
        };
        yield service_points_1.ServicePointData.saveServicePoint(originAddressInstance);
        yield (0, cities_1.createCity)(o.city);
    });
}
exports.createOriginAddress = createOriginAddress;
