const path = require("path");

//Page Listeners, each webpage needs one.
var router =function(app) { 
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/index.html"))
    });
};
var router =function(app) { //Rules page
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/rules.html"))
    });
};
var router =function(app) { //Lore page
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/lore.html"))
    });
};
var router =function(app) { //Pufferfish page
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/pufferfish.html"))
    });
};
var router =function(app) { //Character Creation Menu PAge
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/ccmenu.html"))
    });
};


module.exports = router; //Before input you must export