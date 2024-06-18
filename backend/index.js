import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
dotenv.config()
app.use(cookieParser())

//routes imports

import pingRoutes from './routes/ping.routes.js'
import authRoutes from './routes/auth.routes.js'
import likeRoutes from './routes/like.routes.js'
import searchRoutes from './routes/search.routes.js'
import saveRoutes from './routes/save.routes.js'
import shareRoutes from './routes/share.routes.js'
import emailRoutes from './routes/email.routes.js'
import promoRoutes from './routes/promo.routes.js';
//rating and reservation routes
import rateRoutes from './routes/rate.routes.js'
//accomodation routes
import accommodationRoutes from './routes/acom.routes.js';
//reservation routes
import reservationRoutes from './routes/reservation.routes.js';

app.use('/liking', likeRoutes)
app.use('/searching', searchRoutes)
app.use('/saving', saveRoutes)
app.use('/share', shareRoutes)
app.use('/user', accommodationRoutes);
app.use('/user', reservationRoutes);
app.use('/ping', pingRoutes);
app.use('/auth', authRoutes);
app.use('/email', emailRoutes);
app.use('/promo', promoRoutes);
app.use('/user', rateRoutes);

app.listen(5001, () => {
    console.log("\nServer is listening on port 5001");
});

export default app;

