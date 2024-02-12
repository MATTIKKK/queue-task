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
exports.CityData = void 0;
const cities_1 = require("../../db/cities");
class CityData {
    static findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return cities_1.CityModel.findOne(options);
        });
    }
    static saveCity(cityData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const city = new cities_1.CityModel(cityData);
                const savedDocument = yield city.save();
                if (savedDocument) {
                    console.log("City saved successfully:", savedDocument);
                    return savedDocument;
                }
                else {
                    console.log("Failed to save city.");
                    return null;
                }
            }
            catch (error) {
                console.error("Error in createCity:", error);
                return null;
            }
        });
    }
}
exports.CityData = CityData;
