const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const session=require("express-session");
const MemoryStore=require("memorystore")(session)
require("dotenv").config();
const redis=require("./config/client");
//importing databse and cloudnary
const dbConnect=require("./config/database");
const {CloudnaryConnect }=require("./config/cloudnary");

//importing router here
const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const postRoutes=require("./routes/post");


const fileUpload=require("express-fileupload");
// const cookieParser=require("cookie-parser");

var cors=require("cors");
const bodyparser=require("body-parser");



const PORT=process.env.PORT || 5000;

//connect databse

dbConnect();

CloudnaryConnect();

// redis server working here
async function init(){
  await redis.connect();
}
init();


//working with redis server
//  (async()=>{
 


// const result=await redis.rPop("bike",0,10)
// console.log(result)
// let length2=await redis.lLen("bike")
// console.log(length2)
// let list2=await redis.lRange("bike",0,-1);
// console.log(list2)


// }

// )()













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
    //   res.redirect('/login'); // Redirect the user to the login page or another suitable page
    });
  });

//it is allow all kind of request 
//  app.use(cors());
app.use(
    cors({
        origin:"*",
		    credentials:true,
        optionsSuccessStatus:200,
    })
);

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp",
    })
);



//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/post",postRoutes);

app.listen(PORT,()=>{
    
    console.log(`server stared at port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send(`<h1 >Backend is Running and this is '/' Route</h1>`);
  });