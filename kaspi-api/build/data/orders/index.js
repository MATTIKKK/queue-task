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
exports.OrderData = exports.DeliveryTypeEnum = exports.DeliveryModeEnum = exports.PaymentModeEnum = exports.OrderStateEnum = exports.OrderStatusEnum = void 0;
const orders_1 = require("../../db/orders");
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum["APPROVED_BY_BANK"] = "APPROVED_BY_BANK";
    OrderStatusEnum["ACCEPTED_BY_MERCHANT"] = "ACCEPTED_BY_MERCHANT";
    OrderStatusEnum["COMPLETED"] = "COMPLETED";
    OrderStatusEnum["CANCELLED"] = "CANCELLED";
    OrderStatusEnum["CANCELLING"] = "CANCELLING";
    OrderStatusEnum["KASPI_DELIVERY_RETURN_REQUESTED"] = "KASPI_DELIVERY_RETURN_REQUESTED";
    OrderStatusEnum["RETURN_ACCEPTED_BY_MERCHANT"] = "RETURN_ACCEPTED_BY_MERCHANT";
    OrderStatusEnum["RETURNED"] = "RETURNED";
})(OrderStatusEnum || (exports.OrderStatusEnum = OrderStatusEnum = {}));
var OrderStateEnum;
(function (OrderStateEnum) {
    OrderStateEnum["NEW"] = "NEW";
    OrderStateEnum["SIGN_REQUIRED"] = "SIGN_REQUIRED";
    OrderStateEnum["PICKUP"] = "PICKUP";
    OrderStateEnum["DELIVERY"] = "DELIVERY";
    OrderStateEnum["KASPI_DELIVERY"] = "KASPI_DELIVERY";
    OrderStateEnum["ARCHIVE"] = "ARCHIVE";
})(OrderStateEnum || (exports.OrderStateEnum = OrderStateEnum = {}));
var PaymentModeEnum;
(function (PaymentModeEnum) {
    PaymentModeEnum["PAY_WITH_CREDIT"] = "PAY_WITH_CREDIT";
    PaymentModeEnum["PREPAID"] = "PREPAID";
})(PaymentModeEnum || (exports.PaymentModeEnum = PaymentModeEnum = {}));
var DeliveryModeEnum;
(function (DeliveryModeEnum) {
    DeliveryModeEnum["DELIVERY_LOCAL"] = "DELIVERY_LOCAL";
    DeliveryModeEnum["DELIVERY_PICKUP"] = "DELIVERY_PICKUP";
    DeliveryModeEnum["DELIVERY_REGIONAL_PICKUP"] = "DELIVERY_REGIONAL_PICKUP";
    DeliveryModeEnum["DELIVERY_REGIONAL_TODOOR"] = "DELICERY_REGIONAL_TODOOR";
})(DeliveryModeEnum || (exports.DeliveryModeEnum = DeliveryModeEnum = {}));
var DeliveryTypeEnum;
(function (DeliveryTypeEnum) {
    DeliveryTypeEnum["PICKUP"] = "PICKUP";
    DeliveryTypeEnum["DELIVERY"] = "DELIVERY";
})(DeliveryTypeEnum || (exports.DeliveryTypeEnum = DeliveryTypeEnum = {}));
class OrderData {
    static findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return orders_1.OrderModel.findOne(options);
        });
    }
    static saveOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = new orders_1.OrderModel(orderData);
                const savedDocument = yield order.save();
                if (savedDocument) {
                    console.log('Order saved successfully:', savedDocument);
                    return savedDocument;
                }
                else {
                    console.log('Failed to save order.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error in saveOrder:', error);
                return null;
            }
        });
    }
    static updateOrderStatus(options, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = options;
                const updatedDocument = yield orders_1.OrderModel.findOneAndUpdate(query, { $set: { status: newStatus } }, { new: true });
                if (updatedDocument) {
                    console.log('Order status updated successfully:', updatedDocument);
                    return updatedDocument;
                }
                else {
                    console.log('No matching order found or failed to update order status.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error in updateOrderStatus:', error);
                return null;
            }
        });
    }
    static updateOrderState(options, newState) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = options;
                const updatedDocument = yield orders_1.OrderModel.findOneAndUpdate(query, { $set: { state: newState } }, { new: true });
                if (updatedDocument) {
                    console.log('Order state updated successfully:', updatedDocument);
                    return updatedDocument;
                }
                else {
                    console.log('No matching order found or failed to update order state.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error in updateOrderState:', error);
                return null;
            }
        });
    }
}
exports.OrderData = OrderData;
