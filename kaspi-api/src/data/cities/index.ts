import { CityModel, ICity } from "../../db/cities";

export type FindOneCityType = {
  id: string;
};

export class CityData {
  public static async findOne(options: FindOneCityType): Promise<ICity | null> {
    return CityModel.findOne(options);
  }

  public static async saveCity(
    cityData: Partial<ICity>
  ): Promise<ICity | null> {
    try {
      const city = new CityModel(cityData);

      const savedDocument = await city.save();

      if (savedDocument) {
        console.log("City saved successfully:", savedDocument);
        return savedDocument;
      } else {
        console.log("Failed to save city.");
        return null;
      }
    } catch (error) {
      console.error("Error in createCity:", error);
      return null;
    }
  }
}
