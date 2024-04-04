// const {Redis}=require('ioredis')

// const client=new Redis({
//     port: 6379, // Redis port
//     host: "127.0.0.1", // Redis host
//     username: "default", // needs Redis >= 6
//     password: "my-top-secret",
//     db: 0, // Defaults to 0
//   });
// //default it tekes 6379 port hit

// const { createClient } =require( 'redis');

// const client = createClient();

// client.on('error', err => console.log('Redis Client Error', err));



// module.exports=client;



const { createClient } =require( 'redis');
require("dotenv").config();

const client = createClient({
    password: process.env.RED_PASSWORD,
    socket: {
        host: process.env.RED_HOST,
        port: process.env.RED_PORT,
    }
});

module.exports=client;