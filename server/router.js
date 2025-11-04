const path = require("path");

//Page Listeners, each webpage needs one.
var router =function(app) { 
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/index.html"))
    });

//Rules page
    app.get('/rules', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/rules.html"))
    });
//Lore page
    app.get('/lore', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/lore.html"))
    });

//Pufferfish page
    app.get('/pufferfish', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/pufferfish.html"))
    });
//Character Creation Menu PAge
    app.get('/ccmenu', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/ccmenu.html"))
    });

//Sign Up
    app.get('/signup', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/signup.html"))
    });
    //Log In
    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/genPages/login.html"))
    });
};


module.exports = router; //Before input you must export