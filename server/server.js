const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/"))); //Oversee

//Server
var port = 5001;

//Page listeners (if you want to split things up)
var router = require("./router.js");
router(app);

//Service listeners
var services = require("./services.js");
services(app);

//The actual webserver.
server = app.listen(port, function(err){
    if (err) {
        throw err;
    }
    console.log("It is running at least.")
})

