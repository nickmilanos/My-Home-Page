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

app.get('/getAllTasks', async (req, res) => {
    MongoClient.connect(url, async function (err, db) {
        let resultsRetrieved = await db.db(dbName).collection('Users').findOne({ username: 'nmilanpoker' }, { _id: 0, tasks: {content: 1, 
                                                                                                                              completed: 1,
                                                                                                                              year: 1, 
                                                                                                                              month: 1,
                                                                                                                              day: 1,
                                                                                                                              hour: 1,
                                                                                                                              minute: 1
                                                                                                                            }});
        res.send(resultsRetrieved.tasks);
        db.close();
    })
});
app.post("/saveNewTask", (req, res) => {
    let newTask = req.body.newTask;
    MongoClient.connect(url, (err, db) => {
        db.db(dbName).collection('Users').updateOne({username: 'nmilanpoker'}, {$push: {tasks: {content: newTask, 
                                                                                                completed: req.body.taskCompleted,
                                                                                                year: req.body.year,
                                                                                                month: req.body.month,
                                                                                                day: req.body.day,
                                                                                                hour: req.body.hour,
                                                                                                minute: req.body.minute
                                                                                            }}});
        db.close();
    });
});
app.delete('/deleteATask', (req, res) => {
    let taskToDelete = req.body.taskToDelete;
    MongoClient.connect(url, (err, db) => {
        db.db(dbName).collection('Users').update({username: 'nmilanpoker'}, {$pull: {tasks: {content: taskToDelete}}});
        db.close();
    });
});
app.put('/markTaskCompletedUncompleted', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        db.db(dbName).collection('Users').updateOne({username: 'nmilanpoker', "tasks.content": req.body.taskContent}, 
                                                    {$set: {"tasks.$.completed": req.body.completed}});
        db.close();
    });    
});

app.listen(8080,() => {
    console.log('Listening to Port: 8080');
});