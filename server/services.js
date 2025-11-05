const mysql = require('mysql2');

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zeonaut'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Database is connecting.');
});

var services = function(app) {
    //POST for signup GET for login
    app.post("/signup", function(req, res) {

        var data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }

        connection.query("INSERT INTO player SET ?", data, function(err) {
            if(err) {
                return res.send(JSON.stringify({msg:"ERROR : " + err}));
            } else {
                return res.send(JSON.stringify({msg:"SUCCESS"}));
            }
        })
    });

    
}

module.exports = services;