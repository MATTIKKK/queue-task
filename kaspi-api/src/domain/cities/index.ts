import { CityData } from "../../data/cities";
import { ICity } from "../../db/cities";
import { City } from "../../helpers";

export async function createCity(city: City): Promise<void> {
  let isExisting = await CityData.findOne({ id: city.id });
  console.log("isExisting", isExisting);
  if (isExisting) {
    console.log(`City with ID ${city.id} already exists.`);
    return;
  }

  let cityInstance: Partial<ICity> = {
    id: city.id,
    code: city.code,
    name: city.name,
    active: city.active,
  };

  await CityData.saveCity(cityInstance);
}
