const express = require("express");
const bodyParser=require("body-parser")
////const socket = require("socket.io");
const app=express();
const cors=require("cors");
const path=require("path");
app.use(express.json());
require("./db/conn.js")
app.use(bodyParser.json())

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
 app.use(express.static(__dirname + '/public'));


  app.get('/', (req,res) => {
    
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.use(require("./Router/auth.js"))
const PORT = 5000;
//const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});





  
  
