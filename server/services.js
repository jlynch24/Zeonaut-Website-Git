const mysql = require('mysql2');

//Create for every data input using fetch.
const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zeonaut'
});

//Connects and confirms the connection of the database.
connection.connect((err) => {
    if (err) throw err;
    console.log('Database is connecting.');
});

//This facilitates authentication that things are being sent to server.
var services = function(app) {
    //POST for signup GET for login
    app.post("/signup", function(req, res) {

        var data = { //IMPORTANT for fetch problem
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
        console.log(JSON.stringify(data));

        //Test for if the the things are inserted into the database.
        connection.query("INSERT INTO player SET ?", data, function(err) {
            if(err) {   //They need to return as JSON, the format how the server was being send was wrong.
                        //Incorrect for the frount end, therefore it didn't send. Stringify was the problem.
                return res.json({ msg: "ERROR" + err});
            } else {
                return res.json({ msg: "SUCCESS" });
            }
        })
    });

    
}

module.exports = services;