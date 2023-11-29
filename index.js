document.addEventListener('DOMContentLoaded', function () {
    const inputNewTask = document.getElementById("new-task");
    const addBtn = document.getElementById("add-btn");
    const viewTaskList = document.getElementById('main__div4__view-task');
    const completedTasksDiv = document.getElementById('completed-task-list');

    const tasks = [];

    addBtn.addEventListener('click', function () {
        const taskText = inputNewTask.value.trim();
        if (taskText !== '') {
            tasks.push({ name: taskText, completed: false });
            inputNewTask.value = '';
            renderTasks();
        }
    });

    function renderTasks() {
        clearTaskLists();
        tasks.forEach(function (task, index) {
            const listItem = document.createElement('li');
            listItem.textContent = task.name;

            const checkbox = createCheckbox(task.completed);
            checkbox.addEventListener('change', function () {
                tasks[index].completed = checkbox.checked;
                renderTasks();
            });

            listItem.appendChild(checkbox);

            if (task.completed) {
                completedTasksDiv.appendChild(listItem);
            } else {
                viewTaskList.appendChild(listItem);
            }
        });
    }

    function clearTaskLists() {
        viewTaskList.innerHTML = '';
        completedTasksDiv.innerHTML = '';
    }

    function createCheckbox(checked) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checked;

        return checkbox;
    }

    // Initial rendering
    renderTasks();
});
