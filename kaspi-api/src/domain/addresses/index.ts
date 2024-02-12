import { AddressData } from "../../data/addresses";
import { IAddress } from "../../db/addresses";
import { DeliveryAddress } from "../../helpers";

export async function createAddress(id: string, o: DeliveryAddress): Promise<void> {
  let AddressInstance: Partial<IAddress> = {
    id,
    streetName: o.streetName.trim(),
    streetNumber: o.streetNumber.trim(),
    town: o.town.trim(),
    district: o.district,
    building: o.building,
    apartment: o.apartment,
    formattedAddress: o.formattedAddress.trim(),
    latitude: o.latitude,
    longitude: o.longitude,
  };

  await AddressData.saveAddress(AddressInstance);
}
