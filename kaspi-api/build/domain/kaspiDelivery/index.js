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
exports.createKaspiDelivery = void 0;
const kaspiDeliveries_1 = require("../../data/kaspiDeliveries");
function createKaspiDelivery(id, o) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("o", o);
        let kaspiDeliveryInstance = {
            id: id,
            waybill: o.waybill,
            courierTransmissionDate: new Date(o.courierTransmissionDate),
            courierTransmissionPlanningDate: new Date(o.courierTransmissionPlanningDate),
            waybillNumber: o.waybillNumber,
            express: o.express,
            returnedToWarehouse: o.returnedToWarehouse,
            firstMileCourier: o.firstMileCourier,
        };
        yield kaspiDeliveries_1.KaspiDeliveryData.saveKaspiDelivery(kaspiDeliveryInstance);
    });
}
exports.createKaspiDelivery = createKaspiDelivery;
