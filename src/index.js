import './js/styleBarrel.js';
import * as taskFactory from './js/taskFactory.js';
import * as render from './js/render.js';

let taskA = taskFactory.createTask('testA', 'hey');
let taskB = taskFactory.createTask('testB', 'hey');
let taskC = taskFactory.createTask('testC', 'hey');

taskA.setParent(taskC);
taskB.setParent(taskC);