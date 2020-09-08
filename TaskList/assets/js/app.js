// variables ===================
const taskList = document.getElementById('task-list');


//Event Listener==================

eventListener();

function eventListener() {
    //form submision
    document.querySelector('#form').addEventListener('submit', newTask);

    // remove tweet from the list
    taskList.addEventListener('click', removeTask);

    // document ready like jQuery
    document.addEventListener('DOMContentLoaded', LSonLoad);

}

//Functions===================

function newTask(e) {
    e.preventDefault();

    // read  the value 
    const task = document.getElementById('task').value;
    if (task !== '') {
        // create an remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-task';
        removeBtn.textContent = 'X';

        // create an li elements 
        const li = document.createElement('li');
        li.textContent = task;
        // add remove button to eact task list
        li.appendChild(removeBtn);
        // add task list 
        taskList.appendChild(li);

        // add to local storage
        addTaskLocalStorage(task);

        // alert when will be added a task
        let alertTxt = document.getElementById('alertMSG');
        alertTxt.style.display = 'block';
        alertTxt.style.textAlign = 'center';
        alertTxt.style.color = '#fff';
        alertTxt.style.background = '#6dc8f9';
        alertTxt.style.padding = '12px';

        document.querySelector('#form').addEventListener('submit', alertTxt);
        setTimeout(function() {
            document.getElementById("alertMSG").style.display = "none";
        }, 1500);
        // console.log('Hello');


        this.reset();
    } else {
        alert('Please add a task first!');
    }
}
// remove the task from list

function removeTask(e) {
    const ok = confirm('Are you sure?');

    if (ok == true) {
        if (e.target.classList.contains('remove-task')) {
            e.target.parentElement.remove();
        }
        // remove task from local storage
        removeTasksfromLS(e.target.parentElement.textContent);
    } else {
        console.log(`'You didn't remove`);
    }
}
// add the task into the local storage function
function addTaskLocalStorage(task) {
    let tasksFrmLocal = getTasksFromStorage();
    // add tasks into the array
    tasksFrmLocal.push(task);
    // convert to array to ostring 
    localStorage.setItem('tasks', JSON.stringify(tasksFrmLocal));

    //console.log(tasks);
}

function getTasksFromStorage() {
    let tasks;
    const taskLS = localStorage.getItem('tasks');

    // if the valuews are null then we will assign an empty array 
    if (taskLS === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(taskLS);
    }
    return tasks;
}

// print local storage on load

function LSonLoad() {
    let storedTasks = getTasksFromStorage();
    // loop throygh storge and print values from local storage 
    storedTasks.forEach(function(task) {
        // create an remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-task';
        removeBtn.textContent = 'X';

        // create an li elements 
        const li = document.createElement('li');
        li.textContent = task;
        // add remove button to eact task list
        li.appendChild(removeBtn);
        // add task list 
        taskList.appendChild(li);

    });
}

// remove tasks from local storage
function removeTasksfromLS(task) {
    let tasksFromLS = getTasksFromStorage();

    // remove x from the tasks list 
    const taskDlt = task.substring(0, task.length - 1);

    // loop thriugh th etasks and remove that is equal to

    tasksFromLS.forEach(function(taskLS, index) {
        if (taskDlt === taskLS) {
            tasksFromLS.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasksFromLS));
}