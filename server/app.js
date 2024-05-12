const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { createServer } = require('node:http');
const MemoryStore = require("memorystore")(session)
const { Server } = require("socket.io")
const { Queue } = require("bullmq")
require("dotenv").config();
const client = require("./config/client");
//importing databse and cloudnary
const dbConnect = require("./config/database");
const { CloudnaryConnect } = require("./config/cloudnary");

//importing router here
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const postRoutes = require("./routes/post");


const fileUpload = require("express-fileupload");
// const cookieParser=require("cookie-parser");

var cors = require("cors");
const bodyparser = require("body-parser");
//websocket uisng the ws

const { WebSocketServer, WebSocket } = require("ws")



const PORT = process.env.PORT || 5000;
const httpServer=app.listen(PORT, () => {

  console.log(`server stared at port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send(`<h1 >Backend is Running and this is '/' Route</h1>`);
});


// websocket implementations

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
console.log("websocket connected")
  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
    
  });

  ws.send('Hello! Message From Server!!');
});
const websocketfunctions=require("./routes/websocket")
app.use(function (req, res, next) {
  req.ws = wss;
  return next();
},websocketfunctions);

dbConnect();

CloudnaryConnect();







//working with the bullMq



client.on('error', err => console.log('Redis error', err));
client.on('reconnecting', msg => console.log('Redis reconnecting...', msg));
client.on('close', () => console.log('Redis closed...'));
client.on('connect', () => console.log('Redis connected...'));



const myQueue = new Queue('myqueue', { connection: client });

async function init() {
  const res = await myQueue.add("email", { email: "roshan@gmail.com" })
  console.log("job id is", res.id)

}

// init();


// io.on("connection", (socket) => {
//   console.log(socket);
//   socket.on("hello", (arg) => {
//     console.log(arg); // world
//   });
// });
// io.on("connection", (socket) => {
//   socket.emit("hello", "world");
// });





//middleware connect
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(session({
  secret: 'Ansy', // Change this to a secure secret
  resave: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  saveUninitialized: true,
  cookie: { maxAge: 86400000 }, // Session timeout (in milliseconds)
}))

app.get('/api/v1/auth/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.send("you are now logout");

  });
});



app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(

  fileUpload({
    useTempFiles: true,
    tempFileDir: "./public/swp/",
  })

);



//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/post", postRoutes);




app.get("/", (req, res) => {
    res.send(`<h1 >Backend is Running and this is '/' Route</h1>`);
  });

