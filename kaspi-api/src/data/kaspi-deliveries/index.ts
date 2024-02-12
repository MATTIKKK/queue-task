import { IKaspiDelivery, KaspiDeliveryModel } from "../../db/kaspi-deliveries";

export class KaspiDeliveryData {

  public static async saveKaspiDelivery(kaspiDeliveryData: Partial<IKaspiDelivery>): Promise<IKaspiDelivery | null> {
    try {
      // Check if a delivery with the same unique identifier already exists
      const existingDelivery = await KaspiDeliveryModel.findOne({ waybill: kaspiDeliveryData.waybill }).exec();
      
      if (existingDelivery) {
        console.log('Kaspi delivery already exists:', existingDelivery);
        return existingDelivery; // or handle as needed
      }
      
      // If not, save the new delivery
      const savedDocument = await new KaspiDeliveryModel(kaspiDeliveryData).save();
      console.log('Kaspi delivery saved successfully:', savedDocument);
      return savedDocument;
    } catch (error) {
      console.error('Error in saveKaspiDelivery:', error);
      return null;
    }
  }
}