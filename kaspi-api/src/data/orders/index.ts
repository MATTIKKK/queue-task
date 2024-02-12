import { Types } from "mongoose";
import { IOrder, OrderModel } from "../../db/orders";

export enum OrderStatusEnum {
  APPROVED_BY_BANK = "APPROVED_BY_BANK",
  ACCEPTED_BY_MERCHANT = "ACCEPTED_BY_MERCHANT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  CANCELLING = "CANCELLING",
  KASPI_DELIVERY_RETURN_REQUESTED = "KASPI_DELIVERY_RETURN_REQUESTED",
  RETURN_ACCEPTED_BY_MERCHANT = "RETURN_ACCEPTED_BY_MERCHANT",
  RETURNED = "RETURNED",
}

export enum OrderStateEnum {
  NEW = "NEW",
  SIGN_REQUIRED = "SIGN_REQUIRED",
  PICKUP = "PICKUP",
  DELIVERY = "DELIVERY",
  KASPI_DELIVERY = "KASPI_DELIVERY",
  ARCHIVE = "ARCHIVE",
}

export enum PaymentModeEnum {
  PAY_WITH_CREDIT = "PAY_WITH_CREDIT",
  PREPAID = "PREPAID",
}

export enum DeliveryModeEnum {
  DELIVERY_LOCAL = "DELIVERY_LOCAL",
  DELIVERY_PICKUP = "DELIVERY_PICKUP",
  DELIVERY_REGIONAL_PICKUP = "DELIVERY_REGIONAL_PICKUP",
  DELIVERY_REGIONAL_TODOOR = "DELICERY_REGIONAL_TODOOR"
}

export enum DeliveryTypeEnum {
  PICKUP = "PICKUP",
  DELIVERY = "DELIVERY",
}

export type FindOneOrderType =
  | {
      code: string;
    }
  | {
      id: string;
    };

export class OrderData {
  public static async findOne(options: FindOneOrderType): Promise<IOrder | null> {
    return OrderModel.findOne(options);
  }

  public static async saveOrder(orderData: Partial<IOrder>): Promise<IOrder | null> {
    try {
      const order = new OrderModel(orderData);

      const savedDocument = await order.save();

      if (savedDocument) {
        console.log('Order saved successfully:', savedDocument);
        return savedDocument;
      } else {
        console.log('Failed to save order.');
        return null;
      }
    } catch (error) {
      console.error('Error in saveOrder:', error);
      return null;
    }
  }

  public static async updateOrderStatus(
    options: FindOneOrderType,
    newStatus: OrderStatusEnum
  ): Promise<IOrder | null> {
    try {
      const query = options;
      const updatedDocument = await OrderModel.findOneAndUpdate(
        query,
        { $set: { status: newStatus } },
        { new: true }
      );

      if (updatedDocument) {
        console.log('Order status updated successfully:', updatedDocument);
        return updatedDocument;
      } else {
        console.log('No matching order found or failed to update order status.');
        return null;
      }
    } catch (error) {
      console.error('Error in updateOrderStatus:', error);
      return null;
    }
  }

  public static async updateOrderState(
    options: FindOneOrderType,
    newState: OrderStateEnum
  ): Promise<IOrder | null> {
    try {
      const query = options;
      const updatedDocument = await OrderModel.findOneAndUpdate(
        query,
        { $set: { state: newState } },
        { new: true }
      );

      if (updatedDocument) {
        console.log('Order state updated successfully:', updatedDocument);
        return updatedDocument;
      } else {
        console.log('No matching order found or failed to update order state.');
        return null;
      }
    } catch (error) {
      console.error('Error in updateOrderState:', error);
      return null;
    }
  }
}
