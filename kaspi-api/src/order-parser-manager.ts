import { OrderStateEnum } from "./data/orders";
import { initDatabase } from "./db/init-database";
import { fetchKaspiOrders } from "./domain/http-requests";
import { loadManagerParsingQueue } from "./domain/queues";
import { initRedis } from "./domain/redis/init-redis";

const start = async () => {
    loadManagerParsingQueue.add("manager-parsing-queue", {merchantId: "123", orderState: OrderStateEnum.DELIVERY}, {
        removeOnComplete: true,
        removeOnFail: true,
      });

    loadManagerParsingQueue.process("manager-parsing-queue", async(job, done) => {
        const { data } = job;

        try{
            const {merchantId, orderState} = data;
            await fetchKaspiOrders(merchantId, orderState);
        }catch(error: any) {

        }
    })
    console.log("loadmanagerParsingQueue", loadManagerParsingQueue)
}

initDatabase({main: true, tech: true}).then(async () => {
    await initRedis();
    start();
})