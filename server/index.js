const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

// db connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

// express app
const app = express();

const corsOptions ={
    origin:['http://localhost:5174', 'http://localhost:5173'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

// built in middleware
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});