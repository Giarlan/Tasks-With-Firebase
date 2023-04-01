let tasks = [];

function idGenerator() {

    let timestamp   = new Date();

    let id =
        timestamp.getHours().toString() +
        timestamp.getMinutes().toString() +
        timestamp.getSeconds().toString() +
        timestamp.getMilliseconds().toString();
    return id;
}

function createTask(taskDescription){
    let task = {
        id: idGenerator(),
        data: {
            description: taskDescription
        }
    };

    tasks.push(task);
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id != id);

    updateScreen();
}