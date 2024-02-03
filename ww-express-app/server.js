const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const { MongoMemoryServer } = require("mongodb-memory-server");
const populateOrders = require("./functions/populateDatabase.js/populateOrders");
const populateProducts = require("./functions/populateDatabase.js/populateProducts");
const populateTrucks = require("./functions/populateDatabase.js/populateTrucks");
const populateAccounts = require("./functions/populateDatabase.js/populateAccounts");
//Account Routes
const deleteAccount = require("./routes/account-routes/deleteAccount");
const signIn = require("./routes/account-routes/signIn");
const signup = require("./routes/account-routes/signUp");
const updateAccount = require("./routes/account-routes/updateAccount");
const updatePassword = require("./routes/account-routes/updatePassword");
//Order Routes
const closeOrder = require("./routes/order-routes/closeOrder");
const createOrder = require("./routes/order-routes/createOrder");
const getClosedOrders = require("./routes/order-routes/getClosedOrders");
const getOpenOrders = require("./routes/order-routes/getOpenOrders");
//Ticket Routes
const cancelOnsite = require("./routes/ticket-routes/cancelOnsite");
const getAllOnsite = require("./routes/ticket-routes/getAllOnsite");
const weighIn = require("./routes/ticket-routes/weighIn");
const weighOut = require("./routes/ticket-routes/weighOut");
//Truck Routes
const createTruck = require("./routes/truck-routes/createTruck");
const deleteTruck = require("./routes/truck-routes/deleteTruck");
const getTruck = require("./routes/truck-routes/getTruck");
const updateTruck = require("./routes/truck-routes/updateTruck");

/**
 *      This is the Express App for The WeighBridge Wizard. It should handle data traffic to and from a mongo database.
 *      Some of this code may be similar to my submission for the fullstack cw
 *      This setup currently requires a docker container of a mongodb but that is not yet setup. After development i will use a cloud hosted one using mongos free cloud hosting
 */

//---------------------------------------------------Set up the express app
const app = express();
app.use(express.json());
const port = 3001;

// cross origins resource sharing policy set up to only accept from local host (ie the same as server). This should be sufficient for this CW.
app.use(cors());

//---------------------------------------------------Use API routes
//Account Routes
app.use("/account/delete", deleteAccount);
app.use("/account/signin", signIn);
app.use("/account/signup", signup);
app.use("/account/update", updateAccount);
app.use("/account/updatepassword", updatePassword);
//Order Routes
app.use("/order/close", closeOrder);
app.use("/order/create", createOrder);
app.use("/order/getclosed", getClosedOrders);
app.use("/order/getopen", getOpenOrders);
//Ticket Routes
app.use("/ticket/cancelonsite", cancelOnsite);
app.use("/ticket/get/onsite", getAllOnsite);
app.use("/weigh/in", weighIn);
app.use("/weigh/out", weighOut);
//Truck Routes
app.use("/truck/create", createTruck);
app.use("/truck/delete", deleteTruck);
app.use("/truck/get", getTruck);
app.use("/truck/update", updateTruck);

// ---------------------------------------------------Connect to MongoDB
async function connectToDatabase() {
  try {
    const useInMemoryDB = process.env.NODE_ENV === "test";
    const realDbConnection = "mongodb://mongodb:27017/weighbridge-wizard";

    if (useInMemoryDB) {
      //test environment
      const mongoMemoryServer = await MongoMemoryServer.create();
      const uri = mongoMemoryServer.getUri();

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to in-memory MongoDB!");
    } else {
      //non test environment
      await mongoose.connect(realDbConnection);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

connectToDatabase();

//---------------------------------------------------Populate the Database

await populateAccounts();
await populateProducts();
await populateOrders();
await populateTrucks();
console.log("Ran all functions to populate/Maintain core DB data. ");

//---------------------------------------------------WebSocket code

const server = require("http").Server(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`'A client Connected: ${socket.id}`);

  socket.emit("message", "Hello ww-client from ww-server via websocket!");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

//---------------------------------------------------Start the server.
server.listen(port, () => {
  console.log(
    `Weighbridge Wizard's server is running on http://localhost:${port}`
  );
});

//module.exports = server;
//Uncomment when i begin testing
