const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const itemRoutes = require('./routes/item.routes');
const restaurantRoutes = require('./routes/restaurant.routes');

const app = express();

/* Middleware */
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

/* Routes */
app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', authRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/items', itemRoutes);
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

module.exports = app;
