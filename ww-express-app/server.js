const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const { MongoMemoryServer } = require("mongodb-memory-server");

/**
 *      This is the Express App for The WeighBridge Wizard. It should handle data traffic to and from a mongo database.
 *      Some of this code may be similar to my submission for the fullstack cw
 *      This setup currently requires a docker container of a mongodb but that is not yet setup. After development i will use a cloud hosted one using mongos free cloud hosting
 */

//---------------------------------------------------Set up the express app
const app = express();
app.use(express.json());
const port = 3060;

// cross origins resource sharing policy set up to only accept from local host (ie the same as server). This should be sufficient for this CW.
app.use(cors());

//---------------------------------------------------Use API routes

//I will add the routes later

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
      await mongoose.connect(realDbConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

connectToDatabase();

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
