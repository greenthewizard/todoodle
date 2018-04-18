//taskFactory.js
//Create and manage tasks.

let _nextId = 0;
let _allTasks = [];

//Exports
export const createTask = (title = 'New Task', desc = '') => {
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
        
        //add 1 to priority, not exceeding
        incPriority: () => {
            priority = priority + 1 > maxPriority ? priority : priority + 1;
        },

        decPriority: () => {
            priority = priority - 1 >= 0 ? priority : priority - 1;
        },

        addChild: (task) => {
            tasks.push(task);
        },

        removeChild: (task) => {
            const child = tasks.splice(tasks.indexOf(task), 1);
            return child;
        },
        
        getTitle: () => title,
        getPriority: () => priority,
        getId: () => id
    }

    //Add task to master list.
    _allTasks.push(newTask);
    return newTask;
}

export const getTaskById = (id) => {
    return _allTasks.find(task => task.id === id );
};