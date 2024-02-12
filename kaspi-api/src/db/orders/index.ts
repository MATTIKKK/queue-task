import { Schema as MongooseSchema, Document, model } from "mongoose";
import { MongoDataBase } from "..";
import {
  DeliveryModeEnum,
  OrderStateEnum,
  OrderStatusEnum,
  PaymentModeEnum,
} from "../../data/orders";

const COLLECTION_NAME = "Order";

export interface IOrder extends Document {
  id: string;
  customerId: string;
  code: string;
  totalPrice: number;
  paymentMode: PaymentModeEnum;
  originAddressId: string;
  plannedDeliveryDate: Date;
  deliveryCostForSeller: number;
  creationDate: Date;
  isKaspiDelivery: boolean;
  deliveryMode: DeliveryModeEnum;
  signatureRequired: boolean;
  creditTerm: number;
  preOrder: boolean;
  pickUpPointId: string;
  state: OrderStateEnum;
  status: OrderStatusEnum;
  assembled: boolean;
  approvedByBankDate: Date;
  deliveryCost: number;
}

const OrderSchema = new MongooseSchema<IOrder>(
  {
    id: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    totalPrice: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    originAddressId: { type: String, required: false },
    plannedDeliveryDate: { type: Date, required: false },
    creationDate: { type: Date, required: true },
    isKaspiDelivery: { type: Boolean, required: true },
    deliveryMode: { type: String, required: true },
    signatureRequired: { type: Boolean, required: true },
    creditTerm: { type: Number, required: false },
    preOrder: { type: Boolean, required: false },
    assembled: { type: Boolean, required: false },
    pickUpPointId: { type: String, required: false },
    state: { type: String, required: true },
    status: { type: String, required: true },
    approvedByBankDate: { type: Date, required: false },
    deliveryCostForSeller: { type: Number, required: false },
    deliveryCost: { type: Number, required: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

OrderSchema.index({ id: 1 });

export const OrderModel = MongoDataBase.mainDataBaseConnection.model<IOrder>(
  COLLECTION_NAME,
  OrderSchema,
  COLLECTION_NAME
);
