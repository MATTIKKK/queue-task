import { ServicePointData } from "../../data/service-points";
import { IServicePoint } from "../../db/service-points";
import { OriginAddress } from "../../helpers";
import { createCity } from "../cities";

export async function createOriginAddress(o: OriginAddress): Promise<void> {
  let isExisting = await ServicePointData.findOne({ id: o.id });
  if (isExisting) {
    console.log(`Service point with ID ${o.id} already exists.`);
    return;
  }

  let originAddressInstance: Partial<IServicePoint> = {
    id: o.id,
    displayName: o.displayName,
    address: {
      streetName: o.address.streetName.trim(),
      streetNumber: o.address.streetNumber.trim(),
      town: o.address.town.trim(),
      district: o.address.district,
      building: o.address.building,
      apartment: o.address.apartment,
      formattedAddress: o.address.formattedAddress.trim(),
      latitude: o.address.latitude,
      longitude: o.address.longitude,
    },
    cityId: o.city.id,
  };

  await ServicePointData.saveServicePoint(originAddressInstance);
  await createCity(o.city);
}
