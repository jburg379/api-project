/* 
Joseph Burgos
CSC 342, Spring 2022
Final Project
*/

// import express and sqlite3
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const app = express();

//connect to the databse
let db = new sqlite3.Database('./mydata.db', (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    }
})

// Static files
app.use(express.static('public'));

// middleware to parse incoming requests with JSON payloads
app.use(express.json());


//Start Server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});

// Main page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname), "/public/index.html");
});

//function used to test if the server is running
app.get("/api/", (req, res) => {
    res.set('Content-type', 'application/json');
    res.send({"message": "OK"});
});

//Start of the GET HTTP method
//function uses GET method and a query to retrieve information in the Anime table from the databse
app.get("/api/Anime", (req, res) => {
    res.set('Content-type', 'application/json');
    let sql = "SELECT * FROM Anime";
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(404);
            res.json({"error": err.message});
        }
        else {
            res.status(200);
            res.json(rows);
        }
    })
});

//function uses GET method and a query to retrieve information from the Anime table in the databse
app.get("/api/Anime/:id", (req, res) => {
    res.set('Content-type', 'application/json');
    let sql = "SELECT * FROM Anime WHERE AnimeID = ?";
    let params = [req.params.id];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400);
            res.json({"error": err.message});
        }
        else {
            if (rows.length === 0){
                res.status(404);
                res.end()
            }
            else {
                res.status(200);
                res.json(rows[0]);
            }
        }
    })
});

//function uses GET method and a query to retrieve information from the Anime table in the databse according to specific parameters
app.get("/api/Anime/:field/:value", (req, res) => {
    if (! (['AnimeName', 'Author', 'Year', 'Seasons'].includes(req.params.field)) ) {
        res.status(400);
        res.json({"error": "Invalid field"});
    }
    else {
        let sql = `SELECT * FROM Anime WHERE ${req.params.field} = ?`;
        let params = [req.params.value];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400);
                res.json({"error": err.message});
            }
            else {
                res.json(rows);
            }
        });
    }
});

//Failed attempt to create a rank based on the amount of seasons
app.get("/api/Anime/:seasons", (req, res) => {
    let sql = `SELECT * FROM Anime WHERE Seasons >= ?`;
    let params = [req.params.seasons];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400);
            res.json({"error": err.message});
        }
        else {
            res.json(rows);
        }
    });
});

//Start the POST HTTP method
//function uses the POST method and INSERT query to write new data into the Anime table in the database
app.post("/api/Anime/", (req, res) => {
    let sql = "INSERT INTO Anime (AnimeName, Author, Year, Seasons) VALUES (?, ?, ?, ?)";

    let params = [req.body.AnimeName, req.body.Author, req.body.Year, req.body.Seasons];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400);
            res.set('Content-type', 'application/json');
            res.json({"error": err.message});
        }
        else {
            res.status(201);
            res.set('Location', '/api/Anime/' + this.lastID)
            res.end();
        }
    });
});

//Start the PUT HTTP method
//function uses first query to retieve infromation matching the id and uses the PUT method with an UPDATE query to 
//modify the data of an entity in the database
app.put("/api/Anime/:id", (req, res) => {
    res.set('Content-type', 'application/json');
    let sql = "SELECT * FROM Anime WHERE AnimeID = ?";
    let params = [req.params.id];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400);
            res.json({"error": err.message});
        }
        else {
            if (rows.length === 0){
                res.status(404);
                res.end()
            }
            else {
                let sql = "UPDATE Anime SET AnimeName = ?, Author = ?, Year = ?, Seasons = ? WHERE AnimeID = ?";
                let params = [row.body.AnimeName, row.body.Author, row.body.Year, req.body.Seasons, req.params.id];
                db.run(sql, params, (err, rows) => {
                    if (err) {
                        res.status(400);
                        res.json({"error": err.message});
                        res.end()
                    }
                    else {
                        res.status(200);
                        res.end()
                    }
                });
            }
        }
    });
});  

//Start the DELETE HTTP method
//function uses the DELETE method and DELETE query to delete data matching the id and table in the database
app.delete("/api/Anime/:id", (req, res) => {
    res.set('Content-type', 'application/json');
    let sql = "SELECT * FROM Anime WHERE AnimeID = ?";
    let params = [req.params.id];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400);
            res.json({"error": err.message});
        }
        else {
            if (rows.length === 0){
                res.status(404);
                res.end()
            }
            else {
                let sql = "DELETE FROM Anime WHERE AnimeID = ?";
                let params = [req.params.id];
                db.run(sql, params, (err, rows) => {
                    if (err) {
                        res.status(404);
                        res.json({"error": err.message});
                    }
                    else {
                        res.status(204);
                        res.end();
                    }
                });
            }
        }
    });
});