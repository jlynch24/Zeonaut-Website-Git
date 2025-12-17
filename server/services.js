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
            } else if (results.length === 0) { //No match.
                return res.json({msg: "FAIL"})
            } else { //Is match and code runs.
                return res.json({ msg: "SUCCESS", userID:results[0].player_id})
            }
        })
    })

        // Do what I did for login for memonic
    app.post("/memonic", function(req, res) {
        const data = {  //Put the data in a box
            player_id: req.body.player_id,
            character_name: req.body.character_name,
            body_energy: req.body.body_energy,
            mind_energy: req.body.mind_energy,
            spirit_energy: req.body.spirit_energy,
            soul_energy: req.body.soul_energy
        };
    //Then insert // Character is keyword, needs quotes
    const query = "INSERT INTO `character` SET ?";
    connection.query(query, data, function(error, results) {
        if (error) {
            console.log("SQL ERROR:", error);
            return res.json({ msg: "ERROR " + error });
        }
        console.log("Character created with ID:", results.insertId);
        return res.json({ msg: "SUCCESS" });
    });

});

//Get ALL characters
app.get("/get-characters", function(req, res) {

    const player_id = req.query.player_id;

        if (!player_id) {
            return res.json({ msg: "Player ID missing" });
        }

        const query = "SELECT * FROM `character` WHERE player_id = ?";

        connection.query(query, [player_id], function(err, results) {
            if (err) {
                return res.json({ msg: "ERROR" });
            }

            return res.json({
                msg: "SUCCESS",
                characters: results
            });
        });
    });

//

app.get("/get-character", function(req, res) {

    const character_id = req.query.character_id;

        if (!character_id) {
            return res.json({ msg: "Character ID missing" });
        }

        const query = "SELECT * FROM `character` WHERE character_id = ? LIMIT 1";

        connection.query(query, [character_id], function(err, result) {
            if (err) {
                return res.json({ msg: "ERROR" });
            }

            if (result.length === 0) {
                return res.json({ msg: "NO_CHARACTER" });
            }

        return res.json({
            msg: "SUCCESS",
            character: result[0] 
        });
    });
});

    
};

module.exports = services;