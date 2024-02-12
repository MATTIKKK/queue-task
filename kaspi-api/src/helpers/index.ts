import { DeliveryModeEnum, OrderStateEnum, OrderStatusEnum, PaymentModeEnum } from "../data/orders";

export interface Customer {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    cellPhone: string;
}

export interface OriginAddress {
    id: string;
    displayName: string;
    address: DeliveryAddress;
    city: City;
}

export interface KaspiDelivery {
  id: string;
  waybill: string;
  courierTransmissionDate: Date;
  courierTransmissionPlanningDate: Date;
  waybillNumber: string;
  express: boolean;
  returnedToWarehouse: boolean;
  firstMileCourier: string;
}

export interface DeliveryAddress {
    id: string;
    streetName: string;
    streetNumber: string;
    town: string;
    district: string;
    building: string;
    apartment: string;
    formattedAddress: string;
    latitude: number;
    longitude: number;
}

export interface OrderAttributes {
  customer: Customer;
  originAddress?: OriginAddress;
  kaspiDelivery?: KaspiDelivery;
  deliveryAddress?: DeliveryAddress;
  id: string;
  code: string;
  totalPrice: number;
  paymentMode: PaymentModeEnum;
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

export interface Order {
  id: string;
  attributes: OrderAttributes;
}

export interface City {
    id: string;
    code: string;
    name: string;
    active: boolean;
}

export type ShopQueueRequestType = {
  merchantId: string;
  orderState: OrderStateEnum;
}