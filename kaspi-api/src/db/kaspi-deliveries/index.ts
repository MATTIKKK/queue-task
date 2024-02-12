import { Schema as MongooseSchema, Document, model } from "mongoose";
import { MongoDataBase } from "..";

const COLLECTION_NAME = "KaspiDelivery";

export interface IKaspiDelivery extends Document {
  id: string;
  waybill: string;
  courierTransmissionDate: Date;
  courierTransmissionPlanningDate: Date;
  waybillNumber: string;
  express: boolean;
  returnedToWarehouse: boolean;
  firstMileCourier: string;
}

const KaspiDeliverySchema = new MongooseSchema<IKaspiDelivery>(
  {
    id: { type: String },
    waybill: { type: String },
    courierTransmissionDate: { type: Date },
    courierTransmissionPlanningDate: { type: Date },
    waybillNumber: { type: String },
    express: { type: Boolean },
    returnedToWarehouse: { type: Boolean },
    firstMileCourier: { type: String },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

KaspiDeliverySchema.index({ id: 1 });

export const KaspiDeliveryModel =
  MongoDataBase.mainDataBaseConnection.model<IKaspiDelivery>(
    COLLECTION_NAME,
    KaspiDeliverySchema,
    COLLECTION_NAME
  );
