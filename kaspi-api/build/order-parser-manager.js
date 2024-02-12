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
const orders_1 = require("./data/orders");
const init_database_1 = require("./db/init-database");
const http_requests_1 = require("./domain/http-requests");
const queues_1 = require("./domain/queues");
const init_redis_1 = require("./domain/redis/init-redis");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    queues_1.loadManagerParsingQueue.add("manager-parsing-queue", { merchantId: "123", orderState: orders_1.OrderStateEnum.ARCHIVE }, {
        removeOnComplete: true,
        removeOnFail: true,
    });
    queues_1.loadManagerParsingQueue.process("manager-parsing-queue", (job, done) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = job;
        try {
            const { merchantId, orderState } = data;
            yield (0, http_requests_1.fetchKaspiOrders)(merchantId, orderState);
        }
        catch (error) {
        }
    }));
    console.log("loadmanagerParsingQueue", queues_1.loadManagerParsingQueue);
});
(0, init_database_1.initDatabase)({ main: true, tech: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, init_redis_1.initRedis)();
    start();
}));
