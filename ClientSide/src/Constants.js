export const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

export const apiEndpoints = Object.freeze({
    getAllTasksURL: `${SERVER_ENDPOINT}/tasks`,
    getDashboardStateURL: `${SERVER_ENDPOINT}/dashboardState`,
    insertNewTaskURL: `${SERVER_ENDPOINT}/saveNewTask`,
    setDashboardStateURL: `${SERVER_ENDPOINT}/setDashboardState`,
    deleteTaskURL: `${SERVER_ENDPOINT}/deleteATask`,
    toggleTaskCompletionURL: `${SERVER_ENDPOINT}/toggleTaskCompletion`
});

export const httpMethods = Object.freeze({
    GET: "GET",
    POST: "POST",
    PUT: "PUT"
});

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];