const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URI }));

app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT);