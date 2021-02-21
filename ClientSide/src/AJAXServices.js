import {ajaxCall} from './AJAXCallWrapper';
import {apiEndpoints, httpMethods} from './Constants';

export const getDashboardState = (setIsListVisible) => {
    ajaxCall(httpMethods.GET, apiEndpoints.getDashboardStateURL)
        .then(res => {
            setIsListVisible(res);
            if(res) document.querySelector("#input").focus();
        })
        .catch(err => console.log(err));
}

export const updateTaskCompletion = (taskValue, taskIsCompleted, setTaskIsCompleted) => {
    ajaxCall("PUT", apiEndpoints.toggleTaskCompletionURL, {taskContent: taskValue, completed: !taskIsCompleted})
        .then(res => {
            if(res.message === "Success") setTaskIsCompleted(!taskIsCompleted);
        })
        .catch(err => console.log(err));

}