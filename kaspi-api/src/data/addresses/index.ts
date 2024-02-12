import { Types } from "mongoose";
import { AddressModel, IAddress } from "../../db/addresses";

export type FindAddressType =
  | {
      formattedAddress: string;
    }
  | {
      id: string;
    };

export class AddressData {
  public static async findOne(
    options: FindAddressType
  ): Promise<IAddress | null> {
    return AddressModel.findOne(options);
  }

  public static async saveAddress(addressData: Partial<IAddress>): Promise<IAddress | null> {
    try {
      const address = new AddressModel(addressData);

      const savedDocument = await address.save();

      if (savedDocument) {
        console.log('Address saved successfully:', savedDocument);
        return savedDocument;
      } else {
        console.log('Failed to save address.');
        return null;
      }
    } catch (error) {
      console.error('Error in saveAddress:', error);
      return null;
    }
  }
}
