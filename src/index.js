import './js/styleBarrel.js';
import * as taskFactory from './js/taskFactory.js';
import * as render from './js/render.js';

let task1 = taskFactory.createTask('task1', 'hey');
let task2 = taskFactory.createTask('task2', 'hey');
let task3 = taskFactory.createTask('task3', 'hey');
let task4 = taskFactory.createTask('task4', 'hey');
let task5 = taskFactory.createTask('task5', 'hey');
let task6 = taskFactory.createTask('task6', 'hey');
let task7 = taskFactory.createTask('task7', 'hey');
let task8 = taskFactory.createTask('task8', 'hey');

task4.setParent(task1);
task5.setParent(task1);
task6.setParent(task2);
task7.setParent(task5);
task8.setParent(task5);

let sorted = taskFactory.getSortedTasks();
sorted.forEach(task => {
    let dash = '=='
    let dashes = dash.repeat(taskFactory.getGenerationOf(task));
    console.log(dashes + task.getTitle());
});