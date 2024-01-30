const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const { MongoMemoryServer } = require("mongodb-memory-server");

/**
 *      This is the Express App for The WeighBridge Wizard. It should handle data traffic to and from a mongo database.
 *      Some of this code may be similar to my submission for the fullstack cw
 */

//---------------------------------------------------Set up the express app
const app = express();
app.use(express.json());
const port = 3001;

// cross origins resource sharing policy set up to only accept from local host (ie the same as server). This should be sufficient for this CW.
app.use(cors());

//---------------------------------------------------Use API routes

//I will add the routes later

// ---------------------------------------------------Connect to MongoDB
