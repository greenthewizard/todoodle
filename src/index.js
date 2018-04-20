import './js/styleBarrel.js';
import * as taskFactory from './js/taskFactory.js';
import render from './js/render.js';

let task1 = taskFactory.createTask('Finish todo app');
    let task4 = taskFactory.createTask('Make the rest of the app');
    let task5 = taskFactory.createTask('Learn how to make the rest of the app');
        let task7 = taskFactory.createTask('Learn javascript');
        let task8 = taskFactory.createTask('Learn HTML/CSS');
let task2 = taskFactory.createTask('Grocery List');
    let task6 = taskFactory.createTask('Buy Milk');
let task3 = taskFactory.createTask('Make more lists');

task4.setParent(task1);
task5.setParent(task1);
task6.setParent(task2);
task7.setParent(task5);
task8.setParent(task5);

let view = {
    tasks: taskFactory.getSortedTasks(),
    hasChildren: function() {
        return taskFactory.getChildrenFor(this).length > 0;
    },
    getIndent: function() {
        return taskFactory.getGenerationOf(this) * 2 + 'rem';
    }
}

let $ul = document.querySelector('#todo-list');
render($ul, 'templates/tasklist.mst', view);