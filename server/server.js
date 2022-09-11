const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const dbConnection = require('./config/dbconn');
const cors = require('cors');
const apiRoutes = require('./routes/routes');

// Load env Vars
dotenv.config({path: './config/config.env'});

const app = express();

//Body Parser
app.use(express.json());

//Enable CORS Requests
let corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(corsOptions));

// Connect to Mongo DB Atlas
dbConnection();

// Log requests
app.use(logger);

// Mount Router
app.use('/api/v1', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));