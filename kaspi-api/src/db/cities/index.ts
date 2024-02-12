import { Schema, Document, model } from "mongoose";
import { MongoDataBase } from "..";

const COLLECTION_NAME = "City";

export interface ICity extends Document {
  id: string;
  code: string;
  name: string;
  active: boolean;
}

const CitySchema = new Schema<ICity>(
  {
    id: { type: String, required: true, unique: true },
    code: { type: String, required: true},
    name: { type: String, },
    active: { type: Boolean, },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

CitySchema.index({ id: 1 });

export const CityModel = MongoDataBase.mainDataBaseConnection.model<ICity>(
  COLLECTION_NAME,
  CitySchema,
  COLLECTION_NAME
);
