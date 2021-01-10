const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3001;

var mysql = require('mysql');
//var connection = mysql.createConnection({
//  host     : 'chat.cta7jxochxji.us-east-2.rds.amazonaws.com',
//  user     : 'admin',
// password : '8D&b7ay0NEJ%DcYIC',
//  database : 'chat'
//});

//var mysql = require('mysql');
//var connection = mysql.createConnection({
//  host     : 'mysql',
//  user     : 'test',
//  password : 'pass',
//  database : 'my_db'
//});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/api/users', function(req, res) {
    res.json([
        "Sally",
        "Bernie",
        "Robbie",
        "ste",
    ]);
});

app.get('/api', function (req, res) {
    res.json({ response: "hello!" });
});

app.get('/api/coolpeeps', function(req, res) {
    connection.query('SELECT * FROM cool_people', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
    });
});

app.post('/api/coolpeeps', function(req, res) {
    if (req.body.name && req.body.coolness) {
        console.log(req.body);
        connection.query('INSERT INTO cool_people SET ?', {
            name: req.body.name,
            coolness: req.body.coolness
        },
        function(error, results) {
            if (error) throw error;
            res.json(results);
        });
    }
})

app.listen(PORT, function() {
    console.log("Node Server running on PORT:" + PORT);
});