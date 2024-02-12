import { KaspiDeliveryData } from "../../data/kaspi-deliveries";
import { IKaspiDelivery } from "../../db/kaspi-deliveries";
import { KaspiDelivery } from "../../helpers";


export async function createKaspiDelivery(id: string, o: KaspiDelivery): Promise<void> {
    let kaspiDeliveryInstance: Partial<IKaspiDelivery> = {
        id, 
        waybill: o.waybill,
        courierTransmissionDate: new Date(o.courierTransmissionDate),
        courierTransmissionPlanningDate: new Date(o.courierTransmissionPlanningDate),
        waybillNumber: o.waybillNumber,
        express: o.express,
        returnedToWarehouse: o.returnedToWarehouse,
        firstMileCourier: o.firstMileCourier,
    }

    await KaspiDeliveryData.saveKaspiDelivery(kaspiDeliveryInstance);
} 