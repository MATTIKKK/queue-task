import Queue from 'bull' 
import { Order, ShopQueueRequestType } from '../../helpers'
import { config } from '../../config'

export const loadManagerParsingQueue = new Queue<ShopQueueRequestType>('manager-parsing-queue', config.redisUrl)

export const loadOrderParsingQueue = new Queue<Order>('order-parsing-queue', config.redisUrl)