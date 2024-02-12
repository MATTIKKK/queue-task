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
exports.CustomerData = void 0;
const customers_1 = require("../../db/customers");
class CustomerData {
    static findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return customers_1.CustomerModel.findOne(options);
        });
    }
    static saveCustomer(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = new customers_1.CustomerModel(customerData);
                const savedDocument = yield customer.save();
                if (savedDocument) {
                    console.log('Customer saved successfully:', savedDocument);
                    return savedDocument;
                }
                else {
                    console.log('Failed to save customer.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error in saveCustomer:', error);
                return null;
            }
        });
    }
}
exports.CustomerData = CustomerData;
