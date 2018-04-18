//taskFactory.js
//Create and manage tasks.
let _nextId = 0;
let _allTasks = [];

const _createsLineageLoop = (task, next, gen = 0, visited = []) => {
    if (gen === 0) {
        visited.push(task.getId());
    }
    task = next;

    //If task has been visted before
    if (visited.findIndex(t => t === task.getId() ) >= 0) {
        return true;
    } else if (task.getParent() === null) {
        return false;
    } else {
        visited.push(task.getId());
        return _createsLineageLoop(task, task.getParent(), gen++, visited);
    }
}

//Exports
export const createTask = (title = 'New Task', desc = '') => {
    const id = _nextId++;
    const due = null;
    const maxPriority = 2;
    let priority = 0;
    let collapse = false;
    let parent = null;

    const thisTask = {
        setTitle: (newTitle) => {
            if (/\w+/.test(newTitle) && typeof newTitle === "string") {
                title = newTitle;
            }
            return thisTask;
        },
        
        //add 1 to priority, not exceeding
        incPriority: () => {
            priority = priority + 1 > maxPriority ? priority : priority + 1;            
            return thisTask;
        },

        decPriority: () => {
            priority = priority - 1 >= 0 ? priority : priority - 1;
            return thisTask;
        },

        setParent: (task) => {
            try {
                if (task.getId() === id) {
                    throw `Unable to set parent of task ${task.getId()}. Can't set parent to self.`;
                } else if (_createsLineageLoop(thisTask, task)) {
                    throw `Unable to set parent of task ${task.getId()}. Infinite loop created.`;
                } else {
                    parent = task;
                    return thisTask;
                }
            } catch(e) {
                console.log(e);
            }
        },
        
        getTitle: () => title,
        getPriority: () => priority,
        getId: () => id,
        getParent: () => parent
    }

    //Add task to master list.
    _allTasks.push(thisTask);
    return thisTask;
}

export const getTaskById = (id) => {
    return _allTasks.find(task => task.id === id );
};