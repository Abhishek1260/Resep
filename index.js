const express = require('express');
const connect = require('./server');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyparser = require('body-parser');
const router1 = require('./routes/usersRoutes');
const router2 = require('./routes/productRoutes')
const router3 = require('./routes/SellerRoutes')
const router4 = require('./routes/PaymentRoutes')
const router5 = require('./routes/CloudinaryRoutes')
const router6 = require('./routes/OrderRoutes')
const path = require('path')
const cookieParser = require('cookie-parser')

dotenv.config({path : "./config/config.env"})

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(cors())

app.use(bodyparser.json())

connect();

app.use('/api/v1' , router1)
app.use('/api/v2' , router2)
app.use('/api/v3' , router3)
app.use('/api/v4' , router4)
app.use('/api/v5' , router5)
app.use('/api/v6' , router6)

app.listen(process.env.PORT , (req , res) => {
    console.log(`you are running on the http://localhost:${process.env.PORT}`);
})