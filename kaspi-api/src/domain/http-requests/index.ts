import axios, { AxiosResponse } from "axios";
import { config } from "../../config";
import { OrderStateEnum, OrderStatusEnum } from "../../data/orders";
import { Order} from "../../helpers";
import { loadOrderParsingQueue } from "../queues";

const orderCache = new Map();

export async function fetchKaspiOrders(merchantId: string, orderState: OrderStateEnum) {
  let page = 0;
  const maxOrdersPerPage = 100;
  const totalPagesToFetch = 5;
  let hasMore = true;

  while (hasMore) { 
    try {
      const requests = Array.from({ length: totalPagesToFetch }, (_, index) =>
        axios.get(
          `${config.API_URL}/orders`,
          getAxiosConfig(page + index, maxOrdersPerPage, orderState)
        )
      );

      const responses = await Promise.allSettled(requests);

      const successfulResponses = responses
        .filter(
          (result): result is PromiseFulfilledResult<AxiosResponse<any>> =>
            result.status === "fulfilled"
        )
        .map((result) => result.value.data.data);

      const allOrders = successfulResponses.flat();
      const newOrders = allOrders.filter(
        (order: Order) => !orderCache.has(order.id)
      );
      for (const order of newOrders) {
        await loadOrderParsingQueue.add("order-parsing-queue", order, {
          removeOnComplete: true,
          removeOnFail: true,
        });
        orderCache.set(order.id, true);
      }

      console.log("orders queue in htttpRequest", loadOrderParsingQueue)

      hasMore = allOrders.length === totalPagesToFetch * maxOrdersPerPage;
      page += totalPagesToFetch;
    } catch (error) {
      console.error("Error fetching data from Kaspi API:", error);
      hasMore = false;
    }
  }
}

function getAxiosConfig(page: number, maxOrdersPerPage: number, orderState: OrderStateEnum) {
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
      "X-Auth-Token": config.KASPI_API_TOKEN,
    },
  };
}
