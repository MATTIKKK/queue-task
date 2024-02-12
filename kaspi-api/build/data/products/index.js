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
exports.ProductData = void 0;
const products_1 = require("../../db/products");
class ProductData {
    static saveProduct(ProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Product = new products_1.ProductModel(ProductData);
                const savedDocument = yield Product.save();
                if (savedDocument) {
                    console.log('Product saved successfully:', savedDocument);
                    return savedDocument;
                }
                else {
                    console.log('Failed to save Product.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error in createProduct:', error);
                return null;
            }
        });
    }
}
exports.ProductData = ProductData;
