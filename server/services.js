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
    //Now for the login, each user imput requires a new one, each fetch statement requires a new one.
    app.post("/login", function(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        console.log("Login data", email, password); //Shows that it is logging, at least console wise.
        const query = "SELECT * FROM player WHERE email = ? AND password = ?"; //The prompt to be given to the server.
        connection.query(query, [email, password], function (error, results) {

            if (error) { //If it dosen't word after that.
              return res.json({ msg: "Not working" + error});
            } else if (result.length === 0) { //No match.
                return res.json({msg: "FAIL"})
            } else { //Is match and code runs.
                return res.json({ msg: "Logged in without issue."})
            }
        })
    })

    
}

module.exports = services;