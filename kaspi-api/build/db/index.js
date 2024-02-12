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
exports.MongoDataBase = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
class MongoDataBase {
    static initMainDataBaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Trying to connect to ${config_1.config.mainMongoConnectionUrl}`);
            return MongoDataBase.mainDataBaseConnection
                .connect(config_1.config.mainMongoConnectionUrl)
                .then(() => console.log(`Connected to ${config_1.config.mainMongoConnectionUrl}`))
                .catch((error) => {
                console.log(`Couldn't connect to ${config_1.config.mainMongoConnectionUrl}`);
                throw error;
            });
        });
    }
}
exports.MongoDataBase = MongoDataBase;
MongoDataBase.mainDataBaseConnection = new mongoose_1.Mongoose();
