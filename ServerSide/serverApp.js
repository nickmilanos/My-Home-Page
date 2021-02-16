const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123welcomeNikos22419917!",
    database: "myHomePage"
});

app.get('/dashboardState', (req, res) => {
    pool.getConnection( (err, connection) => {
        connection.query("SELECT isTodoListOpen FROM Users", (err, results) => {
            connection.release();
            if(err) throw err;
            res.json(results[0].isTodoListOpen == 0 ? true : false);
        });
    });
});

app.put('/setDashboardState', (req, res) => {
    pool.getConnection((err, connection) => {
        let isListOpen = req.body.isTodoListOpen ? 1 : 0;
        connection.query(`UPDATE Users SET isTodoListOpen=${isListOpen} WHERE Users.UserID = 1`, (err, results) => {
            connection.release();
            if(err) throw err;
            res.json(results);
        });
    });
});

app.post('/saveNewTask', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(`INSERT INTO Tasks(Content, UserID) VALUES ('${req.body.newTask}', 1)`, (err, results) => {
            connection.release();
            if(err) throw err;
            res.json(results);
        });
    });
});

app.get('/tasks', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM Tasks', (err, results) => {
            connection.release();
            if(err) throw err;
            res.json(results);
        });
    });
});

app.delete('/deleteATask', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(`DELETE FROM Tasks WHERE Content = '${req.body.taskToDelete}'`, (err, results) => {
            connection.release();
            if(err) throw err;
            res.json(results);
        });
    });
});

app.listen(8080,() => {
    console.log('Listening to Port: 8080');
});