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
const init_database_1 = require("./db/init-database");
const orders_1 = require("./domain/orders");
const queues_1 = require("./domain/queues");
const init_redis_1 = require("./domain/redis/init-redis");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const numOfServers = 3;
    queues_1.loadOrderParsingQueue.process("order-parsing-queue", numOfServers, (job) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = job;
        console.log("dataaaaa", data);
        try {
            yield (0, orders_1.processOrderData)(data);
        }
        catch (error) {
            console.error("Error processing order:", error);
            job.moveToFailed({ message: error.message }, true);
        }
    }));
});
(0, init_database_1.initDatabase)({ main: true, tech: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, init_redis_1.initRedis)();
    start();
}));
