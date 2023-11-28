document.addEventListener('DOMContentLoaded', function () {
    const inputNewTask = document.getElementById("new-task");
    const addBtn = document.getElementById("add-btn");
    const searchBtn = document.getElementById("search-btn");
    const viewTaskList = document.getElementById('main__div4__view-task');
    const completedTasksDiv = document.getElementById('completed-tasks');
    const remainingTasksDiv = document.getElementById('Remaining');

    const tasks = [];

    document.querySelector('.main__div1 button:nth-child(1)').addEventListener('click', function () {
        displayTasks(tasks);
        toggleVisibility(completedTasksDiv, false);
        toggleVisibility(remainingTasksDiv, false);
    });

    document.querySelector('.main__div1 button:nth-child(2)').addEventListener('click', function () {
        displayTasks(tasks.filter(task => task.completed));
        toggleVisibility(completedTasksDiv, true);
        toggleVisibility(remainingTasksDiv, false);
    });

    document.querySelector('.main__div1 button:nth-child(3)').addEventListener('click', function () {
        displayTasks(tasks.filter(task => !task.completed));
        toggleVisibility(completedTasksDiv, false);
        toggleVisibility(remainingTasksDiv, true);
    });

    searchBtn.addEventListener("click", function () {
        const searchValue = document.getElementById("task").value.toLowerCase();
        const filteredTasks = tasks.filter(task => task.todo.toLowerCase().includes(searchValue));
        displayTasks(filteredTasks);
    });

    addBtn.addEventListener("click", function () {
        const newTaskText = inputNewTask.value.trim();

        if (newTaskText !== '') {
            const newTask = {
                todo: newTaskText,
                completed: false
            };
            tasks.push(newTask);

            displayTasks(tasks);
            inputNewTask.value = '';
        } else {
            alert('Invalid Task: Task cannot be empty!');
        }
    });

    function displayTasks(taskArray) {
        viewTaskList.innerHTML = '';
        completedTasksDiv.innerHTML = '';
        remainingTasksDiv.innerHTML = '';
    
        taskArray.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.todo;
            taskItem.classList.toggle('completed', task.completed);
    
            const completeCheckbox = document.createElement('input');
            completeCheckbox.type = 'checkbox';
            completeCheckbox.checked = task.completed;
            completeCheckbox.addEventListener('change', function () {
                task.completed = !task.completed;
                displayTasks(tasks);
            });
    
            taskItem.appendChild(completeCheckbox);
    
            viewTaskList.appendChild(taskItem);
    
            if (task.completed) {
                const completedTaskItem = document.createElement('li');
                completedTaskItem.textContent = task.todo;
                completedTaskItem.classList.add('completed');
                completedTasksDiv.appendChild(completedTaskItem);
            } else {
                const remainingTaskItem = document.createElement('li');
                remainingTaskItem.textContent = task.todo;
    
                const remainingCompleteCheckbox = document.createElement('input');
                remainingCompleteCheckbox.type = 'checkbox';
                remainingCompleteCheckbox.checked = false; 
                remainingCompleteCheckbox.addEventListener('change', function () {
                    task.completed = !task.completed;
                    displayTasks(tasks);
                });
    
                remainingTaskItem.appendChild(remainingCompleteCheckbox);
    
                remainingTasksDiv.appendChild(remainingTaskItem);
            }
        });
    }
    
    
    

    function toggleVisibility(element, show) {
        element.style.display = show ? 'block' : 'none';
    }
});
