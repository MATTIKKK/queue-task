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
exports.createCity = void 0;
const cities_1 = require("../../data/cities");
function createCity(city) {
    return __awaiter(this, void 0, void 0, function* () {
        let isExisting = yield cities_1.CityData.findOne({ id: city.id });
        console.log("isExisting", isExisting);
        if (isExisting) {
            console.log(`City with ID ${city.id} already exists.`);
            return;
        }
        let cityInstance = {
            id: city.id,
            code: city.code,
            name: city.name,
            active: city.active,
        };
        yield cities_1.CityData.saveCity(cityInstance);
    });
}
exports.createCity = createCity;
