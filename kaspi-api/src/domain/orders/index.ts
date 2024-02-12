import { createCity } from "../cities";
import { createOriginAddress } from "../service-points";
import { createKaspiDelivery } from "../kaspi-delivery";
import { OrderData } from "../../data/orders";
import { IOrder } from "../../db/orders";
import { createAddress } from "../addresses";
import { createCustomer } from "../customers";
import { Order } from "../../helpers";

export async function processOrderData(order: Order): Promise<void> {
  const existingOrder = await OrderData.findOne({ id: order.id });

  if (existingOrder) {
    console.log(`Заказ с ID ${order.id} уже существует.`);
    return;
  }

  await createOrder(order);

  const tasks = [
    order.attributes.originAddress && createOriginAddress(order.attributes.originAddress),
    order.attributes.kaspiDelivery && createKaspiDelivery(order.id, order.attributes.kaspiDelivery),
    order.attributes.deliveryAddress && createAddress(order.id, order.attributes.deliveryAddress),
    createCustomer(order.attributes.customer),
  ];

  await Promise.all(tasks.filter(Boolean));
}

export async function createOrder(o: Order): Promise<void | boolean> {
  let orderInstance: Partial<IOrder> = {
    id: o.id,
    customerId: o.attributes.customer.id,
    code: o.attributes.code,
    totalPrice: o.attributes.totalPrice,
    paymentMode: o.attributes.paymentMode,
    plannedDeliveryDate: o.attributes.plannedDeliveryDate || null,
    originAddressId: o.attributes.originAddress?.id,
    creationDate: new Date(o.attributes.creationDate),
    isKaspiDelivery: o.attributes.isKaspiDelivery,
    deliveryMode: o.attributes.deliveryMode,
    signatureRequired: o.attributes.signatureRequired,
    creditTerm: o.attributes.creditTerm || 0,
    preOrder: o.attributes.preOrder,
    state: o.attributes.state,
    status: o.attributes.status,
    assembled: o.attributes.assembled,
    pickUpPointId: o.attributes.pickUpPointId,
    approvedByBankDate: new Date(o.attributes.approvedByBankDate),
    deliveryCost: o.attributes.deliveryCost || 0,
    deliveryCostForSeller: o.attributes.deliveryCostForSeller || 0,
  };

  await OrderData.saveOrder(orderInstance);
  console.log(`Заказ с ID ${o.id} успешно создан.`);
}
