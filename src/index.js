import './styles/style.scss';
import * as taskFactory from './js/taskFactory.js'

let taskA = taskFactory.createTask('testA', 'hey');
let taskB = taskFactory.createTask('testB', 'hey');
let taskC = taskFactory.createTask('testC', 'hey');

taskA.setParent(taskB);
taskB.setParent(taskC);

console.log(`${taskA.getTitle()}'s parent is: ${taskA.getParent().getTitle()}`);
console.log(`${taskB.getTitle()}'s parent is: ${taskB.getParent().getTitle()}`);

taskC.setParent(taskA);
taskA.setParent(taskA);