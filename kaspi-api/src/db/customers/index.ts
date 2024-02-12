import { Schema, Document, model } from "mongoose";
import { MongoDataBase } from "..";

const COLLECTION_NAME = "Customer";

export interface ICustomer extends Document {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  cellPhone: string;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cellPhone: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

CustomerSchema.index({ id: 1 });

export const CustomerModel = MongoDataBase.mainDataBaseConnection.model<ICustomer>(
  COLLECTION_NAME,
  CustomerSchema,
  COLLECTION_NAME
);
