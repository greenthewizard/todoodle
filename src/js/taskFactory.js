//taskFactory.js
//Create and manage tasks.
let _nextId = 0;
let _allTasks = [];
const _maxPriority = 2;

//Check to see if a new parent relationship would create an infinite loop.
const _createsLineageLoop = (task, next, gen = 0, visited = []) => {
    if (gen === 0) {
        //Add initial task id to visited list.
        visited.push(task.getId());
    }
    //Move to parent.
    task = next;

    //If task has been visted before, infinite loop detected.
    if (visited.findIndex(t => t === task.getId() ) >= 0) {
        return true;
    } else if (task.getParent() === null) {
        //Found top level parent. No loop.
        return false;
    } else {
        //No issue and top level not found, so check next in chain.
        visited.push(task.getId());
        return _createsLineageLoop(task, task.getParent(), gen++, visited);
    }
}

//Exports
export const createTask = (title = 'New Task', desc = '') => {
    const id = _nextId++;
    const due = null;
    let priority = 0;
    let sort = 0;
    let collapse = false;
    let parent = null;

    const thisTask = {
        setTitle: (newTitle) => {
            //Title must contain one more more alphanumeric characters.
            if (/\w+/.test(newTitle) && typeof newTitle === "string") {
                title = newTitle;
            }
            return thisTask;
        },
        
        //Add 1 to priority, not exceeding max.
        incPriority: () => {
            priority = Math.min(priority + 1, _maxPriority);            
            return thisTask;
        },

        //Remove 1 from priority if > 0.
        decPriority: () => {
            priority = Math.max(priority - 1, 0);
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

export const getChildrenFor = (parent) => {
    return _allTasks.filter(task => {
        let taskParent = task.getParent();
        if (taskParent) {
            return task.getParent().getId() === parent.getId();
        } else {
            return false;
        }
    });
};

export const getGenerationOf = (task) => {
    let gen = 0;
    while (task = task.getParent()) {
        gen++;
    }
    return gen;
};

export const getSortedTasks = (children) => {
    let sortedList = [];
    //If children not provided, set to gen zero. (parent = null).
    children = children ? children : _allTasks.filter(task => !task.getParent());
    if (children.length > 0) {
        //For each child, add child to list, followed by a list of its own children with their children etc., etc., etc..
        children.forEach(child => {
            sortedList.push(child, ...getSortedTasks(getChildrenFor(child)));
        });
    } else {
        return [];
    }
    return sortedList;
};