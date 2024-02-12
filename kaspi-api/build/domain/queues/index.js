"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOrderParsingQueue = exports.loadManagerParsingQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const config_1 = require("../../config");
exports.loadManagerParsingQueue = new bull_1.default('manager-parsing-queue', config_1.config.redisUrl);
exports.loadOrderParsingQueue = new bull_1.default('order-parsing-queue', config_1.config.redisUrl);
