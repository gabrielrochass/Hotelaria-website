import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

//routes imports
import accommodationRoutes from './routes/acom.routes.js';
import authRoutes from './routes/auth.routes.js';
import emailRoutes from './routes/email.routes.js';
import likeRoutes from './routes/like.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import pingRoutes from './routes/ping.routes.js';
import promoRoutes from './routes/promo.routes.js';
import reservationRoutes from './routes/reservation.routes.js';
import saveRoutes from './routes/save.routes.js';
import searchRoutes from './routes/search.routes.js';
import shareRoutes from './routes/share.routes.js';
import rateRoutes from './routes/rate.routes.js';
import consultRoutes from './routes/consult.routes.js'

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Permite apenas a origem do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(express.json());
dotenv.config();
// app.use(cookieParser());

app.use('/liking', likeRoutes);
app.use('/searching', searchRoutes);
app.use('/saving', saveRoutes);
app.use('/share', shareRoutes);
app.use('/user', accommodationRoutes);
app.use('/user', reservationRoutes);
app.use('/user', rateRoutes);
app.use('/ping', pingRoutes);
app.use('/auth', authRoutes);
app.use('/email' ,emailRoutes);
app.use('/promo', promoRoutes);
app.use('/consult', consultRoutes);


app.use('/payment-methods', paymentRoutes);
app.use('/add', paymentRoutes);
app.use('/remove', paymentRoutes);
app.use('/add', paymentRoutes);

app.listen(5001, () => {
  console.log("\n\nServer is listening on port 5001\n\n");
});

export default app;
