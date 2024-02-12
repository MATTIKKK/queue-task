import { IServicePoint, ServicePointModel } from "../../db/service-points";


export type FindOneServicePointType = {
  id: string;
};

export class ServicePointData {
  public static async findOne(
    options: FindOneServicePointType
  ): Promise<IServicePoint | null> {
    return ServicePointModel.findOne(options);
  }

  public static async saveServicePoint(ServicePointData: Partial<IServicePoint>): Promise<IServicePoint | null> {
    try {
      const ServicePoint = new ServicePointModel(ServicePointData);

      const savedDocument = await ServicePoint.save();

      if (savedDocument) {
        console.log('ServicePoint saved successfully:', savedDocument);
        return savedDocument;
      } else {
        console.log('Failed to save ServicePoint.');
        return null;
      }
    } catch (error) {
      console.error('Error in saveServicePoint:', error);
      return null;
    }
  }
}