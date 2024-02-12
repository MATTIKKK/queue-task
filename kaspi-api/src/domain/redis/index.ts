import { createClient } from 'redis' 
import { config } from '../../config'
 
export const redisClient = createClient({ 
    url: config.redisUrl, 
})