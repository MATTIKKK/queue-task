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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchKaspiOrders = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const queues_1 = require("../queues");
const orderCache = new Map();
function fetchKaspiOrders(merchantId, orderState) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = 0;
        const maxOrdersPerPage = 100;
        const totalPagesToFetch = 5;
        let hasMore = true;
        while (hasMore) {
            try {
                const requests = Array.from({ length: totalPagesToFetch }, (_, index) => axios_1.default.get(`${config_1.config.API_URL}/orders`, getAxiosConfig(page + index, maxOrdersPerPage, orderState)));
                const responses = yield Promise.allSettled(requests);
                const successfulResponses = responses
                    .filter((result) => result.status === "fulfilled")
                    .map((result) => result.value.data.data);
                const allOrders = successfulResponses.flat();
                const newOrders = allOrders.filter((order) => !orderCache.has(order.id));
                for (const order of newOrders) {
                    yield queues_1.loadOrderParsingQueue.add("order-parsing-queue", order, {
                        removeOnComplete: true,
                        removeOnFail: true,
                    });
                    orderCache.set(order.id, true);
                }
                console.log("orders queue in htttpRequest", queues_1.loadOrderParsingQueue);
                hasMore = allOrders.length === totalPagesToFetch * maxOrdersPerPage;
                page += totalPagesToFetch;
            }
            catch (error) {
                console.error("Error fetching data from Kaspi API:", error);
                hasMore = false;
            }
        }
    });
}
exports.fetchKaspiOrders = fetchKaspiOrders;
function getAxiosConfig(page, maxOrdersPerPage, orderState) {
    const dateFrom = new Date("2023-10-16").getTime();
    const dateTill = new Date("2023-10-30").getTime();
    return {
        params: {
            "page[number]": page,
            "page[size]": maxOrdersPerPage,
            "filter[orders][state]": orderState,
            "filter[orders][creationDate][$ge]": dateFrom,
            "filter[orders][creationDate][$le]": dateTill,
        },
        headers: {
            "Content-Type": "application/vnd.api+json",
            "X-Auth-Token": config_1.config.KASPI_API_TOKEN,
        },
    };
}
