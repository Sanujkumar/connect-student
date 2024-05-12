
const Redis = require("ioredis");
require("dotenv").config();
// const redisUri =process.env.REDIS_URI;
"use strict"
const client=new Redis({
    port:process.env.RED_PORT,
    host:process.env.RED_HOST,
    password:process.env.RED_PASSWORD,
    maxRetriesPerRequest: null,
    
    // lazyConnect: true,
    // autoResubscribe: false,
});
// //default it tekes 6379 port hit
module.exports=client;




// const redisClient=async()=>{
//     try{
//         const redis = new Redis(redisUri);
//         console.log("redis client connected...")
        

//     }catch(err){
//         console.log("err while connecting the redisClient to the cloud server",err)
//     }
// }


// const { createClient } =require( 'redis');
// require("dotenv").config();

// const client = createClient({
//     password: process.env.R_PASSWORD,
//     socket: {
//         host: process.env.R_HOST,
//         port: process.env.R_PORT,
//     }
// });

// module.exports=client;