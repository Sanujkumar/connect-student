

const express=require("express");
const router=express.Router();


router.get("/webs",async(req,res)=>{
    let ws = req.wss
console.log("websocket connedected")
        ws.once('connection', function connection(wss) {
            // wss.on('message', function incoming(message) {
            //     console.log('received: %s', message);
            // });

            wss.on('message', function message(data, isBinary) {
                wss.clients.forEach(function each(client) {
                  if (client.readyState === WebSocket.OPEN) {
                    client.send(data, { binary: isBinary });
                  }
                });
                
              });

            // ws.send(JSON.stringify('it works! Yeeee! :))' ));
        });
})




module.exports=router;