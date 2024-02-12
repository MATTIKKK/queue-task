import { Schema as MongooseSchema, Document, model } from "mongoose";
import { MongoDataBase } from "..";
import { IAddress } from "../addresses";

const COLLECTION_NAME = "ServicePoint";

export interface IServicePoint extends Document {
  id: string;
  displayName: string;
  address: {
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
  cityId: string;
}

const ServicePointSchema = new MongooseSchema<IServicePoint>(
  {
    id: { type: String, required: true },
    displayName: { type: String },
    address: {
      streetName: { type: String, required: true },
      streetNumber: { type: String, required: true },
      town: { type: String, required: false },
      district: { type: String },
      building: { type: String },
      apartment: { type: String },
      formattedAddress: { type: String, required: true },
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
    },
    cityId: { type: String },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

ServicePointSchema.index({ id: 1 });

export const ServicePointModel = MongoDataBase.mainDataBaseConnection.model<IServicePoint>(
  COLLECTION_NAME,
  ServicePointSchema,
  COLLECTION_NAME
);
