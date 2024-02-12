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
exports.createOrder = exports.processOrderData = void 0;
const service_points_1 = require("../service-points");
const kaspi_delivery_1 = require("../kaspi-delivery");
const orders_1 = require("../../data/orders");
const addresses_1 = require("../addresses");
const customers_1 = require("../customers");
function processOrderData(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingOrder = yield orders_1.OrderData.findOne({ id: order.id });
        if (existingOrder) {
            console.log(`Заказ с ID ${order.id} уже существует.`);
            return;
        }
        yield createOrder(order);
        const tasks = [
            order.attributes.originAddress && (0, service_points_1.createOriginAddress)(order.attributes.originAddress),
            order.attributes.kaspiDelivery && (0, kaspi_delivery_1.createKaspiDelivery)(order.id, order.attributes.kaspiDelivery),
            order.attributes.deliveryAddress && (0, addresses_1.createAddress)(order.id, order.attributes.deliveryAddress),
            (0, customers_1.createCustomer)(order.attributes.customer),
        ];
        yield Promise.all(tasks.filter(Boolean));
    });
}
exports.processOrderData = processOrderData;
function createOrder(o) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let orderInstance = {
            id: o.id,
            customerId: o.attributes.customer.id,
            code: o.attributes.code,
            totalPrice: o.attributes.totalPrice,
            paymentMode: o.attributes.paymentMode,
            plannedDeliveryDate: o.attributes.plannedDeliveryDate || null,
            originAddressId: (_a = o.attributes.originAddress) === null || _a === void 0 ? void 0 : _a.id,
            creationDate: new Date(o.attributes.creationDate),
            isKaspiDelivery: o.attributes.isKaspiDelivery,
            deliveryMode: o.attributes.deliveryMode,
            signatureRequired: o.attributes.signatureRequired,
            creditTerm: o.attributes.creditTerm || 0,
            preOrder: o.attributes.preOrder,
            state: o.attributes.state,
            status: o.attributes.status,
            assembled: o.attributes.assembled,
            pickUpPointId: o.attributes.pickUpPointId,
            approvedByBankDate: new Date(o.attributes.approvedByBankDate),
            deliveryCost: o.attributes.deliveryCost || 0,
            deliveryCostForSeller: o.attributes.deliveryCostForSeller || 0,
        };
        yield orders_1.OrderData.saveOrder(orderInstance);
        console.log(`Заказ с ID ${o.id} успешно создан.`);
    });
}
exports.createOrder = createOrder;
