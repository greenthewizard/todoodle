//taskFactory.js
//Create and manage tasks.

let _nextId = 0;
let _allTasks = [];

//Exports
const createTask = (title = 'New Task', desc = '') => {
    const due = null;
    const tasks = [];
    const id = _nextId++;
    let priority = 0;
    const maxPriority = 2;
    let collapse = false;

    const newTask = {
        setTitle: (newTitle) => {
            if (/\w+/.test(newTitle) && typeof newTitle === "string") {
                title = newTitle;
            }
        },

        getTitle: () => {
            return title;
        },

        incPriority: () => {
            priority = priority + 1;
            if (priority > maxPriority) {
                priority = 0;
            }
        },

        getPriority: () => {
            return priority;
        },

        getId: () => {
            return id;
        }
    }

    _allTasks.push(newTask);
    return newTask;
}

const getTaskById = (id) => {
    return _allTasks.find(task => task.getId() === id );
};

export { 
    createTask,
    getTaskById
}