const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const {SQLQueries} = require('./SQLQueries');

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
        connection.query(SQLQueries.getIsTodoListOpen, (err, results) => {
            connection.release();
            if(err) throw err;
            res.json(results[0].isTodoListOpen !== 0);
        });
    });
});

app.put('/setDashboardState', (req, res) => {
    pool.getConnection((err, connection) => {
        let isListOpen = req.body.isTodoListOpen ? 1 : 0;
        connection.query(SQLQueries.updateIsListOpen, [isListOpen], (err, results) => {
            connection.release();
            if(err) throw err;
            res.json(results);
        });
    });
});

app.post('/saveNewTask', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(SQLQueries.insertNewTask, [req.body.newTask], (err, results) => {
            connection.release();
            if(err) throw err;
            if(results.affectedRows === 1) res.json({message: "Success"});
            else res.json({message: "Failure"});
        });
    });
});

app.get('/tasks', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(SQLQueries.getAllTasks, (err, results) => {
            connection.release();
            if(err) throw err;
            res.json(results);
        });
    });
});

app.delete('/deleteATask', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(SQLQueries.deleteTask, [req.body.taskToDelete], (err, results) => {
            connection.release();
            if(err) throw err;
            res.json(results);
        });
    });
});

app.put('/toggleTaskCompletion', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(SQLQueries.updateTaskCompletion, [req.body.completed, req.body.taskContent], (err, results) => {
            connection.release();
            if(err) throw err;
            if(results.affectedRows === 1) res.json({message: "Success"});
            else res.json({message: "Failure"});
        });
    });
});

app.listen(8080,() => {
    console.log('Listening to Port: 8080');
});