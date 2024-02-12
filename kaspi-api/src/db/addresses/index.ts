import { Schema, Document} from "mongoose";
import { MongoDataBase } from "..";

const COLLECTION_NAME = "Address";

export interface IAddress extends Document {
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

const AddressSchema = new Schema<IAddress>(
  {
    id: { type: String, required: true, unique: true },
    streetName: { type: String, required: true },
    streetNumber: { type: String, required: true },
    town: { type: String, required: false },
    district: { type: String, required: false },
    building: { type: String, required: false },
    apartment: { type: String, required: false },
    formattedAddress: { type: String, required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

AddressSchema.index({ id: 1 });

export const AddressModel =
  MongoDataBase.mainDataBaseConnection.model<IAddress>(
    COLLECTION_NAME,
    AddressSchema,
    COLLECTION_NAME
  );
