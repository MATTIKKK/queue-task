import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { MongoDataBase } from '../db';

const app = express();
const router = express.Router();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());
app.use(bodyParser.json());

// app.post('/add-shop-request', async (req, res) => {
//   try {
//     const { merchantId, orderState } = req.body; 
//     await addShopTask({ merchantId, orderState });
//     res.status(200).json({ message: 'Shop request added to queue.' });
//   } catch (error) {
//     console.error('Failed to add shop request:', error);
//     res.status(403 || 500).json({ error: 'Failed to add shop request to queue.' });
//   }
// });

app.use(router);

const server = http.createServer(app);

MongoDataBase.initMainDataBaseConnection()
server.listen(8080, () => {
  console.log('Server running on port http://localhost:8080/');
});