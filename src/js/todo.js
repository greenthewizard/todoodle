const task = (title = 'New Task', desc = '') => {
    const due = null;
    let priority = 0;
    const tasks = [];

    return {
        setTitle: (newTitle) => {
            if (/([a-z]|[A-Z])+/.test(newTitle)) {
                title = newTitle;
            }

            return this;
        },

        incPriority: () => {
            priority++;
            return this;
        },

        getPriority: () => {
            return priority;
        }
    }
}

export default task;