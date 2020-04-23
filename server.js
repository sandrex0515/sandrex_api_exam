const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require('config');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

app.use(express.json());

const db = config.get('mongoURI');

mongoose
.connect(db)
.then(() => console.log('mongodb connected...'))
.catch(err => console.log(err));

app.use('/api/datas', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server running on port ${port}`));