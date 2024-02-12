import { CustomerModel, ICustomer } from "../../db/customers";

export type FindOneCustomerType = {
  id: string;
};

export class CustomerData {
  public static async findOne(
    options: FindOneCustomerType
  ): Promise<ICustomer | null> {
    return CustomerModel.findOne(options);
  }

  public static async saveCustomer(customerData: Partial<ICustomer>): Promise<ICustomer | null> {
    try {
      const customer = new CustomerModel(customerData);

      const savedDocument = await customer.save();

      if (savedDocument) {
        console.log('Customer saved successfully:', savedDocument);
        return savedDocument;
      } else {
        console.log('Failed to save customer.');
        return null;
      }
    } catch (error) {
      console.error('Error in saveCustomer:', error);
      return null;
    }
  }
}
