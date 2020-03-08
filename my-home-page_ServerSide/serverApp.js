const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'MyHomePage';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.post("/saveNewTask", (req, res) => {
    let newTask = req.body.newTask;
    MongoClient.connect(url, (err, db) => {
        db.db(dbName).collection('Users').updateOne({username: 'nmilanpoker'}, {$push: {tasks: newTask}});
        db.close();
    });
});

app.get('/getAllTasks', async (req, res) => {
    MongoClient.connect(url, async function (err, db) {
        let resultsRetrieved = await db.db(dbName).collection('Users').findOne({ username: 'nmilanpoker' }, { _id: 0, tasks: 1 });
        res.send(resultsRetrieved.tasks);
        db.close();
    })
});

app.listen(8080,() => {
    console.log('Listening to Port: 8080');
});