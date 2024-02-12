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
exports.createProduct = void 0;
const products_1 = require("../../data/products");
function createProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        let productInstance = {
            code: product.attributes.code,
            name: product.attributes.name,
            category: product.attributes.category,
        };
        yield products_1.ProductData.saveProduct(productInstance);
    });
}
exports.createProduct = createProduct;
