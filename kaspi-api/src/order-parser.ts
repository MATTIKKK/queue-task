import { initDatabase } from "./db/init-database";
import { processOrderData } from "./domain/orders";
import { loadOrderParsingQueue } from "./domain/queues";
import { initRedis } from "./domain/redis/init-redis";

const start = async () => {
    const numOfServers = 3;

    loadOrderParsingQueue.process("order-parsing-queue", numOfServers, async (job) => { 
        const { data } = job;
        console.log("dataaaaa", data);

        try {
          await processOrderData(data);
        } catch (error: any) {
          console.error("Error processing order:", error);
          job.moveToFailed({ message: error.message }, true);
        }
      });
}

initDatabase({main: true, tech: true}).then(async () => {
    await initRedis();
    start();
})