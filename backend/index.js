const express = require('express');
const { connectToDatabase } = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 4000;
const auth = require('./routes/auth');
const card = require('./routes/card');
const deck = require('./routes/deck');

const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Database Connection
connectToDatabase();
app.get('/', (req, res) => {
    res.json({ success: true, message: `Backend is running successfully on https://stickmen.herokuapp.com/` });
})
app.use('/api/auth', auth);
app.use('/api/card', card);
app.use('/api/deck', deck);


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});