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
exports.ServicePointData = void 0;
const service_points_1 = require("../../db/service-points");
class ServicePointData {
    static findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return service_points_1.ServicePointModel.findOne(options);
        });
    }
    static saveServicePoint(ServicePointData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ServicePoint = new service_points_1.ServicePointModel(ServicePointData);
                const savedDocument = yield ServicePoint.save();
                if (savedDocument) {
                    console.log('ServicePoint saved successfully:', savedDocument);
                    return savedDocument;
                }
                else {
                    console.log('Failed to save ServicePoint.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error in saveServicePoint:', error);
                return null;
            }
        });
    }
}
exports.ServicePointData = ServicePointData;
