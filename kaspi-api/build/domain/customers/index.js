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
exports.createCustomer = void 0;
const customers_1 = require("../../data/customers");
function createCustomer(c) {
    return __awaiter(this, void 0, void 0, function* () {
        let isExisting = yield customers_1.CustomerData.findOne({ id: c.id });
        if (isExisting) {
            console.log(`Customer with ID ${c.id} already exists.`);
            return;
        }
        let customerInstance = {
            id: c.id,
            name: c.name,
            firstName: c.firstName,
            lastName: c.lastName,
            cellPhone: c.cellPhone,
        };
        yield customers_1.CustomerData.saveCustomer(customerInstance);
    });
}
exports.createCustomer = createCustomer;
