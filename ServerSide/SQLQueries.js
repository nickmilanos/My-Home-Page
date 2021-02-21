exports.SQLQueries = {
    getIsTodoListOpen: "SELECT isTodoListOpen FROM Users",
    getAllTasks: "SELECT * FROM Tasks",
    updateIsListOpen: `UPDATE Users 
                       SET isTodoListOpen= ? 
                       WHERE Users.UserID = 1`,
    insertNewTask: `INSERT INTO Tasks(Content, UserID) 
                    VALUES (?, 1)`,
    deleteTask: `DELETE FROM Tasks
                 WHERE Content = ?`,
    updateTaskCompletion: `UPDATE Tasks
                           SET Completed = ?
                           WHERE Content = ?`
};