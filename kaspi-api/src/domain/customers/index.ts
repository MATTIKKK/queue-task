import { CustomerData } from "../../data/customers";
import { ICustomer } from "../../db/customers";
import { Customer } from "../../helpers";

export async function createCustomer(c: Customer): Promise<void> {
  let isExisting = await CustomerData.findOne({ id: c.id });

    if(isExisting) {
        console.log(`Customer with ID ${c.id} already exists.`);
        return;
    }
  let customerInstance: Partial<ICustomer> = {
    id: c.id,
    name: c.name,
    firstName: c.firstName,
    lastName: c.lastName,
    cellPhone: c.cellPhone,
  };

  await CustomerData.saveCustomer(customerInstance);
}
